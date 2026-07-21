# Todo API Backend

Backend API for a todo application. Built with FastAPI, SQLAlchemy async support, and PostgreSQL.

## Architecture

The project follows Clean Architecture principles. Code is split into three layers:

- `domain` — pure business logic: task entities and repository ports. This layer defines application rules and does not contain HTTP, database, or framework-specific implementation details.
- `infrastructure` — technical implementations: SQLAlchemy models, database session setup, and the PostgreSQL repository.
- `api` — FastAPI routes and request/response schemas. This layer converts HTTP input into use-case calls and returns API responses.

Dependencies point inward: the API and infrastructure layers depend on the domain, while the domain does not depend on a database or HTTP transport.

## Features

- Create tasks
- List tasks
- Search tasks by title or description
- Filter tasks by completion status
- Sort tasks by priority
- Update task fields and completion status
- Delete tasks

Task priority is limited to values from `1` to `10`.

## Requirements

- Python 3.14 or newer
- PostgreSQL
- [uv](https://docs.astral.sh/uv/)

## Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/todo_db
ORIGIN_URL=http://localhost:3000
```

`DATABASE_URL` is used by SQLAlchemy. `ORIGIN_URL` is the allowed CORS origin for the frontend.

## Run locally

```bash
uv sync
uv run uvicorn src.main:app --reload
```

The API is available at `http://127.0.0.1:8000`. Tables are created on application startup.

## API

Base path: `/api/v1/tasks`

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/tasks` | List tasks |
| `POST` | `/api/v1/tasks` | Create a task |
| `PATCH` | `/api/v1/tasks/{task_id}` | Update a task |
| `DELETE` | `/api/v1/tasks/{task_id}` | Delete a task |

### List query parameters

| Parameter | Values | Description |
| --- | --- | --- |
| `status` | `all`, `done`, `undone` | Filter by completion status. Default: `all`. |
| `sort_priority` | `asc`, `desc` | Sort by priority. |
| `search` | string | Search in task title and description. |

### Create a task

```json
{
  "title": "Write README",
  "description": "Document the backend architecture",
  "priority": 5
}
```

### Update a task

All fields are optional in a `PATCH` request.

```json
{
  "complete": true,
  "priority": 3
}
```

Interactive API documentation is available at `/docs` when the application is running.

## Docker

Build and run the image after configuring the required environment variables:

```bash
docker build -t todo-backend .
docker run --env-file .env -p 8000:8000 todo-backend
```
