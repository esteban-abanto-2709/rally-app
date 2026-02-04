import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from './providers/prisma/prisma.service';
import packageJson from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('healthz')
  async getHealth() {
    const uptime = process.uptime();
    try {
      // Test database connection
      await this.prisma.$executeRawUnsafe('SELECT 1');

      return {
        status: 'ok',
        version: packageJson.version,
        uptime: `${Math.floor(uptime)}s`,
        timestamp: new Date().toISOString(),
        service: 'TaskFlow API',
        database: {
          status: 'connected',
          type: 'PostgreSQL',
        },
      };
    } catch (error) {
      throw new ServiceUnavailableException({
        status: 'error',
        version: packageJson.version,
        uptime: `${Math.floor(uptime)}s`,
        timestamp: new Date().toISOString(),
        service: 'TaskFlow API',
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }
}
