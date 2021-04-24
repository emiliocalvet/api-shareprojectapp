import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Files, FilesDocument } from './schemas/files.schema';
import { CreateFileDto } from './dto/create-file.dto';
import { UploadFileConfigDto } from './dto/upload-file-config.dto';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Files.name) private readonly filesModel: Model<FilesDocument>) { }

  private logger = new Logger('FilesService')

  async create(createFileDto: CreateFileDto): Promise<Files> {
    try {
      const createdFile = new this.filesModel(createFileDto)
      return await createdFile.save()
    } catch (_) {
      this.logger.error('Failed to create file in database')
      throw new InternalServerErrorException()
    }
  }

  async findById(id: string): Promise<Files> {
    try {
      return await this.filesModel.findById(id)
    } catch (_) {
      this.logger.error(`Failed to find file with id = ${id}`)
      throw new InternalServerErrorException()
    }
  }

  async findByProjectId(projectId: string) {
    try {
      return await this.filesModel.find({ projectId })
    } catch (_) {
      this.logger.error(`Failed to find file with project id = ${projectId}`)
      throw new InternalServerErrorException()
    }
  }

  async delete(id: string) {
    try {
      const selectedFile = await this.findById(id)
      await this.deleteS3(process.env.BUCKET_NAME, selectedFile.key)
      return await this.filesModel.deleteOne({ _id: id }).exec()
    } catch (_) {
      this.logger.error(`Failed to delete file with id = ${id}`)
      throw new InternalServerErrorException()
    }
  }

  async uploadAndCreate(file: Express.Multer.File, uploadFileConfigDto: UploadFileConfigDto): Promise<Files> {
    try {
      const { originalname, mimetype, size } = file
      const bucketS3 = process.env.BUCKET_NAME
      const s3Result: S3.ManagedUpload.SendData = await this.uploadS3(
        file.buffer,
        mimetype,
        bucketS3,
        originalname
      )
      const createFileDto = new CreateFileDto
      createFileDto.name = originalname
      createFileDto.key = s3Result.Key
      createFileDto.size = size
      createFileDto.url = s3Result.Location
      createFileDto.type = uploadFileConfigDto.type
      createFileDto.projectId = uploadFileConfigDto.projectId
      return await this.create(createFileDto)
    } catch (_) {
      this.logger.error('Fail with the file uploaded')
      throw new InternalServerErrorException()
    }
  }

  async uploadS3(dataBuffer: Buffer, mimetype: string, bucketS3: string, filename: string) {
    try {
      const s3 = new S3()
      const uploadResult = await s3.upload({
        Bucket: bucketS3,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
        ACL: 'public-read',
        ContentType: mimetype
      }).promise()
      return uploadResult
    } catch (_) {
      this.logger.error(`Failed to upload file ${filename} to ${bucketS3} bucket on S3`)
      throw new InternalServerErrorException()
    }
  }

  async deleteS3(bucketS3: string, key: string) {
    try {
      const s3 = new S3()
      return await s3.deleteObject({
        Bucket: bucketS3,
        Key: key
      }).promise()
    } catch (_) {
      this.logger.error(`Failed to delete file ${key} of ${bucketS3} bucket on S3`)
      throw new InternalServerErrorException()
    }
  }
}
