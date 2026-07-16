import asyncio
from src.infrastructure.database.InitializeSession import engine
from src.infrastructure.database.models.BaseModel import Base

from src.infrastructure.database.models.TaskModel import TaskModel


async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(setup_database())
