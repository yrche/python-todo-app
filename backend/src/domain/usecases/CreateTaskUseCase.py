from typing import Any
from src.domain.ports.TaskRepositoryPort import TaskRepositoryPort
from src.domain.entities.Task import Task


class CreateTaskUseCase:
    def __init__(self, task_repository: TaskRepositoryPort) -> None:
        super().__init__()
        self.task_repository = task_repository

    async def execute(self, title: str, description: str | None, priority: int) -> Task:
        domain_task = Task(title=title, description=description, priority=priority)
        return await self.task_repository.add(domain_task)
