from abc import ABC, abstractmethod
from src.api.v1.schemas.TaskSchema import SSortOrder, STaskStatus, STaskUpdate
from src.domain.entities.Task import Task


class TaskRepositoryPort(ABC):
    @abstractmethod
    async def add(self, data: Task) -> Task: ...

    @abstractmethod
    async def get_all(
        self, status: STaskStatus, sort_priority: SSortOrder | None, search: str | None
    ) -> list[Task]: ...

    # @abstractmethod
    # async def get_by_id(self, task_id: int) -> Task | None:
    #    raise NotImplementedError

    @abstractmethod
    async def change_task(self, task_id: int, data: dict) -> Task: ...

    @abstractmethod
    async def delete_task(self, task_id: int) -> Task | bool: ...
