import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '@/providers/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { DuplicateResourceException } from '@/common/exceptions/custom-exceptions';
import { generateSlug } from '@/utils/slug.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if auth exists
    const existingAuth = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (existingAuth) {
      throw new DuplicateResourceException('User', 'email');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Transactionally create Auth and User Profile
    const result = await this.prisma.$transaction(async (tx) => {
      const auth = await tx.auth.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // Generate Slug ensuring uniqueness
      const baseSlugSource = name || email.split('@')[0];
      let slug = generateSlug(baseSlugSource);

      // Check for slug existence within transaction for consistency
      let slugExists = await tx.user.findUnique({ where: { slug } });
      let counter = 1;

      while (slugExists) {
        slug = generateSlug(baseSlugSource) + `-${counter}`;
        slugExists = await tx.user.findUnique({ where: { slug } });
        counter++;
      }

      const user = await tx.user.create({
        data: {
          authId: auth.id,
          slug,
          name,
        },
      });

      return { auth, user };
    });

    // Generate JWT
    const payload = { sub: result.auth.id, email: result.auth.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user: {
        ...result.user,
        email: result.auth.email, // Return merged info for frontend compatibility
      },
      access_token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find auth
    const auth = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (!auth) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Find user profile
    const user = await this.usersService.findByAuthId(auth.id);

    // Check if user profile exists (it should)
    if (!user) {
      // Fallback or error? Let's treat it as a critical error or handling legacy data
      throw new UnauthorizedException('User profile not found');
    }

    // Generate JWT
    const payload = { sub: auth.id, email: auth.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user: {
        ...user,
        email: auth.email,
      },
      access_token,
    };
  }

  async validateUser(authId: string) {
    const auth = await this.prisma.auth.findUnique({ where: { id: authId } });
    if (!auth) return null;

    const user = await this.usersService.findByAuthId(authId);
    if (!user) return null;

    return {
      ...user,
      email: auth.email,
    };
  }
}
