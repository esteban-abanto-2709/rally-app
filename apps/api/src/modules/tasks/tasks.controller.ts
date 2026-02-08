import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('p/:projectSlug/f/:featureSlug/t')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @GetUser('id') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(
      createTaskDto,
      projectSlug,
      featureSlug,
      userId,
    );
  }

  @Get()
  findAll(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @GetUser('id') userId: string,
  ) {
    return this.tasksService.findAll(projectSlug, featureSlug, userId);
  }

  @Get(':taskSlug')
  findOne(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @Param('taskSlug') taskSlug: string,
    @GetUser('id') userId: string,
  ) {
    return this.tasksService.findOne(
      projectSlug,
      featureSlug,
      taskSlug,
      userId,
    );
  }

  @Patch(':taskSlug')
  update(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @Param('taskSlug') taskSlug: string,
    @GetUser('id') userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      projectSlug,
      featureSlug,
      taskSlug,
      updateTaskDto,
      userId,
    );
  }

  @Delete(':taskSlug')
  remove(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @Param('taskSlug') taskSlug: string,
    @GetUser('id') userId: string,
  ) {
    return this.tasksService.remove(projectSlug, featureSlug, taskSlug, userId);
  }
}
