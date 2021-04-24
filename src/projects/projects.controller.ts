import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { Project } from './schemas/project.schema';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  private logger = new Logger('ProjectsController')

  //Return all saved projects.
  @Get()
  @UseGuards(AuthGuard())
  findAll(): Promise<Project[]> {
    this.logger.verbose('Getting all projects')
    return this.projectsService.findAll()
  }

  //Return a project with specific id.
  @Get(':id')
  @UseGuards(AuthGuard())
  find(@Param('id') id: string): Promise<Project> {
    this.logger.verbose(`Getting project with id = ${id}`)
    return this.projectsService.find(id)
  }

  //Return a project with specific key.
  @Get('/key/:key')
  findByKey(@Param('key') key: string): Promise<Project> {
    this.logger.verbose(`Getting project with key = ${key}`)
    return this.projectsService.findByKey(key)
  }

  //Create and save a new project.
  @Post()
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<Project> {
    this.logger.verbose(`Creating a project with key = ${createProjectDto.key}`)
    return this.projectsService.create(createProjectDto)
  }

  //Update a project with specific id.
  @Put(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProjectDto: CreateProjectDto): Promise<Project> {
    this.logger.verbose(`Updating a project with id = ${id}`)
    return this.projectsService.update(id, updateProjectDto)
  }

  //Delete a project with specific id.
  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting a project with id = ${id}`)
    return this.projectsService.delete(id)
  }
}
