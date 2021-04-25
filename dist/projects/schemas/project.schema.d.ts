import { Document } from 'mongoose';
export declare type ProjectDocument = Project & Document;
export declare class Project {
    name1: string;
    name2: string;
    phone1: string;
    phone2: string;
    address: string;
    key: string;
    type: string;
    branch: string;
    area: number;
    rrtNumber: string;
}
export declare const ProjectSchema: import("mongoose").Schema<Document<Project, {}>, import("mongoose").Model<any, any>, undefined>;
