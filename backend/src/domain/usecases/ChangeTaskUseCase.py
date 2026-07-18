from src.domain.ports.TaskRepositoryPort import TaskRepositoryPort
from src.domain.entities.Task import Task


class ChangeTaskUseCase:
    def __init__(self, task_repository: TaskRepositoryPort) -> None:
        super().__init__()
        self.task_repository = task_repository

    async def execute(self, task_id: int, data: dict) -> Task:
        return await self.task_repository.change_task(task_id=task_id, data=data)
