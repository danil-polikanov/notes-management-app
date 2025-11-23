# Notes Management App

Application for creating, editing, and deleting notes.

## Tech Stack

-   Backend: .NET 9 Web API
-   Frontend: React + TypeScript
-   Database: NS SQL Server
-   Docker

## Getting Started

### Prerequisites

🛠️ Technology Stack

-   .NET 9 SDK
-   Node.js 18+
-   //Docker & Docker Compose
-   React 18 - UI library with hooks
-   TypeScript - Type-safe JavaScript
-   Vite - Next-generation build tool
-   Redux Toolkit - State management
-   React i18next - Internationalization
-   Axios - HTTP client
-   SCSS - CSS preprocessor
-   Cypress - E2E testing
-   React Toastify - Toast notifications

### Run Locally

need to create frontend/.env
and copy to it code from .env.example
Edit `.env` with your values:

same for .env in backend/NotesApp.API

1. Copy env files
   cp .env.example .env
   cp client/.env.example client/.env
2. Backend
   cd backend
   dotnet restore
   dotnet run

3. Frontend
   cd client
   npm install
   npm run dev

4. Trust HTTPS cert (once)
   dotnet dev-certs https --trust

5. E2E tests (optional)
   npx cypress open

### Run with Docker

```bash
###docker-compose up
```

🔌 Backend Integration
GET /api/notes # Get all notes
GET /api/notes/:id # Get note by ID
POST /api/notes # Create note
PUT /api/notes/:id # Update note
DELETE /api/notes/:id # Delete note

throughout

🐛 Troubleshooting
Common Issues:

1. CORS Error

Solution: Enable CORS on your backend (see BACKEND_INTEGRATION.md)

2. Cannot Connect to Backend

Check if backend is running
Verify VITE_API_URL in .env file

3. Tests Failing

Check if backend is accessible

## Project Structure

```
notes-management-app/
├── backend/          # .NET Web API
├── frontend/         # React application
└── docker-compose.yml
```

```
NotesApp.API/
├── NoteApp.Core/                      # Core domain layer
│   ├── Entities/                     # Domain entities
│   │   └── Notes.cs                 # Note entity
│   └── Interfaces/                   # Core interfaces
│       └── INoteRepository.cs       # Repository interface
│
├── NoteApp.Infrastructure/           # Infrastructure layer
│   ├── Data/                        # Database context
│   │   └── AppDbContext.cs         # EF Core DbContext
│   └── Repositories/                # Repository implementations
│       └── NoteRepository.cs       # Note repository
│
├── NotesApp.API/                     # API presentation layer
│   ├── CommonServices/              # Shared services
│   ├── Properties/                   # Project properties
│   ├── Controllers/                  # API controllers
│   │   └── NotesController.cs      # Notes endpoints
│   ├── DTOs/                        # Data Transfer Objects
│   │   ├── CreateNoteDTO.cs        # Create note DTO
│   │   ├── ErrorResponseDTO.cs     # Error response DTO
│   │   └── UpdateNoteDTO.cs        # Update note DTO
│   ├── Mappings/                    # AutoMapper profiles
│   │   └── MappingProfile.cs       # Mapping configuration
│   ├── .env                         # Environment variables
│   ├── .env.example                # Environment template
│   ├── appsettings.json            # App settings
│   ├── appsettings.Development.json # Development settings
│   └── Program.cs                   # Application entry point
│
└── Solution "NotesApp.API"           # Solution file
```

Technology Stack
Frontend

Framework: React 18
Language: TypeScript
Build Tool: Vite
Testing: Cypress
State Management: Redux/Context API
Styling: SCSS Modules

Backend

Framework: ASP.NET Core
Language: C#
Architecture: Clean Architecture (Core → Infrastructure → API)
Database: Entity Framework Core/ InMemory
API Pattern: RESTful API
DTOs: AutoMapper

📦 Key Features
Frontend Structure

Component-based architecture for reusability
TypeScript for type safety
Internationalization (i18n) support
Cypress for comprehensive E2E testing
Environment-based configuration

Backend Structure

Clean Architecture with clear separation of concerns
Repository Pattern for data access abstraction
DTO Pattern for API contracts
AutoMapper for object mapping
Environment-based configuration

🔧 Configuration Files
Frontend
FilePurposevite.config.tsVite bundler configurationtsconfig.jsonTypeScript compiler optionseslint.config.jsCode linting rulescypress.config.tsE2E testing setup.envEnvironment variables
Backend
FilePurposeProgram.csApplication entry point & DI setupappsettings.jsonApp configurationAppDbContext.csDatabase context.envEnvironment variables

📝 Notes

Frontend uses modern React with TypeScript for type-safe development
Backend follows Clean Architecture principles with separated concerns
Both projects use environment variables for configuration
Testing is set up with Cypress for frontend E2E tests
