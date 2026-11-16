from io import StringIO
from datetime import timedelta

from django.core.management import call_command
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Booking, Order, Product, Review, Subscriber, User


class StoreApiTests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(
            id="coat-test",
            category=Product.Category.OUTERWEAR,
            name={"ru": "Пальто", "en": "Coat"},
            description={"ru": "Тёплое пальто", "en": "Warm coat"},
            price=7800,
            image="https://example.com/coat.jpg",
            sizes=["XS", "S", "M", "L"],
            rating=0,
            reviews_count=0,
        )

    def test_config_reports_backend_ready_without_exposing_secrets(self):
        response = self.client.get("/api/config")

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["configured"])
        self.assertNotIn("TELEGRAM_BOT_TOKEN", response.data)

    def test_seed_command_is_idempotent_and_preserves_catalog_changes(self):
        call_command("seed_products", stdout=StringIO())
        product = Product.objects.get(pk="coat-01")
        product.price = 12345
        product.save(update_fields=["price"])

        call_command("seed_products", stdout=StringIO())

        product.refresh_from_db()
        self.assertEqual(product.price, 12345)
        self.assertEqual(Product.objects.count(), 9)

    def test_products_support_search_sort_and_pagination(self):
        response = self.client.get("/api/products?page=1&pageSize=1&search=coat&sort=price-low")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["total"], 1)
        self.assertEqual(response.data["products"][0]["id"], self.product.pk)

    def test_guest_order_is_saved_with_server_calculated_shipping(self):
        response = self.client.post("/api/orders", {
            "customer": "Test Customer",
            "email": "customer@example.com",
            "phone": "+996 555 000 000",
            "address": "Bishkek",
            "delivery": "courier",
            "payment": "cash",
            "items": [{"id": self.product.pk, "size": "M", "quantity": 1}],
        }, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["order"]["subtotal"], 7800)
        self.assertEqual(response.data["order"]["shipping"], 300)
        self.assertEqual(response.data["order"]["total"], 8100)
        self.assertEqual(Order.objects.count(), 1)

    def test_invalid_order_does_not_create_database_row(self):
        response = self.client.post("/api/orders", {
            "customer": "Test Customer",
            "email": "customer@example.com",
            "phone": "+996 555 000 000",
            "address": "Bishkek",
            "delivery": "courier",
            "payment": "cash",
            "items": [{"id": self.product.pk, "size": "XXL", "quantity": 1}],
        }, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Order.objects.count(), 0)

    def test_private_admin_endpoint_rejects_regular_user(self):
        user = User.objects.create_user("customer@example.com", "Strong-password-123")
        token = RefreshToken.for_user(user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.get("/api/admin/orders")

        self.assertEqual(response.status_code, 403)

    def test_product_creation_rejects_invalid_id_without_database_error(self):
        user = User.objects.create_superuser("admin@example.com", "Strong-password-123")
        token = RefreshToken.for_user(user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post("/api/products", {
            "id": "invalid id",
            "category": "outerwear",
            "name": {"ru": "Пальто"},
            "description": {"ru": "Тёплое пальто"},
            "price": 7800,
            "image": "https://example.com/coat.jpg",
            "sizes": ["M"],
        }, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Product.objects.count(), 1)

    def test_signup_returns_tokens_and_me_returns_authenticated_user(self):
        signup = self.client.post("/api/auth/signup", {
            "name": "Test Customer",
            "email": "customer@example.com",
            "password": "Strong-password-123",
        }, format="json")

        self.assertEqual(signup.status_code, 201)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {signup.data['accessToken']}")
        me = self.client.get("/api/auth/me")
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data["user"]["email"], "customer@example.com")
        self.assertEqual(me.data["user"]["role"], "user")

    def test_booking_and_newsletter_are_persisted(self):
        future_date = (timezone.localdate() + timedelta(days=1)).isoformat()
        booking = self.client.post("/api/bookings", {
            "name": "Test Customer",
            "phone": "+996 555 000 000",
            "date": future_date,
            "time": "11:00",
        }, format="json")
        subscription = self.client.post("/api/newsletter", {
            "email": "customer@example.com",
        }, format="json")

        self.assertEqual(booking.status_code, 201)
        self.assertEqual(subscription.status_code, 201)
        self.assertEqual(Booking.objects.count(), 1)
        self.assertEqual(Subscriber.objects.count(), 1)

    def test_review_updates_product_rating(self):
        response = self.client.post("/api/reviews", {
            "productId": self.product.pk,
            "name": "Guest",
            "rating": 5,
            "text": "Great quality",
        }, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Review.objects.count(), 1)
        self.product.refresh_from_db()
        self.assertEqual(float(self.product.rating), 5.0)
        self.assertEqual(self.product.reviews_count, 1)
