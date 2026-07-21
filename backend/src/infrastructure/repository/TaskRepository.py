from sqlalchemy import delete as sql_delete, or_, select

from src.api.v1.schemas.TaskSchema import STaskStatus, SSortOrder, STaskUpdate
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
    async def get_all(
        self, status: STaskStatus, sort_priority: SSortOrder | None, search: str | None
    ):
        query = select(TaskModel)

        if search and search.strip():
            query = query.where(
                TaskModel.title.ilike(f"%{search}%")
                | TaskModel.description.ilike(f"%{search}%")
            )

        if status == STaskStatus.DONE:
            query = query.where(TaskModel.complete.is_(True))
        elif status == STaskStatus.UNDONE:
            query = query.where(TaskModel.complete.is_(False))

        order_clauses = []

        if status not in (STaskStatus.DONE, STaskStatus.UNDONE):
            order_clauses.append(TaskModel.complete.asc())

        if sort_priority == SSortOrder.ASC:
            order_clauses.append(TaskModel.priority.asc())
        elif sort_priority == SSortOrder.DESC:
            order_clauses.append(TaskModel.priority.desc())

        order_clauses.append(TaskModel.id.desc())

        query = query.order_by(*order_clauses)

        result = await self.session.execute(query)
        db_tasks = result.scalars().all()
        return [Task.model_validate(db_task) for db_task in db_tasks]

    @override
    async def add(self, data: Task) -> Task:
        task_dict = data.model_dump(exclude={"id"})
        task = TaskModel(**task_dict)
        self.session.add(task)
        await self.session.flush()

        return Task.model_validate(task)

    @override
    async def change_task(self, task_id: int, data: dict) -> Task:
        query = select(TaskModel).where(TaskModel.id == task_id)
        result = await self.session.execute(query)
        db_task = result.scalars().first()

        if not db_task:
            raise ValueError(f"Task with id {task_id} not found")

        for key, value in data.items():
            setattr(db_task, key, value)

        await self.session.commit()

        return Task.model_validate(db_task)

    @override
    async def delete_task(self, task_id: int) -> Task | bool:
        query = select(TaskModel).where(TaskModel.id == task_id)
        result = await self.session.execute(query)
        db_task = result.scalars().first()

        if not db_task:
            return False

        await self.session.delete(db_task)
        await self.session.commit()

        return Task.model_validate(db_task)
