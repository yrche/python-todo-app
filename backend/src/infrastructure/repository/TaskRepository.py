from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from typing import override

from src.domain.entities.Task import Task
from src.domain.ports.TaskRepositoryPort import TaskRepositoryPort
from src.infrastructure.database.models.TaskModel import TaskModel


class TaskRepository(TaskRepositoryPort):
    session: AsyncSession

    def __init__(self, session: AsyncSession):
        super().__init__()
        self.session = session

    @override
    async def get_all(self) -> list[Task]:
        result = await self.session.execute(select(TaskModel))
        tasks = list(result.scalars().all())
        return [Task.model_validate(task) for task in tasks]

    @override
    async def add(self, data: Task) -> Task:
        task_dict = data.model_dump(exclude={"id"})
        task = TaskModel(**task_dict)
        self.session.add(task)
        await self.session.flush()

        return Task.model_validate(task)
