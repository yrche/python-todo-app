from fastapi import FastAPI
from src.api.v1.endpoints.TaskRouter import router as task_router
from src.infrastructure.database.InitializeSession import engine
from src.infrastructure.database.models.BaseModel import Base
from contextlib import asynccontextmanager


async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await setup_database()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(task_router)
