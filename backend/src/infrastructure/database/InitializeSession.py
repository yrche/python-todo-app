from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

postgresql_url = os.getenv("DATABASE_URL")
if not postgresql_url:
    raise ValueError("DATABASE_URL variable is not set in the environment or .env file")

engine = create_async_engine(postgresql_url)
Session = async_sessionmaker(engine, expire_on_commit=False)


async def get_session():
    async with Session() as session:
        yield session
