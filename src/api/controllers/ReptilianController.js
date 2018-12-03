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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiController_1 = require("../../../public/ApiController");
const ReptilianApiService_1 = require("../../api/services/ReptilianApiService");
const Express = require("express");
const loon_1 = require("loon");
const AuthenticateFilter_1 = require("../../filter/AuthenticateFilter");
let ReptilianController = class ReptilianController extends ApiController_1.default {
    getListAction(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.reptilianApiService.getList();
            this.success(res, list);
        });
    }
    getInfoAction(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.reptilianApiService.getInfo(id);
            this.success(res, list);
        });
    }
    getHistoryAction(res, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.reptilianApiService.getHistory(type);
            this.success(res, list);
        });
    }
    subscribeAction(data, res, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const { user } = data;
                const result = this.reptilianApiService.subscribe(user, type);
                this.success(res, result);
            }
            catch (e) {
                this.log.error(e);
                this.error(res, "服务器繁忙!", e.code);
            }
        });
    }
    noSubscribeAction(data, res, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = data;
                const result = this.reptilianApiService.cancelSubscribe(user, type);
                this.success(res, result);
            }
            catch (e) {
                this.log.error(e);
                this.error(res, e.message || "服务器繁忙!", e.code);
            }
        });
    }
};
__decorate([
    loon_1.Inject(),
    __metadata("design:type", ReptilianApiService_1.default)
], ReptilianController.prototype, "reptilianApiService", void 0);
__decorate([
    loon_1.Get('/get-list'),
    __param(0, loon_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReptilianController.prototype, "getListAction", null);
__decorate([
    loon_1.Get('/get-info/:id'),
    __param(0, loon_1.Res()), __param(1, loon_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReptilianController.prototype, "getInfoAction", null);
__decorate([
    loon_1.Get('/get-history/:type'),
    __param(0, loon_1.Res()), __param(1, loon_1.PathParam('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReptilianController.prototype, "getHistoryAction", null);
__decorate([
    loon_1.Get('/subscribe/:type'),
    __param(0, loon_1.Data()), __param(1, loon_1.Res()), __param(2, loon_1.PathParam('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ReptilianController.prototype, "subscribeAction", null);
__decorate([
    loon_1.Get('/cancel_subscribe/:type'),
    __param(0, loon_1.Data()), __param(1, loon_1.Res()), __param(2, loon_1.PathParam('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ReptilianController.prototype, "noSubscribeAction", null);
ReptilianController = __decorate([
    loon_1.RestController('/api/reptilian'),
    loon_1.BeforeFilter(AuthenticateFilter_1.AuthenticateFilter, { only: ['subscribeAction', 'noSubscribeAction'] })
], ReptilianController);
