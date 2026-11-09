from fastapi import APIRouter

from app.api.deps import ProductServiceDep
from app.core.constants import ProductCategory
from app.schemas.product import ProductRead

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=list[ProductRead])
def list_products(service: ProductServiceDep, category: ProductCategory | None = None):
    return service.list_public(category)
