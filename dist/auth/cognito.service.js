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
exports.CognitoService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
let CognitoService = class CognitoService {
    constructor() {
        this.cognitoClient = new aws_sdk_1.CognitoIdentityServiceProvider();
        this.clientId = process.env.AWS_COGNITO_CLIENT_ID;
        this.poolId = process.env.AWS_COGNITO_USER_POOL_ID;
    }
    async registerUser(username, password, email) {
        const params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [
                { Name: 'custom:role', Value: 'Customer' },
                { Name: 'email', Value: email }
            ],
        };
        try {
            await this.cognitoClient.signUp(params).promise();
            return 'User registered successfully';
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    async confirmUser(username, verificationCode) {
        const params = {
            ClientId: this.clientId,
            ConfirmationCode: verificationCode,
            Username: username,
        };
        try {
            await this.cognitoClient.confirmSignUp(params).promise();
            return 'User confirmed successfully';
        }
        catch (error) {
            console.error('Error confirming user:', error);
            throw error;
        }
    }
    async authenticateUser(username, password) {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.clientId,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        };
        try {
            const response = await this.cognitoClient.initiateAuth(params).promise();
            const accesstoken = response.AuthenticationResult.AccessToken;
            const userAttributes = await this.getUserAttributes(accesstoken);
            const roleAttribute = userAttributes.find((attr) => attr.Name === 'custom:role');
            const userRole = roleAttribute ? roleAttribute.Value : null;
            return {
                ...response.AuthenticationResult,
                role: userRole
            };
        }
        catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }
    async getUserAttributes(accesstoken) {
        try {
            const response = await this.cognitoClient.getUser({
                AccessToken: accesstoken,
            }).promise();
            return response.UserAttributes;
        }
        catch (error) {
            console.log('Error fetching user attributes', error);
        }
    }
    async logoutUser(accesstoken) {
        const params = {
            AccessToken: accesstoken,
        };
        try {
            const response = await this.cognitoClient.globalSignOut(params).promise();
            return response;
        }
        catch (error) {
            console.error('Error logout user:', error);
            throw error;
        }
    }
    async getUserInfo(accesstoken) {
        try {
            const response = await this.cognitoClient.getUser({
                AccessToken: accesstoken,
            }).promise();
            return response;
        }
        catch (error) {
            console.log('Error fetching user attributes', error);
        }
    }
};
exports.CognitoService = CognitoService;
exports.CognitoService = CognitoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CognitoService);
//# sourceMappingURL=cognito.service.js.map