from typing import ClassVar, Annotated
from pydantic import BaseModel, Field, ConfigDict, StringConstraints
from enum import Enum


class STaskCreate(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    title: Annotated[
        str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)
    ]
    description: Annotated[
        str | None,
        StringConstraints(strip_whitespace=True, min_length=1, max_length=255),
    ] = None
    priority: int = Field(ge=1, le=10)


class STaskUpdate(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    title: Annotated[
        str | None,
        StringConstraints(strip_whitespace=True, min_length=1, max_length=255),
    ] = None
    description: Annotated[
        str | None,
        StringConstraints(strip_whitespace=True, min_length=1, max_length=255),
    ] = None
    priority: Annotated[int | None, Field(ge=1, le=10)] = None
    complete: bool | None = None


class STaskDelete(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    msg: STaskDeleteMsg
    success: bool = False


class STask(STaskCreate):
    id: int
    complete: bool = False


class STasks(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    data: list[STask]


class STaskDeleteMsg(str, Enum):
    SUCCESS = "Task deleted successfully"
    ERROR = "Something went wrong"


class STaskStatus(str, Enum):
    ALL = "all"
    DONE = "done"
    UNDONE = "undone"


class SSortOrder(str, Enum):
    ASC = "asc"
    DESC = "desc"
