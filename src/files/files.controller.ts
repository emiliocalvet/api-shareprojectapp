import { Body, Controller, Delete, Get, Logger, Param, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileConfigDto } from './dto/upload-file-config.dto';
import { FilesService } from './files.service';
import { Files } from './schemas/files.schema';

@Controller('files')
@UseGuards(AuthGuard())
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  private logger = new Logger('FilesController')

  @Get(':projectId')
  async findByProjectId(@Param('projectId') projectId: string): Promise<Files[]> {
    this.logger.verbose(`Getting files with project id = ${projectId}`)
    return this.filesService.findByProjectId(projectId)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) uploadFileConfig: UploadFileConfigDto
  ): Promise<Files> {
    this.logger.verbose(
      `Uploading file with type = ${uploadFileConfig.type}`
      + ` and project id = ${uploadFileConfig.projectId}`
    )
    return await this.filesService.uploadAndCreate(file, uploadFileConfig)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.verbose(`Deleting file with id = ${id}`)
    return this.filesService.delete(id)
  }
}
