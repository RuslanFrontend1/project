import socket
from datetime import timedelta

from django.test import override_settings
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Booking, Order, Product, Review, Subscriber, User
from .views import _ipv4_create_connection, notify_telegram


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

    @override_settings(TELEGRAM_BOT_TOKEN="123:test", TELEGRAM_CHAT_ID="'100'")
    def test_telegram_notification_reports_delivery(self):
        with patch("store.views._send_telegram_payload", return_value=(True, "")) as send:
            result = notify_telegram("<b>Новый заказ</b>")

        self.assertEqual(result, {"configured": True, "sent": True})
        self.assertEqual(send.call_args.args[1]["chat_id"], "100")
        self.assertEqual(send.call_args.args[1]["parse_mode"], "HTML")

    @override_settings(TELEGRAM_BOT_TOKEN="123:test", TELEGRAM_CHAT_ID="100")
    def test_telegram_notification_falls_back_when_html_is_rejected(self):
        with patch(
            "store.views._send_telegram_payload",
            side_effect=[(False, "Bad Request: can't parse entities"), (True, "")],
        ) as send:
            result = notify_telegram("<b>VELVET &amp; VOID</b>")

        self.assertTrue(result["sent"])
        self.assertEqual(send.call_args_list[1].args[1]["text"], "VELVET & VOID")
        self.assertNotIn("parse_mode", send.call_args_list[1].args[1])

    def test_telegram_connection_uses_ipv4(self):
        fake_socket = patch("store.views.socket.socket").start()
        self.addCleanup(patch.stopall)
        with patch(
            "store.views.socket.getaddrinfo",
            return_value=[(socket.AF_INET, socket.SOCK_STREAM, 6, "", ("149.154.167.220", 443))],
        ) as resolve:
            _ipv4_create_connection(("api.telegram.org", 443), 1, None)

        resolve.assert_called_once_with(
            "api.telegram.org", 443, socket.AF_INET, socket.SOCK_STREAM
        )
        fake_socket.return_value.connect.assert_called_once_with(("149.154.167.220", 443))

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
