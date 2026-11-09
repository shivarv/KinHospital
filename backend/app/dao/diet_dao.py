from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.dao.base_dao import BaseDAO
from app.models.diet import DietCondition


class DietConditionDAO(BaseDAO[DietCondition]):
    model = DietCondition

    def list_active(self) -> Sequence[DietCondition]:
        stmt = select(DietCondition).where(DietCondition.is_active.is_(True)).order_by(DietCondition.sort_order)
        return self.session.scalars(stmt).all()

    def get_by_slug_with_meals(self, slug: str) -> DietCondition | None:
        stmt = (
            select(DietCondition)
            .where(DietCondition.slug == slug, DietCondition.is_active.is_(True))
            .options(selectinload(DietCondition.meals))
        )
        return self.session.scalar(stmt)
