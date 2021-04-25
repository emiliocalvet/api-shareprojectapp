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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const files_service_1 = require("../files/files.service");
const project_schema_1 = require("./schemas/project.schema");
let ProjectsService = class ProjectsService {
    constructor(projectModel, filesService) {
        this.projectModel = projectModel;
        this.filesService = filesService;
        this.logger = new common_1.Logger('ProjectsService');
    }
    async findAll() {
        try {
            return await this.projectModel.find().exec();
        }
        catch (_) {
            this.logger.error('Failed to find projects');
            throw new common_1.InternalServerErrorException();
        }
    }
    async find(id) {
        try {
            return await this.projectModel.findById(id);
        }
        catch (_) {
            this.logger.error(`Failed to find project with id = ${id}`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async findByKey(key) {
        try {
            return await this.projectModel.findOne({ key });
        }
        catch (_) {
            this.logger.error(`Failed to find project with key = ${key}`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async create(createProjectDto) {
        try {
            const createdProject = new this.projectModel(createProjectDto);
            return await createdProject.save();
        }
        catch (_) {
            this.logger.error('Failed to create project');
            throw new common_1.InternalServerErrorException();
        }
    }
    async update(id, updateProjectDto) {
        try {
            await this.projectModel.updateOne({ _id: id }, updateProjectDto).exec();
            return this.find(id);
        }
        catch (_) {
            this.logger.error(`Failed to update project with id = ${id}`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async delete(id) {
        try {
            const filesToExclude = await this.filesService.findByProjectId(id);
            filesToExclude.forEach(async (fileToExclude) => {
                const { _id } = fileToExclude;
                await this.filesService.delete(_id);
            });
        }
        catch (_) {
            this.logger.error(`Failed to delete files of the project with id = ${id}`);
            throw new common_1.InternalServerErrorException();
        }
        try {
            await this.projectModel.deleteOne({ _id: id }).exec();
        }
        catch (_) {
            this.logger.error(`Failed to delete project with id = ${id}`);
            throw new common_1.InternalServerErrorException();
        }
    }
};
ProjectsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        files_service_1.FilesService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map