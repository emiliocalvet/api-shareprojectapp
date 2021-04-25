/// <reference types="multer" />
import { UploadFileConfigDto } from './dto/upload-file-config.dto';
import { FilesService } from './files.service';
import { Files } from './schemas/files.schema';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    private logger;
    findByProjectId(projectId: string): Promise<Files[]>;
    upload(file: Express.Multer.File, uploadFileConfig: UploadFileConfigDto): Promise<Files>;
    delete(id: string): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
