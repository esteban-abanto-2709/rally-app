# TaskFlow - Task Management Platform

> A modern full-stack task management platform showcasing clean architecture, real-world patterns, and production-ready practices.

![Status](https://img.shields.io/badge/status-MVP-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Docker](https://img.shields.io/badge/docker-ready-blue)

## 🎯 Project Overview

TaskFlow is a production-ready task management system built to demonstrate:

- **Clean Architecture**: Separation of concerns with NestJS modules and Next.js App Router
- **Type Safety**: End-to-end TypeScript implementation
- **Modern Stack**: Latest versions of NestJS, Next.js, Prisma, and PostgreSQL
- **Professional Patterns**: JWT authentication, state management with Zustand, custom hooks
- **Best Practices**: Validation, error handling, responsive design with TailwindCSS + shadcn/ui
- **Docker Ready**: Full containerization with docker-compose for easy deployment

## 🏗️ Tech Stack

### Backend (NestJS)

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator + class-transformer

### Frontend (Next.js)

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State**: Zustand (global state) + React hooks
- **UI Components**: Radix UI primitives

## ✨ Features

### Implemented (MVP)

- ✅ User authentication (register/login/logout)
- ✅ JWT-based session management
- ✅ Project CRUD operations
- ✅ Task CRUD operations
- ✅ Task status workflow (Open → In Progress → Done)
- ✅ Protected routes and API endpoints
- ✅ Responsive dashboard UI
- ✅ Real-time state synchronization
- ✅ Inline editing for projects and tasks
- ✅ Docker containerization with docker-compose

## 🚀 Quick Start

### Option 1: Docker (Recommended) 🐳

**Prerequisites**: Docker & Docker Compose installed

```bash
# 1. Clone the repository
git clone https://github.com/esteban-abanto-2709/task-management-platform.git
cd task-management-platform

# 2. Configure environment
cd apps/docker
cp .env.example .env
# Edit .env with your secure passwords

# 3. Start all services
docker compose up -d

# 4. Access the application
```

**📖 Full Docker documentation**: See [README.md](./apps/docker/README.md) for detailed instructions, troubleshooting, and advanced usage.

---

### Option 2: Manual Setup

#### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm/yarn/pnpm

#### Installation

1. **Clone the repository**

```bash
git clone https://github.com/esteban-abanto-2709/task-management-platform.git
cd taskflow
```

2. **Install dependencies**

```bash
# Backend
cd apps/api
npm install

# Frontend
cd ../web
npm install
```

3. **Configure environment variables**

Create `apps/api/.env`:

```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. **Setup database**

```bash
cd apps/api
npx prisma migrate deploy
```

5. **Run the application**

Terminal 1 - Backend:

```bash
cd apps/api
npm run start:dev
```

Terminal 2 - Frontend:

```bash
cd apps/web
npm run dev
```

6. **Access the app**

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Health check: http://localhost:4000/health

## 📁 Project Structure

```
task-management-platform/
├── apps/
│   ├── docker/                 # Docker orchestration & config
│   │   ├── docker-compose.yml
│   │   ├── .env.example
│   │   └── README.md
│   │
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/          # Authentication module
│   │   │   ├── users/         # Users module
│   │   │   ├── projects/      # Projects module
│   │   │   ├── tasks/         # Tasks module
│   │   │   └── prisma/        # Prisma service
│   │   ├── prisma/
│   │   │   └── schema.prisma  # Database schema
│   │   └── Dockerfile         # Backend Docker image
│   │
│   └── web/                    # Next.js Frontend
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   ├── components/    # React components
│       │   ├── contexts/      # React contexts
│       │   ├── hooks/         # Custom hooks
│       │   ├── lib/           # Utilities
│       │   ├── store/         # Zustand stores
│       │   └── types/         # TypeScript types
│       ├── public/
│       └── Dockerfile         # Frontend Docker image
│
├── LICENSE
├── README.md
└── Roadmap.md
```

## 🎨 Architecture Highlights

### Backend Architecture

- **Modular Design**: Each feature (auth, users, projects, tasks) is a separate NestJS module
- **Service Layer**: Business logic isolated in services
- **DTO Validation**: Automatic request validation with class-validator
- **Global Error Handling**: Consistent error responses
- **Database Layer**: Prisma ORM with PostgreSQL

### Frontend Architecture

- **App Router**: Modern Next.js routing with Server/Client components
- **State Management**: Zustand for projects, React Context for auth
- **Custom Hooks**: Reusable logic (useProjects, useTasks, useDialogState, etc.)
- **Component Library**: shadcn/ui for consistent, accessible components
- **Type Safety**: Shared types between frontend and backend

## 🔐 Authentication Flow

1. User registers/logs in via `/auth/register` or `/auth/login`
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage and used for authenticated requests
4. Frontend AuthContext provides user state and auth methods globally
5. Protected routes check authentication before rendering

## 📊 Database Schema

```prisma
User
├── id: String (UUID)
├── email: String (unique)
├── password: String (hashed)
├── name: String?
└── projects: Project[]

Project
├── id: String (UUID)
├── name: String
├── description: String?
├── userId: String
└── tasks: Task[]

Task
├── id: String (UUID)
├── title: String
├── description: String?
├── status: TaskStatus (OPEN | IN_PROGRESS | DONE)
└── projectId: String
```

## 🧪 Testing

```bash
# Backend tests
cd apps/api
npm run test

# Frontend tests (when implemented)
cd apps/web
npm run test
```

## 📝 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Projects

- `GET /projects` - List user's projects (protected)
- `POST /projects` - Create project (protected)
- `GET /projects/:id` - Get project details (protected)
- `PATCH /projects/:id` - Update project (protected)
- `DELETE /projects/:id` - Delete project (protected)

### Tasks

- `GET /tasks` - List tasks (optionally filtered by projectId) (protected)
- `POST /tasks` - Create task (protected)
- `GET /tasks/:id` - Get task details (protected)
- `PATCH /tasks/:id` - Update task (protected)
- `DELETE /tasks/:id` - Delete task (protected)

## 🐳 Docker Deployment

TaskFlow includes full Docker support for easy deployment through the `apps/docker` directory:

- **docker-compose.yml**: Orchestrates API, Web, and PostgreSQL
- **Multi-stage builds**: Optimized production images
- **Health checks**: Automatic service monitoring
- **Volume persistence**: Database data survives container restarts

**Quick Deploy**:

```bash
cd apps/docker
docker compose up -d
```

**📖 See [docker/README.md](./apps/docker/README.md)** for complete documentation.

## 🎯 Current Status

**MVP Complete** ✅ - Ready for portfolio/CV

The project demonstrates:

- Full-stack TypeScript development
- Modern React patterns (App Router, hooks, contexts)
- Backend architecture with NestJS
- Database design and ORM usage
- Authentication and authorization
- State management
- Responsive UI/UX
- Docker containerization

See [Roadmap.md](./Roadmap.md) for future enhancements.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details

## 👤 Author

**Wilder Esteban Abanto Garcia**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/esteban-abanto/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/esteban-abanto-2709)
[![Portfolio](https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=google-chrome&logoColor=white)](https://esteban-abanto.vercel.app/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:esteban.abanto.2709@gmail.com)

---

**Note**: This is a portfolio project showcasing full-stack development skills. For production use, additional features like email verification, password reset, comprehensive testing, and deployment configuration would be recommended (see Roadmap.md).
