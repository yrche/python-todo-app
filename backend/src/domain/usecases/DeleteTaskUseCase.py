from src.domain.ports.TaskRepositoryPort import TaskRepositoryPort


class DeleteTaskUseCase:

    def __init__(self, task_repository: TaskRepositoryPort) -> None:
        super().__init__()
        self.task_repository = task_repository

    async def execute(self, task_id: int) -> bool:
        return await self.task_repository.delete_task(task_id)
