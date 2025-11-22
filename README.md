# Notes Management App

Application for creating, editing, and deleting notes.

## Tech Stack

-   Backend: .NET 9 Web API
-   Frontend: React + TypeScript
-   Database: NS SQL Server
-   Docker

## Getting Started

### Prerequisites

-   .NET 9 SDK
-   Node.js 18+
-   Docker & Docker Compose

### Run Locally

Backend:

```bash
cd backend/NotesApp.API
dotnet run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Run with Docker

```bash
docker-compose up
```

## Project Structure

```
notes-management-app/
├── backend/          # .NET Web API
├── frontend/         # React application
└── docker-compose.yml
```
