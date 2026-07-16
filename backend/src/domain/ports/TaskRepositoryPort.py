from abc import ABC, abstractmethod
from src.domain.entities.Task import Task


class TaskRepositoryPort(ABC):
    @abstractmethod
    async def add(self, data: Task) -> Task:
        raise NotImplementedError

    @abstractmethod
    async def get_all(self) -> list[Task]:
        raise NotImplementedError

    # @abstractmethod
    # async def get_by_id(self, task_id: int) -> Task | None:
    #    raise NotImplementedError
