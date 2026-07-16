from pydantic import BaseModel, Field, ConfigDict
from typing import ClassVar


class Task(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    id: int | None = None
    title: str
    description: str | None
    priority: int = Field(ge=1, le=10)
    complete: bool = False
