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
const Express = require("express");
const loon_1 = require("loon");
const UserService_1 = require("../services/UserService");
const AuthenticateFilter_1 = require("../../filter/AuthenticateFilter");
let UserController = class UserController extends ApiController_1.default {
    LoginAction(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.setAuth(data);
                this.success(res, user);
            }
            catch (e) {
                console.log(e);
                this.error(res, '授权失败');
            }
        });
    }
    getUserInfoAction(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = data;
            let info = null;
            if (user) {
                try {
                    info = yield this.userService.getUserInfo(user.openid);
                }
                catch (e) {
                    this.log.error(e);
                }
            }
            this.success(res, info);
        });
    }
};
__decorate([
    loon_1.Inject(),
    __metadata("design:type", UserService_1.default)
], UserController.prototype, "userService", void 0);
__decorate([
    loon_1.Post('/login'),
    __param(0, loon_1.Res()), __param(1, loon_1.BodyParam('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "LoginAction", null);
__decorate([
    loon_1.Get('/user-info'),
    __param(0, loon_1.Data()), __param(1, loon_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfoAction", null);
UserController = __decorate([
    loon_1.RestController('/api/user'),
    loon_1.BeforeFilter(AuthenticateFilter_1.AuthenticateFilter, { only: ['getUserInfoAction'] })
], UserController);
