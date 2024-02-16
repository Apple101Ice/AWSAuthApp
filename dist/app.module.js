"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const item_1 = require("./items/item");
const items_module_1 = require("./items/items.module");
const auth_module_1 = require("./auth/auth.module");
const dotenv = require("dotenv");
const aws_service_1 = require("./auth/aws.service");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            items_module_1.ItemsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.PG_HOST,
                port: parseInt(process.env.PG_PORT, 10),
                username: process.env.PG_USERNAME,
                password: process.env.PG_PASSWORD,
                database: process.env.PG_DATABASE,
                synchronize: true,
                entities: [item_1.Item],
            }),
            typeorm_1.TypeOrmModule.forFeature([item_1.Item]),
        ],
        controllers: [],
        providers: [aws_service_1.AWSService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map