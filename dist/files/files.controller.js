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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const upload_file_config_dto_1 = require("./dto/upload-file-config.dto");
const files_service_1 = require("./files.service");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
        this.logger = new common_1.Logger('FilesController');
    }
    async findByProjectId(projectId) {
        this.logger.verbose(`Getting files with project id = ${projectId}`);
        return this.filesService.findByProjectId(projectId);
    }
    async upload(file, uploadFileConfig) {
        this.logger.verbose(`Uploading file with type = ${uploadFileConfig.type}`
            + ` and project id = ${uploadFileConfig.projectId}`);
        return await this.filesService.uploadAndCreate(file, uploadFileConfig);
    }
    async delete(id) {
        this.logger.verbose(`Deleting file with id = ${id}`);
        return this.filesService.delete(id);
    }
};
__decorate([
    common_1.Get(':projectId'),
    __param(0, common_1.Param('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findByProjectId", null);
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_file_config_dto_1.UploadFileConfigDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "upload", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "delete", null);
FilesController = __decorate([
    common_1.Controller('files'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map