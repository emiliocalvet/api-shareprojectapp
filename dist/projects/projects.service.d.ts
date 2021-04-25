import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
export declare class ProjectsService {
    private readonly projectModel;
    private readonly filesService;
    constructor(projectModel: Model<ProjectDocument>, filesService: FilesService);
    private logger;
    findAll(): Promise<Project[]>;
    find(id: string): Promise<Project>;
    findByKey(key: string): Promise<Project>;
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    update(id: string, updateProjectDto: CreateProjectDto): Promise<Project>;
    delete(id: string): Promise<void>;
}
