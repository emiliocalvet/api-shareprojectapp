import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserDocument } from './schemas/user.schema';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    private createNewUser;
    private validateUserPassword;
    private findUserByUsername;
    private validatePassword;
    private hashPassword;
}
