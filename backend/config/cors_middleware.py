from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class SimpleCORSMiddleware(MiddlewareMixin):
    """Lightweight CORS middleware without external dependencies."""

    def process_response(self, request, response):
        origin = request.headers.get("Origin", "")
        allowed_origins = getattr(settings, "CORS_ALLOWED_ORIGINS", [])
        allow_all = getattr(settings, "CORS_ALLOW_ALL_ORIGINS", False)

        if origin in allowed_origins or allow_all:
            response["Access-Control-Allow-Origin"] = origin if origin in allowed_origins else "*"
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"

        if request.method == "OPTIONS":
            response["Content-Length"] = "0"
            response.status_code = 200

        return response