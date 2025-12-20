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
exports.ProgramsController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const programs_service_1 = require("./programs.service");
let ProgramsController = class ProgramsController {
    programsService;
    constructor(programsService) {
        this.programsService = programsService;
    }
    async create(user, data) {
        const tenantId = user.tenant_id;
        return this.programsService.create(tenantId, data);
    }
    async findAll(user) {
        const tenantId = user.tenant_id;
        return this.programsService.findAll(tenantId);
    }
    async getStructure(user, id) {
        const tenantId = user.tenant_id;
        return this.programsService.getStructure(tenantId, id);
    }
};
exports.ProgramsController = ProgramsController;
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:TENANT_ADMIN', 'realm:ADMISSION_OFFICER'] }),
    __param(0, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/structure'),
    __param(0, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "getStructure", null);
exports.ProgramsController = ProgramsController = __decorate([
    (0, common_1.Controller)('programs'),
    __metadata("design:paramtypes", [programs_service_1.ProgramsService])
], ProgramsController);
//# sourceMappingURL=programs.controller.js.map