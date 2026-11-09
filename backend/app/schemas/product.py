from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.core.constants import ProductCategory


class ProductBase(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    category: ProductCategory
    short_description: str = Field(min_length=2, max_length=255)
    description: str | None = None
    pack_size: str | None = Field(default=None, max_length=60)
    price: Decimal = Field(ge=0, max_digits=10, decimal_places=2)
    currency: str = Field(default="USD", min_length=3, max_length=3)
    image_url: str | None = Field(default=None, max_length=500)
    in_stock: bool = True
    is_active: bool = True
    sort_order: int = 0


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    category: ProductCategory | None = None
    short_description: str | None = Field(default=None, min_length=2, max_length=255)
    description: str | None = None
    pack_size: str | None = Field(default=None, max_length=60)
    price: Decimal | None = Field(default=None, ge=0, max_digits=10, decimal_places=2)
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    image_url: str | None = Field(default=None, max_length=500)
    in_stock: bool | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class ProductRead(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
