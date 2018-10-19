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
var _a, _b;
const loon_1 = require("loon");
const Express = require("Express");
const code_1 = require("../../config/code");
let AuthenticateFilter = class AuthenticateFilter {
    use(data, res, next, token) {
        data.token = token;
        if (token) {
            next();
        }
        else {
            res.sendStatus(code_1.CODE.ABNORMAL);
        }
    }
};
__decorate([
    __param(0, loon_1.Data()), __param(1, loon_1.Res()), __param(2, loon_1.Next()), __param(3, loon_1.CookieParam('XSession')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = (typeof Express !== "undefined" && Express).Response) === "function" && _a || Object, typeof (_b = (typeof Express !== "undefined" && Express).NextFunction) === "function" && _b || Object, String]),
    __metadata("design:returntype", void 0)
], AuthenticateFilter.prototype, "use", null);
AuthenticateFilter = __decorate([
    loon_1.Filter()
], AuthenticateFilter);
exports.AuthenticateFilter = AuthenticateFilter;
//# sourceMappingURL=AuthenticateFilter.js.map