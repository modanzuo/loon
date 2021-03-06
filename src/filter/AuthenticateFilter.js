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
const loon_1 = require("loon");
const Express = require("express");
const code_1 = require("../../config/code");
const token_1 = require("../../public/token");
let AuthenticateFilter = class AuthenticateFilter {
    use(data, res, next, token) {
        if (token_1.checkToken(token)) {
            const payload = token_1.decodeToken(token).payload;
            data.user = payload.data;
            next();
        }
        else {
            res.sendStatus(code_1.CODE.ABNORMAL);
        }
    }
};
__decorate([
    __param(0, loon_1.Data()), __param(1, loon_1.Res()), __param(2, loon_1.Next()), __param(3, loon_1.HeaderParam('xcx-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String]),
    __metadata("design:returntype", void 0)
], AuthenticateFilter.prototype, "use", null);
AuthenticateFilter = __decorate([
    loon_1.Filter()
], AuthenticateFilter);
exports.AuthenticateFilter = AuthenticateFilter;
