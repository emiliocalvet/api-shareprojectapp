import { Project } from './schemas/project.schema';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    private logger;
    findAll(): Promise<Project[]>;
    find(id: string): Promise<Project>;
    findByKey(key: string): Promise<Project>;
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    update(id: string, updateProjectDto: CreateProjectDto): Promise<Project>;
    delete(id: string): Promise<void>;
}
