from fastapi import APIRouter

from app.api.v1 import consultations, diet, health, products
from app.api.v1.admin import appointments as admin_appointments
from app.api.v1.admin import auth as admin_auth
from app.api.v1.admin import products as admin_products
from app.api.v1.admin import schedule as admin_schedule

api_router = APIRouter()

# Public
api_router.include_router(health.router)
api_router.include_router(consultations.router)
api_router.include_router(diet.router)
api_router.include_router(products.router)

# Admin (every route except login requires a bearer token)
admin_router = APIRouter(prefix="/admin")
admin_router.include_router(admin_auth.router)
admin_router.include_router(admin_schedule.router)
admin_router.include_router(admin_appointments.router)
admin_router.include_router(admin_products.router)
api_router.include_router(admin_router)
