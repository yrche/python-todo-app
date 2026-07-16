from typing import ClassVar
from pydantic import BaseModel, Field, ConfigDict
from enum import Enum


class STaskCreate(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    title: str
    description: str | None
    priority: int = Field(ge=1, le=10)


class STaskUpdate(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    title: str | None
    description: str | None
    priority: int | None = Field(ge=1, le=10)
    complete: bool = False


class STask(STaskCreate):
    id: int
    complete: bool = False


class STasks(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    data: list[STask]


class STaskStatus(str, Enum):
    ALL = "all"
    DONE = "done"
    UNDONE = "undone"


class SSortOrder(str, Enum):
    ASC = "asc"
    DESC = "desc"
