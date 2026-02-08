# 🐳 Docker Deployment Guide - Rally

> **Quick Start**: Get Rally running with Docker in under 5 minutes

## 📋 Prerequisites

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher

Check your versions:

```bash
docker --version
docker compose version
```

## 🚀 Quick Start (Production)

### 1. Clone and Navigate

```bash
git clone https://github.com/esteban-abanto-2709/task-management-platform.git
cd task-management-platform
cd apps/docker
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit with your secure values (IMPORTANT!)
nano .env  # or use your preferred editor
```

**⚠️ IMPORTANT**: Change these default values in `.env`:

```env
POSTGRES_PASSWORD=your_secure_database_password_here
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars_long
```

### 3. Build and Start

```bash
# Build images and start all services
docker compose up -d

# View logs (optional)
docker compose logs -f
```

### 4. Verify Deployment

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

**Expected output at /health**:

```json
{
  "status": "ok",
  "timestamp": "2026-01-29T10:30:00.000Z",
  "database": "connected"
}
```

### 5. Stop Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (⚠️ deletes all data)
docker compose down -v
```

---

## 📁 Docker File Structure

```
task-management-platform/
└── apps/
    ├── docker/
    │   ├── docker-compose.yml   # Orchestrates all services
    │   ├── .dockerignore        # Files to exclude from builds
    │   ├── .env.example         # Example environment variables
    │   └── .env                 # Your actual env vars (git-ignored)
    ├── api/
    │   └── Dockerfile           # Backend container definition
    └── web/
        └── Dockerfile           # Frontend container definition
```

---

## 🎯 Docker Services Overview

| Service    | Port | Description            | Health Check  |
| ---------- | ---- | ---------------------- | ------------- |
| `postgres` | 5432 | PostgreSQL 16 database | `pg_isready`  |
| `api`      | 4000 | NestJS backend API     | `GET /health` |
| `web`      | 3000 | Next.js frontend       | `GET /`       |

---

## 🔧 Development Mode

For development with hot-reload, uncomment the volume mounts in `docker-compose.yml`:

```yaml
# In the 'api' service:
volumes:
  - ./apps/api/src:/app/src
  - /app/node_modules

# In the 'web' service:
volumes:
  - ./apps/web/src:/app/src
  - /app/.next
  - /app/node_modules
```

Then restart:

```bash
docker compose down
docker compose up -d
```

---

## 📊 Common Commands

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f api
docker compose logs -f web
docker compose logs -f postgres
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart api
```

### Access Container Shell

```bash
# Backend API
docker compose exec api sh

# Frontend Web
docker compose exec web sh

# Database
docker compose exec postgres psql -U taskflow_user -d taskflow
```

### Database Operations

```bash
# Run migrations
docker compose exec api npx prisma migrate deploy

# Access database CLI
docker compose exec postgres psql -U taskflow_user -d taskflow

# Backup database
docker compose exec postgres pg_dump -U taskflow_user taskflow > backup.sql

# Restore database
docker compose exec -T postgres psql -U taskflow_user taskflow < backup.sql
```

### Clean Up

```bash
# Stop and remove containers
docker compose down

# Remove containers and volumes (⚠️ DATA LOSS)
docker compose down -v

# Remove everything including images
docker compose down -v --rmi all
```

---

## 🔒 Security Best Practices

### 1. Environment Variables

- ✅ **Never commit** `.env` to version control
- ✅ Use **strong, unique passwords** (minimum 32 characters)
- ✅ Generate JWT secret: `openssl rand -base64 32`
- ✅ Use different secrets for development/production

### 2. Database

- ✅ Change default `POSTGRES_PASSWORD`
- ✅ Restrict PostgreSQL port exposure in production
- ✅ Enable SSL for database connections in production

### 3. Production Deployment

- ✅ Use environment-specific compose files
- ✅ Implement proper logging and monitoring
- ✅ Set up automated backups
- ✅ Use Docker secrets for sensitive data

---

## 🐛 Troubleshooting

### Issue: Port Already in Use

```bash
# Check what's using the port
lsof -i :3000  # or :4000, :5432

# Kill the process or change ports in docker-compose.yml
```

### Issue: Database Connection Failed

```bash
# Check if postgres is healthy
docker compose ps

# View postgres logs
docker compose logs postgres

# Restart postgres
docker compose restart postgres
```

### Issue: Frontend Can't Connect to API

1. Check `NEXT_PUBLIC_API_URL` in `docker-compose.yml`
2. Ensure API is running: `docker compose ps api`
3. Test API health: `curl http://localhost:4000/health`

### Issue: Build Fails

```bash
# Clean build cache and rebuild
docker compose build --no-cache

# Or rebuild specific service
docker compose build --no-cache api
```

### Issue: Database Migrations Not Running

```bash
# Manually run migrations
docker compose exec api npx prisma migrate deploy

# Reset database (⚠️ DATA LOSS)
docker compose exec api npx prisma migrate reset
```

---

## 📈 Performance Tips

### 1. Use .dockerignore

Ensure `.dockerignore` excludes:

- `node_modules`
- `.git`
- `.env*`
- `dist/build/.next`

### 2. Multi-stage Builds

Both Dockerfiles use multi-stage builds to:

- Reduce final image size (70-80% smaller)
- Improve security (no dev dependencies)
- Faster deployments

### 3. Volume Mounts

Production volumes are anonymous for better performance:

```yaml
volumes:
  - /app/node_modules # Anonymous volume
```

---

## 🚢 Production Deployment

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml taskflow

# Scale services
docker service scale taskflow_api=3
```

### Using Kubernetes

See `k8s/` directory for Kubernetes manifests (if available).

### Cloud Platforms

- **AWS**: Use ECS or EKS
- **Google Cloud**: Use Cloud Run or GKE
- **Azure**: Use Container Instances or AKS
- **DigitalOcean**: Use App Platform or Kubernetes

---

## 📝 Configuration Reference

### docker-compose.yml

- `version`: Compose file format version
- `services`: Container definitions
- `networks`: Internal networking
- `volumes`: Persistent data storage

### Environment Variables

**API Service:**

```env
PORT=4000                    # Backend port
DATABASE_URL=postgresql://...  # Database connection
JWT_SECRET=your-secret       # Authentication secret
NODE_ENV=production          # Environment mode
```

**Web Service:**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000  # API endpoint
NODE_ENV=production                        # Environment mode
```

**PostgreSQL:**

```env
POSTGRES_DB=taskflow         # Database name
POSTGRES_USER=taskflow_user  # Database user
POSTGRES_PASSWORD=...        # Database password
```

---

## 🎓 Learning Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

## 🆘 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review service logs: `docker compose logs`
3. Open an issue on GitHub
4. Join our community Discord (if available)

---

**Made with ❤️ by Wilder Esteban Abanto Garcia**
