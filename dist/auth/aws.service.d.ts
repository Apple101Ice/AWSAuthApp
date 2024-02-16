export declare class AWSService {
    private readonly cognitoIdentityServiceProvider;
    constructor();
    validateCognitoToken(accessToken: string): Promise<string[]>;
}
