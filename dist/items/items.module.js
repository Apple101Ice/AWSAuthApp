"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const items_controller_1 = require("./items.controller");
const typeorm_1 = require("@nestjs/typeorm");
const item_1 = require("./item");
const aws_service_1 = require("../auth/aws.service");
const aws_auth_guard_1 = require("../auth/aws-auth.guard");
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([item_1.Item])],
        providers: [items_service_1.ItemsService, aws_service_1.AWSService, aws_auth_guard_1.AwsAuthGuard],
        controllers: [items_controller_1.ItemsController]
    })
], ItemsModule);
//# sourceMappingURL=items.module.js.map