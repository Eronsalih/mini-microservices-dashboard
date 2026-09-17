from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Task Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

TASKS = [
    {"id": 1, "title": "Create React dashboard", "user_id": 2, "done": True},
    {"id": 2, "title": "Create FastAPI services", "user_id": 3, "done": True},
    {"id": 3, "title": "Test Docker Compose", "user_id": 1, "done": False},
    {"id": 4, "title": "Run CI/CD pipeline", "user_id": 1, "done": False},
]


@app.get("/")
def root():
    return {"service": "task-service", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy", "service": "task-service"}


@app.get("/api/tasks")
def get_tasks():
    return TASKS
