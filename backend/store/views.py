import json
import logging
import re
import urllib.error
import urllib.request
import uuid
from datetime import date
from decimal import Decimal
from urllib.parse import urlparse

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import DatabaseError, IntegrityError, connection, transaction
from django.db.models import Avg, Count, Q, Sum
from django.http import Http404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Booking, Order, Product, Review, Subscriber


logger = logging.getLogger(__name__)
User = get_user_model()
VALID_SIZES = {"XS", "S", "M", "L"}
VISIT_TIMES = {"11:00", "12:30", "14:00", "15:30", "17:00", "18:30"}
FREE_SHIPPING_THRESHOLD = 20000
COURIER_SHIPPING = 300


def api_error(message, http_status=status.HTTP_400_BAD_REQUEST):
    return Response({"error": message}, status=http_status)


def user_payload(user):
    return {
        "id": user.pk,
        "email": user.email,
        "name": user.display_name or user.email,
        "role": "admin" if user.is_staff or user.is_superuser else "user",
    }


def token_payload(user):
    refresh_token = RefreshToken.for_user(user)
    return {
        "accessToken": str(refresh_token.access_token),
        "refreshToken": str(refresh_token),
        "user": user_payload(user),
    }


def product_payload(product):
    return {
        "id": product.pk,
        "category": product.category,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "image": product.image,
        "sizes": product.sizes,
        "badge": product.badge,
        "rating": float(product.rating),
        "reviews": product.reviews_count,
        "created_at": product.created_at.isoformat(),
    }


def valid_product_data(data):
    if not isinstance(data, dict):
        return None, "Product data is invalid."
    name = data.get("name")
    description = data.get("description")
    category = data.get("category")
    badge = data.get("badge", "")
    image = data.get("image")
    sizes = data.get("sizes")
    raw_price = data.get("price")
    if isinstance(raw_price, bool) or not (
        isinstance(raw_price, int)
        or isinstance(raw_price, str) and re.fullmatch(r"[1-9]\d*", raw_price.strip())
    ):
        return None, "Product price must be a positive whole number."
    price = int(raw_price)
    image_url = urlparse(image if isinstance(image, str) else "")
    if (
        category not in Product.Category.values
        or not isinstance(name, dict)
        or not isinstance(description, dict)
        or not isinstance(name.get("ru"), str)
        or not name["ru"].strip()
        or len(name["ru"].strip()) > 120
        or not isinstance(description.get("ru"), str)
        or not description["ru"].strip()
        or len(description["ru"].strip()) > 1500
        or price < 1
        or image_url.scheme != "https"
        or not image_url.netloc
        or not isinstance(sizes, list)
        or not sizes
        or any(not isinstance(size, str) or size.upper() not in VALID_SIZES for size in sizes)
        or not isinstance(badge, str)
        or badge not in {"", *Product.Badge.values}
    ):
        return None, "Product data is invalid."
    return {
        "category": category,
        "name": name,
        "description": description,
        "price": price,
        "image": image_url.geturl(),
        "sizes": list(dict.fromkeys(size.upper() for size in sizes)),
        "badge": badge,
    }, None


def require_admin(request):
    return bool(request.user and request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser))


def valid_email(value):
    if not isinstance(value, str) or len(value) > 254:
        return False
    try:
        validate_email(value.strip())
    except ValidationError:
        return False
    return True


def escape_html(value):
    return (
        str(value or "")
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#x27;")
    )


def notify_telegram(message):
    token = getattr(settings, "TELEGRAM_BOT_TOKEN", "")
    chat_id = getattr(settings, "TELEGRAM_CHAT_ID", "")
    if not token or not chat_id:
        return {"configured": False, "sent": False}
    payload = json.dumps({
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }).encode("utf-8")
    request = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            result = json.loads(response.read().decode("utf-8"))
        if not result.get("ok"):
            logger.warning("Telegram notification was rejected by the API.")
            return {"configured": True, "sent": False}
        return {"configured": True, "sent": True}
    except (urllib.error.URLError, TimeoutError, ValueError) as error:
        logger.warning("Telegram notification failed: %s", type(error).__name__)
        return {"configured": True, "sent": False}


def order_payload(order):
    return {
        "id": str(order.pk),
        "order_number": order.order_number,
        "user_id": order.user_id,
        "customer": order.customer,
        "email": order.email,
        "phone": order.phone,
        "address": order.address,
        "delivery": order.delivery,
        "payment": order.payment,
        "items": order.items,
        "subtotal": order.subtotal,
        "shipping": order.shipping,
        "total": order.total,
        "status": order.status,
        "created_at": order.created_at.isoformat(),
    }


def review_payload(review):
    return {
        "id": review.pk,
        "product_id": review.product_id,
        "name": review.name,
        "rating": review.rating,
        "text": review.text,
        "created_at": review.created_at.isoformat(),
    }


@api_view(["GET"])
@permission_classes([AllowAny])
def config(request):
    return Response({
        "configured": True,
        "supabaseUrl": None,
        "supabaseAnonKey": None,
        "oauthProviders": [],
        "cloudinaryCloudName": getattr(settings, "CLOUDINARY_CLOUD_NAME", "") or None,
        "cloudinaryUploadPreset": getattr(settings, "CLOUDINARY_UPLOAD_PRESET", "") or None,
        "telegramConfigured": bool(
            getattr(settings, "TELEGRAM_BOT_TOKEN", "")
            and getattr(settings, "TELEGRAM_CHAT_ID", "")
        ),
    })


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    try:
        connection.ensure_connection()
    except DatabaseError:
        logger.exception("Database health check failed.")
        return Response(
            {"ok": False, "service": "velvet-void-api", "database": "unavailable"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    return Response({"ok": True, "service": "velvet-void-api", "database": "ok"})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def products(request):
    if request.method == "POST":
        if not require_admin(request):
            return api_error("Administrator access is required.", status.HTTP_403_FORBIDDEN)
        values, error = valid_product_data(request.data)
        if error:
            return api_error(error)
        product_id = request.data.get("id")
        if product_id is not None:
            if (
                not isinstance(product_id, str)
                or not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_-]{0,79}", product_id.strip())
            ):
                return api_error("Product ID is invalid.")
            product_id = product_id.strip()
            if Product.objects.filter(pk=product_id).exists():
                return api_error("A product with this ID already exists.", status.HTTP_409_CONFLICT)
        else:
            product_id = f"vv-{uuid.uuid4()}"
        values["id"] = product_id
        product = Product.objects.create(**values)
        return Response(product_payload(product), status=status.HTTP_201_CREATED)

    queryset = Product.objects.all()
    category = request.query_params.get("category", "all")
    if category != "all":
        if category not in Product.Category.values:
            return api_error("Product category is invalid.")
        queryset = queryset.filter(category=category)

    search = request.query_params.get("search", "").strip()[:100]
    if search:
        query = Q()
        for language in ("ru", "en", "kg", "kz"):
            query |= Q(**{f"name__{language}__icontains": search})
            query |= Q(**{f"description__{language}__icontains": search})
        queryset = queryset.filter(query)

    sort = request.query_params.get("sort", "newest")
    if sort == "price-low":
        queryset = queryset.order_by("price", "id")
    elif sort == "price-high":
        queryset = queryset.order_by("-price", "id")
    elif sort == "popular":
        queryset = queryset.order_by("-rating", "-reviews_count", "id")
    elif sort == "newest":
        queryset = queryset.order_by("-created_at", "id")
    else:
        return api_error("Product sort option is invalid.")

    try:
        page = max(1, int(request.query_params.get("page", "1")))
        page_size = min(24, max(1, int(request.query_params.get("pageSize", "6"))))
    except ValueError:
        return api_error("Page and pageSize must be whole numbers.")
    total = queryset.count()
    page_count = max(1, (total + page_size - 1) // page_size)
    rows = queryset[(page - 1) * page_size:page * page_size]
    return Response({
        "products": [product_payload(product) for product in rows],
        "page": page,
        "pageSize": page_size,
        "total": total,
        "pages": page_count,
    })


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def product_detail(request, product_id):
    if not require_admin(request):
        return api_error("Administrator access is required.", status.HTTP_403_FORBIDDEN)
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist as error:
        raise Http404("Product not found.") from error

    if request.method == "DELETE":
        product.delete()
        return Response({"deleted": True})

    values, error = valid_product_data(request.data)
    if error:
        return api_error(error)
    for field, value in values.items():
        setattr(product, field, value)
    product.save(update_fields=list(values))
    return Response(product_payload(product))


def review_list(queryset):
    return [review_payload(review) for review in queryset.select_related("product")]


@api_view(["GET"])
@permission_classes([AllowAny])
def product_reviews(request, product_id):
    return Response(review_list(Review.objects.filter(product_id=product_id)))


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def reviews(request):
    if request.method == "GET":
        return Response(review_list(Review.objects.all()[:100]))
    data = request.data
    product_id = data.get("productId")
    name = data.get("name", "Guest")
    text = data.get("text")
    try:
        rating = int(data.get("rating"))
    except (TypeError, ValueError):
        return api_error("Review details are invalid.")
    if (
        not isinstance(product_id, str)
        or not isinstance(name, str)
        or not name.strip()
        or len(name.strip()) > 120
        or not isinstance(text, str)
        or not 2 <= len(text.strip()) <= 500
        or rating not in range(1, 6)
    ):
        return api_error("Review details are invalid.")
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return api_error("Product not found.", status.HTTP_404_NOT_FOUND)
    review = Review.objects.create(
        product=product,
        user=request.user if request.user.is_authenticated else None,
        name=name.strip(),
        rating=rating,
        text=text.strip(),
    )
    stats = product.product_reviews.aggregate(average=Avg("rating"), count=Count("id"))
    product.rating = Decimal(str(stats["average"] or 0)).quantize(Decimal("0.1"))
    product.reviews_count = stats["count"]
    product.save(update_fields=["rating", "reviews_count"])
    return Response(review_payload(review), status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def orders(request):
    data = request.data
    customer = data.get("customer")
    email = data.get("email")
    phone = data.get("phone")
    address = data.get("address", "")
    delivery = data.get("delivery")
    payment = data.get("payment")
    raw_items = data.get("items")
    if (
        not isinstance(customer, str)
        or not customer.strip()
        or len(customer.strip()) > 120
        or not valid_email(email)
        or not isinstance(phone, str)
        or not phone.strip()
        or len(phone.strip()) > 40
        or delivery not in Order.Delivery.values
        or payment not in Order.Payment.values
        or (delivery == Order.Delivery.COURIER and (
            not isinstance(address, str) or not address.strip() or len(address.strip()) > 300
        ))
        or not isinstance(raw_items, list)
        or not 1 <= len(raw_items) <= 30
    ):
        return api_error("Order data is invalid.")

    product_ids = [item.get("id") for item in raw_items if isinstance(item, dict)]
    if len(product_ids) != len(raw_items) or any(not isinstance(item, str) for item in product_ids):
        return api_error("Order items are invalid.")
    catalog = {product.pk: product for product in Product.objects.filter(pk__in=product_ids)}
    items = []
    for raw_item in raw_items:
        product = catalog.get(raw_item["id"])
        size = raw_item.get("size")
        quantity = raw_item.get("quantity")
        if (
            not product
            or size not in product.sizes
            or isinstance(quantity, bool)
            or not isinstance(quantity, int)
            or not 1 <= quantity <= 20
        ):
            return api_error("An item in this order is invalid.")
        items.append({
            "id": product.pk,
            "name": product.name,
            "price": product.price,
            "size": size,
            "quantity": quantity,
        })

    subtotal = sum(item["price"] * item["quantity"] for item in items)
    shipping = (
        0
        if delivery == Order.Delivery.PICKUP or subtotal >= FREE_SHIPPING_THRESHOLD
        else COURIER_SHIPPING
    )
    order_number = f"VV-{uuid.uuid4().hex[:12].upper()}"
    with transaction.atomic():
        order = Order.objects.create(
            order_number=order_number,
            user=request.user if request.user.is_authenticated else None,
            customer=customer.strip(),
            email=email.strip().lower(),
            phone=phone.strip(),
            address=address.strip() if isinstance(address, str) else "",
            delivery=delivery,
            payment=payment,
            items=items,
            subtotal=subtotal,
            shipping=shipping,
            total=subtotal + shipping,
        )

    item_lines = [
        f"• {escape_html(item['name'].get('ru') or item['id'])} — "
        f"{escape_html(item['size'])} × {item['quantity']}"
        for item in items
    ]
    notification_text = "\n".join([
        "<b>Новый заказ VELVET &amp; VOID</b>",
        f"Заказ: <code>{escape_html(order.order_number)}</code>",
        f"Покупатель: {escape_html(order.customer)}",
        f"Телефон: {escape_html(order.phone)}",
        f"Email: {escape_html(order.email)}",
        f"Получение: {'Самовывоз' if delivery == Order.Delivery.PICKUP else 'Курьерская доставка'}",
        f"Адрес: {escape_html(order.address)}" if order.address else "",
        f"Оплата: {escape_html(order.payment)}",
        "Состав заказа:",
        *item_lines,
        f"Итого: {order.total} сом",
    ])
    notification = notify_telegram(notification_text)
    return Response(
        {"order": {**order_payload(order), "notification": notification}},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def bookings(request):
    data = request.data
    name = data.get("name")
    phone = data.get("phone")
    raw_date = data.get("date")
    visit_time = data.get("time")
    if (
        not isinstance(name, str)
        or not name.strip()
        or len(name.strip()) > 120
        or not isinstance(phone, str)
        or not phone.strip()
        or len(phone.strip()) > 40
        or not isinstance(raw_date, str)
        or not isinstance(visit_time, str)
        or visit_time not in VISIT_TIMES
    ):
        return api_error("Booking details are invalid.")
    try:
        visit_date = date.fromisoformat(raw_date)
    except ValueError:
        return api_error("Booking date must be a valid ISO date.")
    if visit_date < timezone.localdate():
        return api_error("Booking date cannot be in the past.")
    booking = Booking.objects.create(
        name=name.strip(),
        phone=phone.strip(),
        visit_date=visit_date,
        visit_time=visit_time,
    )
    notification = notify_telegram("\n".join([
        "<b>Новая запись в ателье VELVET &amp; VOID</b>",
        f"Имя: {escape_html(booking.name)}",
        f"Телефон: {escape_html(booking.phone)}",
        f"Дата: {booking.visit_date.isoformat()}",
        f"Время: {escape_html(booking.visit_time)}",
    ]))
    return Response({
        "booking": {
            "id": booking.pk,
            "name": booking.name,
            "phone": booking.phone,
            "visit_date": booking.visit_date.isoformat(),
            "visit_time": booking.visit_time,
            "created_at": booking.created_at.isoformat(),
        },
        "notification": notification,
    }, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def newsletter(request):
    email = request.data.get("email")
    if not valid_email(email):
        return api_error("Enter a valid email address.")
    Subscriber.objects.get_or_create(email=email.strip().lower())
    return Response({"subscribed": True}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")
    if (
        not isinstance(name, str)
        or not name.strip()
        or len(name.strip()) > 120
        or not valid_email(email)
        or not isinstance(password, str)
        or not 8 <= len(password) <= 128
    ):
        return api_error("Enter a valid name, email and password of at least 8 characters.")
    if User.objects.filter(email__iexact=email.strip()).exists():
        return api_error("An account with this email already exists.", status.HTTP_409_CONFLICT)
    try:
        user = User.objects.create_user(
            email=email.strip().lower(),
            password=password,
            display_name=name.strip(),
        )
    except IntegrityError:
        return api_error("An account with this email already exists.", status.HTTP_409_CONFLICT)
    return Response(token_payload(user), status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if not valid_email(email) or not isinstance(password, str):
        return api_error("Email and password are required.")
    user = authenticate(request, email=email.strip().lower(), password=password)
    if user is None:
        return api_error("Email or password is incorrect.", status.HTTP_401_UNAUTHORIZED)
    if not user.is_active:
        return api_error("This account is disabled.", status.HTTP_403_FORBIDDEN)
    return Response(token_payload(user))


@api_view(["POST"])
@permission_classes([AllowAny])
def refresh(request):
    raw_token = request.data.get("refreshToken")
    if not isinstance(raw_token, str) or not raw_token:
        return api_error("A refresh token is required.")
    try:
        old_token = RefreshToken(raw_token)
        user = User.objects.get(pk=old_token["user_id"], is_active=True)
        return Response(token_payload(user))
    except (TokenError, User.DoesNotExist, KeyError):
        return api_error("The refresh token is invalid or expired.", status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({"user": user_payload(request.user)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_stats(request):
    if not require_admin(request):
        return api_error("Administrator access is required.", status.HTTP_403_FORBIDDEN)
    totals = Order.objects.aggregate(count=Count("id"), revenue=Sum("total"))
    return Response({
        "products": Product.objects.count(),
        "orders": totals["count"] or 0,
        "revenue": totals["revenue"] or 0,
        "recentOrders": [
            {"id": str(order.pk), "total": order.total, "status": order.status, "created_at": order.created_at.isoformat()}
            for order in Order.objects.all()[:10]
        ],
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_orders(request):
    if not require_admin(request):
        return api_error("Administrator access is required.", status.HTTP_403_FORBIDDEN)
    return Response([order_payload(order) for order in Order.objects.all()[:100]])


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_bookings(request):
    if not require_admin(request):
        return api_error("Administrator access is required.", status.HTTP_403_FORBIDDEN)
    return Response([
        {
            "id": booking.pk,
            "name": booking.name,
            "phone": booking.phone,
            "visit_date": booking.visit_date.isoformat(),
            "visit_time": booking.visit_time,
            "created_at": booking.created_at.isoformat(),
        }
        for booking in Booking.objects.all()[:100]
    ])


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def admin_order_detail(request, order_id):
    if not require_admin(request):
        return api_error("Administrator access is required.", status.HTTP_403_FORBIDDEN)
    new_status = request.data.get("status")
    if new_status not in Order.Status.values:
        return api_error("Order status is invalid.")
    try:
        order = Order.objects.get(pk=order_id)
    except Order.DoesNotExist as error:
        raise Http404("Order not found.") from error
    order.status = new_status
    order.save(update_fields=["status"])
    return Response({"id": str(order.pk), "status": order.status})
