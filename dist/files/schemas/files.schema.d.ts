import { Document } from 'mongoose';
export declare type FilesDocument = Files & Document;
export declare class Files {
    name: string;
    size: number;
    key: string;
    url: string;
    type: string;
    projectId: string;
}
export declare const FilesSchema: import("mongoose").Schema<Document<Files, {}>, import("mongoose").Model<any, any>, undefined>;
