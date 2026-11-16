import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("An email address is required.")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("A superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("A superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=120, blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Product(models.Model):
    class Category(models.TextChoices):
        OUTERWEAR = "outerwear", "Outerwear"
        SUITS = "suits", "Suits"
        KNITWEAR = "knitwear", "Knitwear"

    class Badge(models.TextChoices):
        NEW = "new", "New"
        SALE = "sale", "Bestseller"

    id = models.CharField(primary_key=True, max_length=80)
    category = models.CharField(max_length=20, choices=Category.choices)
    name = models.JSONField()
    description = models.JSONField()
    price = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    image = models.URLField(max_length=1000)
    sizes = models.JSONField(default=list)
    badge = models.CharField(max_length=20, blank=True, choices=Badge.choices)
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
    )
    reviews_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "id"]

    def __str__(self):
        return self.name.get("ru", self.id) if isinstance(self.name, dict) else self.id


class Order(models.Model):
    class Delivery(models.TextChoices):
        COURIER = "courier", "Courier"
        PICKUP = "pickup", "Atelier pickup"

    class Payment(models.TextChoices):
        STRIPE = "stripe", "Stripe demo"
        MBANK = "mbank", "Mobile wallet"
        CASH = "cash", "Cash / terminal"

    class Status(models.TextChoices):
        NEW = "new", "New"
        PROCESSING = "processing", "Processing"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_number = models.CharField(max_length=40, unique=True)
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="orders",
    )
    customer = models.CharField(max_length=120)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=40)
    address = models.CharField(max_length=300, blank=True)
    delivery = models.CharField(max_length=20, choices=Delivery.choices)
    payment = models.CharField(max_length=20, choices=Payment.choices)
    items = models.JSONField()
    subtotal = models.PositiveIntegerField()
    shipping = models.PositiveIntegerField()
    total = models.PositiveIntegerField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_number


class Booking(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40)
    visit_date = models.DateField()
    visit_time = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-visit_date", "visit_time"]

    def __str__(self):
        return f"{self.name} — {self.visit_date} {self.visit_time}"


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class Review(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="product_reviews",
    )
    user = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reviews",
    )
    name = models.CharField(max_length=120)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    text = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.product_id}: {self.rating}/5"
