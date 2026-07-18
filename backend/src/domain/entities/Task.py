from pydantic import BaseModel, Field, ConfigDict
from typing import Annotated, ClassVar


class Task(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    id: int | None = None
    title: Annotated[str, Field(max_length=255)]
    description: str | None
    priority: int = Field(ge=1, le=10)
    complete: bool = False
