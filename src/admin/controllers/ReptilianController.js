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
const ReptilianService_1 = require("../../admin/services/ReptilianService");
const Express = require("express");
const loon_1 = require("loon");
let ReptilianController = class ReptilianController extends ApiController_1.default {
    start(res, req, max, min) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = this.reptilianService.addPLW(max, min);
                this.success(res, "成功");
            }
            catch (e) {
                this.success(res, e.message);
            }
        });
    }
};
__decorate([
    loon_1.Inject(),
    __metadata("design:type", ReptilianService_1.default)
], ReptilianController.prototype, "reptilianService", void 0);
__decorate([
    loon_1.Get('/start'),
    __param(0, loon_1.Res()), __param(1, loon_1.Req()), __param(2, loon_1.QueryParam('max')), __param(3, loon_1.QueryParam('min')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReptilianController.prototype, "start", null);
ReptilianController = __decorate([
    loon_1.RestController('/admin/reptilian')
], ReptilianController);
