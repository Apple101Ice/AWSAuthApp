import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AWSService } from './aws.service';
import { Reflector } from '@nestjs/core';
export declare class AwsAuthGuard implements CanActivate {
    private readonly awsService;
    private readonly reflector;
    constructor(awsService: AWSService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateRoles;
}
