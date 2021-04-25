/// <reference types="multer" />
/// <reference types="node" />
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { Files, FilesDocument } from './schemas/files.schema';
import { CreateFileDto } from './dto/create-file.dto';
import { UploadFileConfigDto } from './dto/upload-file-config.dto';
export declare class FilesService {
    private readonly filesModel;
    constructor(filesModel: Model<FilesDocument>);
    private logger;
    create(createFileDto: CreateFileDto): Promise<Files>;
    findById(id: string): Promise<Files>;
    findByProjectId(projectId: string): Promise<FilesDocument[]>;
    delete(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    uploadAndCreate(file: Express.Multer.File, uploadFileConfigDto: UploadFileConfigDto): Promise<Files>;
    uploadS3(dataBuffer: Buffer, mimetype: string, bucketS3: string, filename: string): Promise<S3.ManagedUpload.SendData>;
    deleteS3(bucketS3: string, key: string): Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk").AWSError>>;
}
