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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const user = await this.findUserByUsername(authCredentialsDto.username);
        if (user) {
            throw new common_1.ConflictException(`Username ${user.username} already exists`);
        }
        else {
            await this.createNewUser(authCredentialsDto);
        }
    }
    async signIn(authCredentialsDto) {
        const username = await this.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async createNewUser(authCredentialsDto) {
        try {
            const { username, password } = authCredentialsDto;
            const user = new user_schema_1.User();
            user.username = username;
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(password, user.salt);
            const createdUser = await this.userModel.create(user);
            await createdUser.save();
        }
        catch (_) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.findUserByUsername(username);
        if (user && await this.validatePassword(password, user.password, user.salt)) {
            return user.username;
        }
        else {
            return null;
        }
    }
    async findUserByUsername(username) {
        try {
            return await this.userModel.findOne({ username });
        }
        catch (_) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async validatePassword(password, hashPassword, salt) {
        const hash = await bcrypt.hash(password, salt);
        return hash === hashPassword;
    }
    async hashPassword(password, salt) {
        try {
            return await bcrypt.hash(password, salt);
        }
        catch (_) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map