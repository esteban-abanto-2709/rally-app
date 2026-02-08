import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { PrismaService } from '@/providers/prisma/prisma.service';
import { generateSlug } from '@/utils/slug.util';
import {
  ResourceNotFoundException,
  UnauthorizedResourceException,
} from '@/common/exceptions/custom-exceptions';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createFeatureDto: CreateFeatureDto,
    projectSlug: string,
    userId: string,
  ) {
    // 1. Validate Project Ownership
    const project = await this.prisma.project.findFirst({
      where: {
        slug: projectSlug,
        userId,
      },
    });

    if (!project) {
      throw new ResourceNotFoundException('Project', projectSlug);
    }

    // 2. Generate and validate Slug
    let slug = generateSlug(createFeatureDto.name);
    let slugExists = await this.prisma.feature.findFirst({
      where: { projectId: project.id, slug },
    });
    let counter = 1;

    while (slugExists) {
      slug = generateSlug(createFeatureDto.name) + `-${counter}`;
      slugExists = await this.prisma.feature.findFirst({
        where: { projectId: project.id, slug },
      });
      counter++;
    }

    // 3. Create Feature
    return this.prisma.feature.create({
      data: {
        ...createFeatureDto,
        slug,
        project: {
          connect: {
            id: project.id,
          },
        },
      },
    });
  }

  async findAll(projectSlug: string, userId: string) {
    // Validate project ownership
    const project = await this.prisma.project.findFirst({
      where: {
        slug: projectSlug,
        userId,
      },
    });

    if (!project) {
      throw new ResourceNotFoundException('Project', projectSlug);
    }

    return this.prisma.feature.findMany({
      where: { projectId: project.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
  }

  async findOne(projectSlug: string, featureSlug: string, userId: string) {
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

    return feature;
  }

  async update(
    projectSlug: string,
    featureSlug: string,
    updateFeatureDto: UpdateFeatureDto,
    userId: string,
  ) {
    const feature = await this.findOne(projectSlug, featureSlug, userId);

    return this.prisma.feature.update({
      where: { id: feature.id },
      data: updateFeatureDto,
    });
  }

  async remove(projectSlug: string, featureSlug: string, userId: string) {
    const feature = await this.findOne(projectSlug, featureSlug, userId);

    return this.prisma.feature.delete({
      where: { id: feature.id },
    });
  }
}
