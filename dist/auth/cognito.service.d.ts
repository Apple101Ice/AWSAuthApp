export declare class CognitoService {
    private readonly cognitoClient;
    private readonly clientId;
    private readonly poolId;
    constructor();
    registerUser(username: string, password: string, email: string): Promise<string>;
    confirmUser(username: string, verificationCode: string): Promise<string>;
    authenticateUser(username: string, password: string): Promise<any>;
    getUserAttributes(accesstoken: string): Promise<any>;
    logoutUser(accesstoken: string): Promise<any>;
    getUserInfo(accesstoken: string): Promise<any>;
}
