import { CognitoService } from './cognito.service';
export declare class AuthController {
    private readonly cognitoService;
    constructor(cognitoService: CognitoService);
    registerUser(body: {
        username: string;
        password: string;
        email: string;
    }): Promise<string>;
    confirmUser(body: {
        username: string;
        verificationCode: string;
    }): Promise<string>;
    loginUser(body: {
        username: string;
        password: string;
    }): Promise<any>;
    getUserInfo(request: any): Promise<any>;
    logoutUser(accesstoken: string): Promise<any>;
}
