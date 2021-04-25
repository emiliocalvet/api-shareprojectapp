"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const projects_controller_1 = require("./projects.controller");
const project_schema_1 = require("./schemas/project.schema");
const projects_service_1 = require("./projects.service");
const files_module_1 = require("../files/files.module");
const auth_module_1 = require("../auth/auth.module");
let ProjectsModule = class ProjectsModule {
};
ProjectsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: project_schema_1.Project.name, schema: project_schema_1.ProjectSchema }]),
            files_module_1.FilesModule,
            auth_module_1.AuthModule
        ],
        controllers: [projects_controller_1.ProjectsController],
        providers: [projects_service_1.ProjectsService],
    })
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
//# sourceMappingURL=projects.module.js.map