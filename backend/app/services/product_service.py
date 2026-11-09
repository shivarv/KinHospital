from collections.abc import Sequence

from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.dao.product_dao import ProductDAO
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


class ProductService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.dao = ProductDAO(session)

    def list_public(self, category: str | None = None) -> Sequence[Product]:
        return self.dao.list_products(category=category, active_only=True)

    def list_all(self) -> Sequence[Product]:
        return self.dao.list_products(active_only=False)

    def get(self, product_id: int) -> Product:
        product = self.dao.get(product_id)
        if product is None:
            raise NotFoundError("Product not found")
        return product

    def create(self, data: ProductCreate) -> Product:
        values = data.model_dump()
        values["currency"] = values["currency"].upper()
        product = self.dao.create(values)
        self.session.commit()
        return product

    def update(self, product_id: int, data: ProductUpdate) -> Product:
        product = self.get(product_id)
        changes = data.model_dump(exclude_unset=True)
        if changes.get("currency"):
            changes["currency"] = changes["currency"].upper()
        self.dao.update(product, changes)
        self.session.commit()
        return product

    def delete(self, product_id: int) -> None:
        self.dao.delete(self.get(product_id))
        self.session.commit()
