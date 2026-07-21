from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.dml import DeleteDMLState

from src.domain.usecases.DeleteTaskUseCase import DeleteTaskUseCase
from src.domain.usecases.ChangeTaskUseCase import ChangeTaskUseCase
from src.domain.usecases.GetAllTasksUseCase import GetAllTasksUseCase
from src.domain.usecases.CreateTaskUseCase import CreateTaskUseCase
from src.infrastructure.database.InitializeSession import get_session
from src.infrastructure.repository.TaskRepository import TaskRepository
from src.api.v1.schemas.TaskSchema import (
    SSortOrder,
    STask,
    STaskCreate,
    STaskDelete,
    STaskDeleteMsg,
    STaskStatus,
    STaskUpdate,
    STasks,
)

router = APIRouter(prefix="/api/v1/tasks", tags=["tasks"])

tasks: STasks = STasks(data=[])


# GET /api/v1/tasks/ Display list of tasks
@router.get("", response_model=STasks)
async def get_tasks(
    session: AsyncSession = Depends(get_session),
    status: STaskStatus = STaskStatus.ALL,
    sort_priority: SSortOrder | None = None,
    search: str | None = None,
) -> STasks:
    repository = TaskRepository(session)
    use_case = GetAllTasksUseCase(repository)
    all_tasks = await use_case.execute(status, sort_priority, search)
    return STasks.model_validate({"data": all_tasks})


# POST /api/v1/tasks/ Add a new task
@router.post("", response_model=STask)
async def add(
    task: STaskCreate,
    session: AsyncSession = Depends(get_session),
) -> STask:
    repository = TaskRepository(session)
    use_case = CreateTaskUseCase(repository)
    new_task = await use_case.execute(
        title=task.title,
        description=task.description,
        priority=task.priority,
    )
    await session.commit()
    return STask.model_validate(new_task)


# DELETE /api/v1/tasks/{task_id} Remove a task
@router.delete("/{task_id}")
async def delete_task(
    task_id: int, session: AsyncSession = Depends(get_session)
) -> STask:
    repository = TaskRepository(session)
    use_case = DeleteTaskUseCase(repository)
    deleted_task = await use_case.execute(task_id)
    if not deleted_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return STask.model_validate(deleted_task)


# PATCH /api/v1/tasks/{task_id} Change task
@router.patch("/{task_id}")
async def change_task(
    task_id: int, task: STaskUpdate, session: AsyncSession = Depends(get_session)
) -> STask:
    repository = TaskRepository(session)
    use_case = ChangeTaskUseCase(repository)
    update_data = task.model_dump(exclude_unset=True)
    updated_task = await use_case.execute(task_id=task_id, data=update_data)
    return STask.model_validate(updated_task)
