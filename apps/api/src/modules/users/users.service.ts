import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/providers/prisma/prisma.service';
import { generateSlug } from '@/utils/slug.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(authId: string, name?: string, emailForSlug?: string) {
    // Generate Slug
    // Use name or email (from auth) to generate slug
    const baseSlugSource = name || emailForSlug?.split('@')[0] || 'user';
    let slug = generateSlug(baseSlugSource);
    let slugExists = await this.prisma.user.findUnique({ where: { slug } });
    let counter = 1;

    while (slugExists) {
      slug = generateSlug(baseSlugSource) + `-${counter}`;
      slugExists = await this.prisma.user.findUnique({ where: { slug } });
      counter++;
    }

    // Create the user profile linked to auth
    const user = await this.prisma.user.create({
      data: {
        authId,
        slug,
        name,
      },
    });

    return user;
  }

  async findByAuthId(authId: string) {
    return this.prisma.user.findUnique({
      where: { authId },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findBySlug(slug: string) {
    const user = await this.prisma.user.findUnique({
      where: { slug },
    });

    return user;
  }
}
