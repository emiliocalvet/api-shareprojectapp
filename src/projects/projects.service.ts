import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>,
    private readonly filesService: FilesService
  ) { }

  private logger = new Logger('ProjectsService')

  async findAll(): Promise<Project[]> {
    try {
      return await this.projectModel.find().exec()
    } catch (_) {
      this.logger.error('Failed to find projects')
      throw new InternalServerErrorException()
    }
  }

  async find(id: string): Promise<Project> {
    try {
      return await this.projectModel.findById(id)
    } catch (_) {
      this.logger.error(`Failed to find project with id = ${id}`)
      throw new InternalServerErrorException()
    }
  }

  async findByKey(key: string): Promise<Project> {
    try {
      return await this.projectModel.findOne({ key })
    } catch (_) {
      this.logger.error(`Failed to find project with key = ${key}`)
      throw new InternalServerErrorException()
    }
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const createdProject = new this.projectModel(createProjectDto)
      return await createdProject.save()
    } catch (_) {
      this.logger.error('Failed to create project')
      throw new InternalServerErrorException()
    }
  }

  async update(id: string, updateProjectDto: CreateProjectDto): Promise<Project> {
    try {
      await this.projectModel.updateOne({ _id: id }, updateProjectDto).exec()
      return this.find(id)
    } catch (_) {
      this.logger.error(`Failed to update project with id = ${id}`)
      throw new InternalServerErrorException()
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const filesToExclude = await this.filesService.findByProjectId(id)
      filesToExclude.forEach(async fileToExclude => {
        const { _id } = fileToExclude
        await this.filesService.delete(_id)
      })
    } catch (_) {
      this.logger.error(`Failed to delete files of the project with id = ${id}`)
      throw new InternalServerErrorException()
    }

    try {
      await this.projectModel.deleteOne({ _id: id }).exec()
    } catch (_) {
      this.logger.error(`Failed to delete project with id = ${id}`)
      throw new InternalServerErrorException()
    }
  }
}
