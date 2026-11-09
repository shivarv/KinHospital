from collections.abc import Sequence

from sqlalchemy import select

from app.dao.base_dao import BaseDAO
from app.models.product import Product


class ProductDAO(BaseDAO[Product]):
    model = Product

    def list_products(self, *, category: str | None = None, active_only: bool = True) -> Sequence[Product]:
        stmt = select(Product)
        if active_only:
            stmt = stmt.where(Product.is_active.is_(True))
        if category:
            stmt = stmt.where(Product.category == category)
        return self.session.scalars(stmt.order_by(Product.sort_order, Product.name)).all()
