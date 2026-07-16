from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.domain.usecases.GetAllTasksUseCase import GetAllTasksUseCase
from src.domain.usecases.CreateTaskUseCase import CreateTaskUseCase
from src.infrastructure.database.InitializeSession import get_session
from src.infrastructure.repository.TaskRepository import TaskRepository
from src.api.v1.schemas.TaskSchema import STask, STaskCreate, STasks

router = APIRouter(prefix="/api/v1/tasks", tags=["tasks"])

tasks: STasks = STasks(data=[])


# GET /api/v1/tasks/ Display list of tasks
@router.get("/", response_model=STasks)
async def get_tasks(session: AsyncSession = Depends(get_session)) -> STasks:
    repository = TaskRepository(session)
    use_case = GetAllTasksUseCase(repository)
    all_tasks = await use_case.execute()
    return STasks(data=all_tasks)


# POST /api/v1/tasks/ Add a new task
@router.post("/", response_model=STask)
async def add(task: STaskCreate, session: AsyncSession = Depends(get_session)) -> STask:
    repository = TaskRepository(session)
    use_case = CreateTaskUseCase(repository)
    new_task = await use_case.execute(
        title=task.title,
        description=task.description,
        priority=task.priority,
    )
    await session.commit()
    return new_task  # type: ignore


# DELETE /api/v1/tasks/ Remove a task
@router.delete("/{task_id}")
async def delete_task(task_id: UUID):
    pass


# PATCH /api/v1/tasks/ Change task
@router.patch("/{task_id}")
async def change_task(task_id: UUID):
    pass
