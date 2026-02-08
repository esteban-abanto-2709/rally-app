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
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';

@Controller('p/:projectSlug/f')
@UseGuards(JwtAuthGuard)
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(
    @Param('projectSlug') projectSlug: string,
    @Body() createFeatureDto: CreateFeatureDto,
    @GetUser('id') userId: string,
  ) {
    return this.featuresService.create(createFeatureDto, projectSlug, userId);
  }

  @Get()
  findAll(
    @Param('projectSlug') projectSlug: string,
    @GetUser('id') userId: string,
  ) {
    return this.featuresService.findAll(projectSlug, userId);
  }

  @Get(':featureSlug')
  findOne(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @GetUser('id') userId: string,
  ) {
    return this.featuresService.findOne(projectSlug, featureSlug, userId);
  }

  @Patch(':featureSlug')
  update(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @Body() updateFeatureDto: UpdateFeatureDto,
    @GetUser('id') userId: string,
  ) {
    return this.featuresService.update(
      projectSlug,
      featureSlug,
      updateFeatureDto,
      userId,
    );
  }

  @Delete(':featureSlug')
  remove(
    @Param('projectSlug') projectSlug: string,
    @Param('featureSlug') featureSlug: string,
    @GetUser('id') userId: string,
  ) {
    return this.featuresService.remove(projectSlug, featureSlug, userId);
  }
}
