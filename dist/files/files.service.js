"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const files_schema_1 = require("./schemas/files.schema");
const create_file_dto_1 = require("./dto/create-file.dto");
let FilesService = class FilesService {
    constructor(filesModel) {
        this.filesModel = filesModel;
        this.logger = new common_1.Logger('FilesService');
    }
    async create(createFileDto) {
        try {
            const createdFile = new this.filesModel(createFileDto);
            return await createdFile.save();
        }
        catch (_) {
            this.logger.error('Failed to create file in database');
            throw new common_1.InternalServerErrorException();
        }
    }
    async findById(id) {
        try {
            return await this.filesModel.findById(id);
        }
        catch (_) {
            this.logger.error(`Failed to find file with id = ${id}`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async findByProjectId(projectId) {
        try {
            return await this.filesModel.find({ projectId });
        }
        catch (_) {
            this.logger.error(`Failed to find file with project id = ${projectId}`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async delete(id) {
        try {
            const selectedFile = await this.findById(id);
            await this.deleteS3(process.env.BUCKET_NAME, selectedFile.key);
            return await this.filesModel.deleteOne({ _id: id }).exec();
        }
        catch (_) {
            this.logger.error(`Failed to delete file with id = ${id}`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async uploadAndCreate(file, uploadFileConfigDto) {
        try {
            const { originalname, mimetype, size } = file;
            const bucketS3 = process.env.BUCKET_NAME;
            const s3Result = await this.uploadS3(file.buffer, mimetype, bucketS3, originalname);
            const createFileDto = new create_file_dto_1.CreateFileDto;
            createFileDto.name = originalname;
            createFileDto.key = s3Result.Key;
            createFileDto.size = size;
            createFileDto.url = s3Result.Location;
            createFileDto.type = uploadFileConfigDto.type;
            createFileDto.projectId = uploadFileConfigDto.projectId;
            return await this.create(createFileDto);
        }
        catch (_) {
            this.logger.error('Fail with the file uploaded');
            throw new common_1.InternalServerErrorException();
        }
    }
    async uploadS3(dataBuffer, mimetype, bucketS3, filename) {
        try {
            const s3 = new aws_sdk_1.S3();
            const uploadResult = await s3.upload({
                Bucket: bucketS3,
                Body: dataBuffer,
                Key: `${uuid_1.v4()}-${filename}`,
                ACL: 'public-read',
                ContentType: mimetype
            }).promise();
            return uploadResult;
        }
        catch (_) {
            this.logger.error(`Failed to upload file ${filename} to ${bucketS3} bucket on S3`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteS3(bucketS3, key) {
        try {
            const s3 = new aws_sdk_1.S3();
            return await s3.deleteObject({
                Bucket: bucketS3,
                Key: key
            }).promise();
        }
        catch (_) {
            this.logger.error(`Failed to delete file ${key} of ${bucketS3} bucket on S3`);
            throw new common_1.InternalServerErrorException();
        }
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(files_schema_1.Files.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map