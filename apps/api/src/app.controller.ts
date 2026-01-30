import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import packageJson from '../package.json';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  async getHealth() {
    const uptime = process.uptime();
    try {
      await this.prisma.$executeRawUnsafe('SELECT 1');

      return {
        status: 'ok',
        version: packageJson.version,
        uptime: `${Math.floor(uptime)}s`,
        timestamp: new Date().toISOString(),
        database: 'connected',
      };
    } catch (error) {
      return {
        status: 'error',
        version: packageJson.version,
        uptime: `${Math.floor(uptime)}s`,
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
