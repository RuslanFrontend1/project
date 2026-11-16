from django.contrib import admin
from django.urls import path

from store import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/config", views.config),
    path("api/health", views.health),
    path("api/products", views.products),
    path("api/products/<str:product_id>", views.product_detail),
    path("api/products/<str:product_id>/reviews", views.product_reviews),
    path("api/reviews", views.reviews),
    path("api/orders", views.orders),
    path("api/bookings", views.bookings),
    path("api/newsletter", views.newsletter),
    path("api/auth/signup", views.signup),
    path("api/auth/login", views.login),
    path("api/auth/refresh", views.refresh),
    path("api/auth/me", views.me),
    path("api/admin/stats", views.admin_stats),
    path("api/admin/orders", views.admin_orders),
    path("api/admin/orders/<uuid:order_id>", views.admin_order_detail),
    path("api/admin/bookings", views.admin_bookings),
]
