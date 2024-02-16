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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const cognito_service_1 = require("./cognito.service");
const aws_auth_guard_1 = require("./aws-auth.guard");
let AuthController = class AuthController {
    constructor(cognitoService) {
        this.cognitoService = cognitoService;
    }
    async registerUser(body) {
        const { username, password, email } = body;
        return await this.cognitoService.registerUser(username, password, email);
    }
    async confirmUser(body) {
        const { username, verificationCode } = body;
        return await this.cognitoService.confirmUser(username, verificationCode);
    }
    async loginUser(body) {
        const { username, password } = body;
        return this.cognitoService.authenticateUser(username, password);
    }
    async getUserInfo(request) {
        const accessToken = request.headers.authorization;
        return this.cognitoService.getUserInfo(accessToken);
    }
    async logoutUser(accesstoken) {
        return this.cognitoService.logoutUser(accesstoken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('userinfo'),
    (0, common_1.UseGuards)(aws_auth_guard_1.AwsAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(aws_auth_guard_1.AwsAuthGuard),
    __param(0, (0, common_1.Body)('accesstoken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [cognito_service_1.CognitoService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map