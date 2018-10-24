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
const loon_1 = require("loon");
const MessageService_1 = require("../../api/services/MessageService");
const Express = require("express");
const ApiController_1 = require("../../../public/ApiController");
let MessageController = class MessageController extends ApiController_1.ApiController {
    getList(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.MessageService.getList(req);
                this.success(res, data);
            }
            catch (e) {
                this.error(res, '服务器异常！');
            }
        });
    }
    add(res, req, dataPost) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.MessageService.add(dataPost, req);
                this.success(res, data);
            }
            catch (e) {
                this.error(res, "服务器繁忙");
            }
        });
    }
    update(res, dataPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.MessageService.update(dataPost);
            res.send({});
        });
    }
    delete(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.MessageService.delete(id);
            res.send({});
        });
    }
};
__decorate([
    loon_1.Inject(),
    __metadata("design:type", MessageService_1.MessageService)
], MessageController.prototype, "MessageService", void 0);
__decorate([
    loon_1.Get('/list'),
    loon_1.Post('/list'),
    __param(0, loon_1.Res()), __param(1, loon_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getList", null);
__decorate([
    loon_1.Get('/add'),
    loon_1.Post('/add'),
    __param(0, loon_1.Res()), __param(1, loon_1.Req()), __param(2, loon_1.BodyParam('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "add", null);
__decorate([
    loon_1.Post('/update'),
    __param(0, loon_1.Res()), __param(1, loon_1.BodyParam('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "update", null);
__decorate([
    loon_1.Get('/delete'),
    loon_1.Post('/delete'),
    __param(0, loon_1.Res()), __param(1, loon_1.BodyParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "delete", null);
MessageController = __decorate([
    loon_1.RestController('/api/message')
], MessageController);
