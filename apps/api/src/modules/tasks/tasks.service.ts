import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '@/providers/prisma/prisma.service';
import {
  ResourceNotFoundException,
  UnauthorizedResourceException,
} from '@/common/exceptions/custom-exceptions';
import { generateSlug } from '@/utils/slug.util';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTaskDto: CreateTaskDto,
    projectSlug: string,
    featureSlug: string,
    userId: string,
  ) {
    // 1. Validate Feature Existence & Ownership via Hierarchy
    const feature = await this.prisma.feature.findFirst({
      where: {
        slug: featureSlug,
        project: {
          slug: projectSlug,
        },
      },
      include: {
        project: true,
      },
    });

    if (!feature) {
      throw new ResourceNotFoundException(
        'Feature',
        `${projectSlug}/${featureSlug}`,
      );
    }

    if (feature.project.userId !== userId) {
      throw new UnauthorizedResourceException('feature');
    }

    // Generate Slug
    let slug = generateSlug(createTaskDto.title);
    // Check if slug exists for this feature
    let slugExists = await this.prisma.task.findFirst({
      where: { featureId: feature.id, slug },
    });
    let counter = 1;

    while (slugExists) {
      slug = generateSlug(createTaskDto.title) + `-${counter}`;
      slugExists = await this.prisma.task.findFirst({
        where: { featureId: feature.id, slug },
      });
      counter++;
    }

    // 2. Create Task
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        slug,
        feature: {
          connect: {
            id: feature.id,
          },
        },
      },
      include: {
        feature: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findAll(projectSlug: string, featureSlug: string, userId: string) {
    // Validate hierarchy first (optional but good for error messages) or just filter
    const whereCondition: any = {
      feature: {
        slug: featureSlug,
        project: {
          slug: projectSlug,
          userId: userId,
        },
      },
    };

    return this.prisma.task.findMany({
      where: whereCondition,
      include: {
        feature: {
          include: {
            project: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    projectSlug: string,
    featureSlug: string,
    taskSlug: string,
    userId: string,
  ) {
    const task = await this.prisma.task.findFirst({
      where: {
        slug: taskSlug,
        feature: {
          slug: featureSlug,
          project: {
            slug: projectSlug,
          },
        },
      },
      include: {
        feature: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!task) {
      throw new ResourceNotFoundException(
        'Task',
        `${projectSlug}/${featureSlug}/${taskSlug}`,
      );
    }

    if (task.feature.project.userId !== userId) {
      throw new UnauthorizedResourceException('task');
    }

    return task;
  }

  async update(
    projectSlug: string,
    featureSlug: string,
    taskSlug: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ) {
    // Ensure task exists and belongs to user
    const task = await this.findOne(projectSlug, featureSlug, taskSlug, userId);

    return this.prisma.task.update({
      where: { id: task.id },
      data: updateTaskDto,
    });
  }

  async remove(
    projectSlug: string,
    featureSlug: string,
    taskSlug: string,
    userId: string,
  ) {
    // Ensure task exists and belongs to user
    const task = await this.findOne(projectSlug, featureSlug, taskSlug, userId);

    return this.prisma.task.delete({
      where: { id: task.id },
    });
  }
}
