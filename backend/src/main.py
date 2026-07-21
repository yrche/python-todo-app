from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.v1.endpoints.TaskRouter import router as task_router
from src.infrastructure.database.InitializeSession import engine
from src.infrastructure.database.models.BaseModel import Base
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os

load_dotenv()
origin_url = os.getenv("ORIGIN_URL")

if not origin_url:
    raise ValueError("ORIGIN_URL environment variable is not set")


async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await setup_database()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)
