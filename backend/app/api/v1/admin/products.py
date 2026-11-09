from fastapi import APIRouter, status

from app.api.deps import AdminUser, ProductServiceDep
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate

router = APIRouter(prefix="/products", tags=["admin: products"])


@router.get("/", response_model=list[ProductRead])
def list_all_products(_: AdminUser, service: ProductServiceDep):
    return service.list_all()


@router.post("/", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(_: AdminUser, data: ProductCreate, service: ProductServiceDep):
    return service.create(data)


@router.patch("/{product_id}", response_model=ProductRead)
def update_product(_: AdminUser, product_id: int, data: ProductUpdate, service: ProductServiceDep):
    return service.update(product_id, data)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(_: AdminUser, product_id: int, service: ProductServiceDep) -> None:
    service.delete(product_id)
