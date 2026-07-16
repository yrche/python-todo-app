from src.domain.entities.Task import Task
from src.domain.ports.TaskRepositoryPort import TaskRepositoryPort


class GetAllTasksUseCase:
    def __init__(self, task_repository: TaskRepositoryPort):
        super().__init__()
        self.task_repository = task_repository

    async def execute(self) -> list[Task]:
        return await self.task_repository.get_all()
