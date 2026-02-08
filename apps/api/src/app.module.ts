import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PrismaModule } from './providers/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { FeaturesModule } from './modules/features/features.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProjectsModule, TasksModule, FeaturesModule],
  controllers: [AppController],
})
export class AppModule { }
