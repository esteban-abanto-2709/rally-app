import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(
    @GetUser('id') userId: string,
    @Query('projectId') projectId?: string,
  ) {
    // Optional filtering by projectId
    return this.tasksService.findAll(userId, projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.tasksService.findOne(id, userId);
  }

  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @GetUser('id') userId: string,
    @Query('projectId') projectId: string,
  ) {
    if (!projectId) {
      // Logic relies on projectId being present for uniqueness
      // If projectId is missing, we could try to find ONE task or fail.
      // Given the constraints, let's require projectId.
      throw new Error('projectId is required');
    }
    return this.tasksService.findBySlug(slug, userId, projectId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.tasksService.remove(id, userId);
  }
}
