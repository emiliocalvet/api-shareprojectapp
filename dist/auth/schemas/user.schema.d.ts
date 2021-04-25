import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    username: string;
    password: string;
    salt: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, {}>, import("mongoose").Model<any, any>, undefined>;
