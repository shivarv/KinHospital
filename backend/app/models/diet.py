from sqlalchemy import JSON, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin


class DietCondition(TimestampMixin, Base):
    """A health concern a diet chart can be generated for (e.g. hair fall)."""

    __tablename__ = "diet_conditions"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(60), unique=True)
    name: Mapped[str] = mapped_column(String(100))
    summary: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    foods_to_include: Mapped[list[str]] = mapped_column(JSON, default=list)
    foods_to_avoid: Mapped[list[str]] = mapped_column(JSON, default=list)
    tips: Mapped[list[str]] = mapped_column(JSON, default=list)
    is_active: Mapped[bool] = mapped_column(default=True)
    sort_order: Mapped[int] = mapped_column(default=0)

    meals: Mapped[list["DietMeal"]] = relationship(
        back_populates="condition",
        cascade="all, delete-orphan",
        order_by="DietMeal.sort_order",
    )


class DietMeal(TimestampMixin, Base):
    """One meal of a one-day plan, for either the veg or non-veg variant."""

    __tablename__ = "diet_meals"

    id: Mapped[int] = mapped_column(primary_key=True)
    condition_id: Mapped[int] = mapped_column(ForeignKey("diet_conditions.id", ondelete="CASCADE"), index=True)
    diet_type: Mapped[str] = mapped_column(String(10))  # "veg" | "nonveg"
    meal_time: Mapped[str] = mapped_column(String(40))
    items: Mapped[str] = mapped_column(Text)
    sort_order: Mapped[int] = mapped_column(default=0)

    condition: Mapped[DietCondition] = relationship(back_populates="meals")
