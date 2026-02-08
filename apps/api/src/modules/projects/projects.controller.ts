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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.projectsService.findOne(id, userId);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string, @GetUser('id') userId: string) {
    return this.projectsService.findBySlug(slug, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, userId, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.projectsService.remove(id, userId);
  }
}
