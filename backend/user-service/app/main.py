from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="User Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

USERS = [
    {"id": 1, "name": "Eron", "role": "DevOps Student"},
    {"id": 2, "name": "Arta", "role": "Frontend Student"},
    {"id": 3, "name": "Luan", "role": "Backend Student"},
]


@app.get("/")
def root():
    return {"service": "user-service", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy", "service": "user-service"}


@app.get("/api/users")
def get_users():
    return USERS
