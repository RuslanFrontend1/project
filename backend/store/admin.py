from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Booking, Order, Product, Review, Subscriber, User


@admin.register(User)
class StoreUserAdmin(UserAdmin):
    ordering = ("email",)
    list_display = ("email", "display_name", "is_staff", "is_active")
    search_fields = ("email", "display_name")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal information", {"fields": ("display_name", "first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "display_name", "password1", "password2", "is_staff", "is_superuser"),
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "category", "price", "rating", "reviews_count", "badge")
    list_filter = ("category", "badge")
    search_fields = ("id", "name")
    ordering = ("category", "id")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "customer", "email", "total", "status", "created_at")
    list_filter = ("status", "delivery", "payment", "created_at")
    search_fields = ("order_number", "customer", "email", "phone")
    readonly_fields = ("order_number", "created_at")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "visit_date", "visit_time", "created_at")
    list_filter = ("visit_date",)
    search_fields = ("name", "phone")


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("product", "name", "rating", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("name", "text", "product__id")
