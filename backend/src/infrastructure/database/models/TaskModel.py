from sqlalchemy import Boolean, CheckConstraint, String
from sqlalchemy.orm import Mapped, mapped_column
from src.infrastructure.database.models.BaseModel import Base


class TaskModel(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30))
    description: Mapped[str | None] = mapped_column(default=None)
    priority: Mapped[int] = mapped_column(
        CheckConstraint("priority >= 1 AND priority <= 10")
    )
    complete: Mapped[bool] = mapped_column(default=False)
