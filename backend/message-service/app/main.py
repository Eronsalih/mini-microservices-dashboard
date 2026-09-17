from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Message Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

MESSAGES = [
    {"id": 1, "author": "System", "text": "All three FastAPI services are connected."},
    {"id": 2, "author": "Eron", "text": "Next step: build the images and test Docker Compose."},
    {"id": 3, "author": "CI/CD", "text": "Push to main to publish images to GHCR and Docker Hub."},
]


@app.get("/")
def root():
    return {"service": "message-service", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy", "service": "message-service"}


@app.get("/api/messages")
def get_messages():
    return MESSAGES
