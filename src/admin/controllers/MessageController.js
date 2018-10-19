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
var _a, _b, _c, _d, _e, _f, _g;
const loon_1 = require("loon");
const messageService_1 = require("../../api/services/messageService");
const Express = require("express");
const ApiController_1 = require("../../../public/ApiController");
let MessageController = class MessageController extends ApiController_1.ApiController {
    getTime(res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.success(res, this.MessageService.getTime());
        });
    }
    getList(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.MessageService.getList(req);
                this.success(res, data);
            }
            catch (e) {
                console.log(e);
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
    __metadata("design:type", messageService_1.MessageService)
], MessageController.prototype, "MessageService", void 0);
__decorate([
    loon_1.Get('/get-time'),
    __param(0, loon_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof Express !== "undefined" && Express).Response) === "function" && _a || Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getTime", null);
__decorate([
    loon_1.Get('/list'),
    loon_1.Post('/list'),
    __param(0, loon_1.Res()), __param(1, loon_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = (typeof Express !== "undefined" && Express).Response) === "function" && _b || Object, typeof (_c = (typeof Express !== "undefined" && Express).Request) === "function" && _c || Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getList", null);
__decorate([
    loon_1.Post('/add'),
    __param(0, loon_1.Res()), __param(1, loon_1.Req()), __param(2, loon_1.BodyParam('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = (typeof Express !== "undefined" && Express).Response) === "function" && _d || Object, typeof (_e = (typeof Express !== "undefined" && Express).Request) === "function" && _e || Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "add", null);
__decorate([
    loon_1.Post('/update'),
    __param(0, loon_1.Res()), __param(1, loon_1.BodyParam('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = (typeof Express !== "undefined" && Express).Response) === "function" && _f || Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "update", null);
__decorate([
    loon_1.Post('/delete'),
    __param(0, loon_1.Res()), __param(1, loon_1.BodyParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = (typeof Express !== "undefined" && Express).Response) === "function" && _g || Object, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "delete", null);
MessageController = __decorate([
    loon_1.RestController('/admin/message')
], MessageController);
//# sourceMappingURL=MessageController.js.map