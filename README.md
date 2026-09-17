# Mini Microservices Task Dashboard

A simple full-stack assignment built with:

- React + Vite frontend
- FastAPI backend split into 3 microservices
  - user-service
  - task-service
  - message-service
- 4 Dockerfiles total
- One root docker-compose.yml
- GitHub Actions CI/CD with exactly 2 jobs
  1. Build & push all 4 images to GHCR
  2. Pull the GHCR images and push the same tags to Docker Hub

## Project structure

```text
.
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── user-service/
│   │   ├── app/main.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── task-service/
│   │   ├── app/main.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── message-service/
│       ├── app/main.py
│       ├── requirements.txt
│       └── Dockerfile
├── .github/workflows/ci-cd.yml
├── docker-compose.yml
└── .gitignore
```

## Run everything with Docker Compose

From the project root:

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:3000
- User service docs: http://localhost:8001/docs
- Task service docs: http://localhost:8002/docs
- Message service docs: http://localhost:8003/docs

Stop:

```bash
docker compose down
```

## Run frontend locally without Docker

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173

## Run one backend service locally

Example:

```bash
cd backend/user-service
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Use ports 8002 and 8003 for the other services.

## GitHub Actions secrets

For Docker Hub, add these repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

GHCR uses the built-in `GITHUB_TOKEN`, so no extra GHCR secret is needed.

## CI/CD tags

On a push to `main`, images are pushed with:

- `latest`
- `sha-<short-commit-sha>`

On a Git tag such as `v1.0.0`, images are pushed with:

- `v1.0.0`
- `sha-<short-commit-sha>`

Create a release tag with:

```bash
git tag v1.0.0
git push origin v1.0.0
```
