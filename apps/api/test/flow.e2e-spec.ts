import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '@/providers/prisma/prisma.service';
import { AppModule } from '@/app.module';

describe('Task Management Flow (E2E)', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;
  let projectId: string;
  let projectSlug: string;
  let featureSlug: string;
  let taskSlug: string;

  // Test data with randomness to avoid collisions
  const uniqueId = Date.now();
  const userData = {
    email: `test${uniqueId}@example.com`,
    password: 'password123',
    name: 'Test User',
  };
  const projectData = {
    name: `Project ${uniqueId}`,
    description: 'E2E Test Project',
  };
  const featureData = {
    name: `Feature ${uniqueId}`,
    description: 'E2E Test Feature',
  };
  const taskData = {
    title: `Task ${uniqueId}`,
    description: 'E2E Test Task',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
  });

  describe('1. Authentication', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      token = response.body.access_token;
      userId = response.body.user.id;
    });

    it('should login', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
      token = response.body.access_token;
    });
  });

  describe('2. Project Management (Short Routes: /p)', () => {
    it('should create a project', async () => {
      const response = await request(app.getHttpServer())
        .post('/p')
        .set('Authorization', `Bearer ${token}`)
        .send(projectData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('slug');
      expect(response.body.name).toBe(projectData.name);
      projectId = response.body.id;
      projectSlug = response.body.slug;
    });

    it('should list projects', async () => {
      const response = await request(app.getHttpServer())
        .get('/p')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      const createdProject = response.body.find((p) => p.slug === projectSlug);
      expect(createdProject).toBeDefined();
    });
  });

  describe('3. Feature Management (Hierarchical: /p/:projectSlug/f)', () => {
    it('should create a feature in the project', async () => {
      const response = await request(app.getHttpServer())
        .post(`/p/${projectSlug}/f`)
        .set('Authorization', `Bearer ${token}`)
        .send(featureData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('slug');
      expect(response.body.name).toBe(featureData.name);
      // Ensure projectId is NOT in response body if we removed it from DTO return or simple checks
      featureSlug = response.body.slug;
    });

    it('should list features for the project', async () => {
      const response = await request(app.getHttpServer())
        .get(`/p/${projectSlug}/f`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      const createdFeature = response.body.find((f) => f.slug === featureSlug);
      expect(createdFeature).toBeDefined();
    });

    it('should get a specific feature by hierarchy', async () => {
      const response = await request(app.getHttpServer())
        .get(`/p/${projectSlug}/f/${featureSlug}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.slug).toBe(featureSlug);
    });
  });

  describe('4. Task Management (Hierarchical: /p/:pSlug/f/:fSlug/t)', () => {
    it('should create a task in the feature', async () => {
      const response = await request(app.getHttpServer())
        .post(`/p/${projectSlug}/f/${featureSlug}/t`)
        .set('Authorization', `Bearer ${token}`)
        .send(taskData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('slug');
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.status).toBe('TODO');
      taskSlug = response.body.slug;
    });

    it('should list tasks for the feature', async () => {
      const response = await request(app.getHttpServer())
        .get(`/p/${projectSlug}/f/${featureSlug}/t`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      const createdTask = response.body.find((t) => t.slug === taskSlug);
      expect(createdTask).toBeDefined();
    });

    it('should get task details by hierarchical slug', async () => {
      const response = await request(app.getHttpServer())
        .get(`/p/${projectSlug}/f/${featureSlug}/t/${taskSlug}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.slug).toBe(taskSlug);
      expect(response.body.title).toBe(taskData.title);
    });

    it('should update task status', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/p/${projectSlug}/f/${featureSlug}/t/${taskSlug}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'DOING',
        })
        .expect(200);

      expect(response.body.status).toBe('DOING');
    });

    it('should delete the task', async () => {
      await request(app.getHttpServer())
        .delete(`/p/${projectSlug}/f/${featureSlug}/t/${taskSlug}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // Verify it's gone
      await request(app.getHttpServer())
        .get(`/p/${projectSlug}/f/${featureSlug}/t/${taskSlug}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('5. Cleanup (Deletion)', () => {
    it('should delete the feature', async () => {
      await request(app.getHttpServer())
        .delete(`/p/${projectSlug}/f/${featureSlug}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should delete the project', async () => {
      await request(app.getHttpServer())
        .delete(`/p/${projectId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
});
