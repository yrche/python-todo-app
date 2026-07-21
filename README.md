# Todo Application

Full-stack task management application. It supports creating, listing, searching, filtering, updating, completing, and deleting tasks. Tasks have a title, description, completion status, and priority from 1 to 10.

## Architecture

The repository is split into independent frontend and backend applications:

- `frontend/` — browser client and user interface.
- `backend/` — HTTP API and PostgreSQL persistence layer.

The frontend communicates with the backend through the REST API under `/api/v1/tasks`.

## Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Chakra UI
- TanStack Query
- Native Fetch API

### Backend

- Python 3.14+
- FastAPI
- SQLAlchemy with asynchronous database access
- PostgreSQL
- asyncpg
- Pydantic Settings
- Uvicorn
- uv

## Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
