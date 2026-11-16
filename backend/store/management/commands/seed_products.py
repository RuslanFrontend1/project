import json
from pathlib import Path

from django.core.management.base import BaseCommand

from store.models import Product


class Command(BaseCommand):
    help = "Add missing products from the initial VELVET & VOID catalog."

    def handle(self, *args, **options):
        data_file = Path(__file__).resolve().parents[2] / "data" / "products.json"
        with data_file.open(encoding="utf-8") as file:
            products = json.load(file)
        for item in products:
            product_id = item.pop("id")
            Product.objects.get_or_create(pk=product_id, defaults=item)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(products)} catalog products."))
