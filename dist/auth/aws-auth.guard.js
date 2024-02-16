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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("./aws.service");
const core_1 = require("@nestjs/core");
let AwsAuthGuard = class AwsAuthGuard {
    constructor(awsService, reflector) {
        this.awsService = awsService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers['authorization'];
        if (!accessToken) {
            return false;
        }
        return this.validateRoles(accessToken, requiredRoles);
    }
    async validateRoles(accessToken, requiredRoles) {
        const userRoles = await this.awsService.validateCognitoToken(accessToken);
        const hasRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRole) {
            throw new common_1.UnauthorizedException('Unauthorized role.');
        }
        return true;
    }
};
exports.AwsAuthGuard = AwsAuthGuard;
exports.AwsAuthGuard = AwsAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aws_service_1.AWSService,
        core_1.Reflector])
], AwsAuthGuard);
//# sourceMappingURL=aws-auth.guard.js.map