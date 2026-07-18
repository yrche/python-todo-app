from src.api.v1.schemas.TaskSchema import SSortOrder, STaskStatus
from src.domain.entities.Task import Task
from src.domain.ports.TaskRepositoryPort import TaskRepositoryPort


class GetAllTasksUseCase:
    def __init__(self, task_repository: TaskRepositoryPort):
        super().__init__()
        self.task_repository = task_repository

    async def execute(
        self, status: STaskStatus, sort_priority: SSortOrder | None, search: str | None
    ) -> list[Task]:
        return await self.task_repository.get_all(status, sort_priority, search)
