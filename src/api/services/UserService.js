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
const Common_1 = require("../../../public/Common");
const config = require("config");
const UserModel_1 = require("../../../db/models/UserModel");
const token_1 = require("../../../public/token");
const WXBizDataCrypt = require("../../../public/WXBizDataCrypt");
const Http_1 = require("../../../public/Http");
const sequelize_1 = require("../../../db/sequelize");
let UserService = class UserService extends Common_1.default {
    constructor() {
        super(...arguments);
        this.appid = config.get('weChatConfig.appId');
        this.secret = config.get('weChatConfig.AppSecret');
    }
    getUserInfo(openid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = sequelize_1.sequelize.query('SELECT  * from  user as  u ' +
                'left join subscribe as sub   on sub.user_id =u.user_id ' +
                'WHERE u.openid = ?', {
                replacements: [openid],
                type: sequelize_1.sequelize.QueryTypes.SELECT
            });
            return user;
        });
    }
    /**
     * 获取
     * @param code
     * @returns {Promise<T | {}>}
     */
    getSessionKey(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                appid: this.appid,
                secret: this.secret,
                js_code: code,
                grant_type: 'authorization_code'
            };
            const url = 'https://api.weixin.qq.com/sns/jscode2session';
            const data = yield this.myHttp.get(url, params);
            return data;
        });
    }
    /**
     *  获取授权信息
     * @param data
     * @returns {Promise<any>}
     */
    setAuth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = null;
            const res = yield this.getSessionKey(data.code);
            try {
                const pc = new WXBizDataCrypt(this.appid, res.session_key);
                const userData = pc.decryptData(data.encryptedData, data.iv);
                const params = {
                    openid: userData.openId,
                    nickname: userData.nickName,
                    headimg: userData.avatarUrl,
                    params: JSON.stringify(userData),
                    created_at: this.getTimeStamp(),
                    unionid: 'no'
                };
                let user = yield UserModel_1.default.findOne({
                    select: "openid,nickname",
                    where: {
                        openid: userData.openId
                    }
                });
                if (user) {
                    yield UserModel_1.default.update(params, {
                        where: {
                            openid: userData.openId
                        }
                    });
                }
                else {
                    UserModel_1.default.create(params);
                }
                token = this.setToken({ openid: params.openid, nickName: params.nickname });
            }
            catch (e) {
                this.log.error(e);
                token = null;
            }
            return token;
        });
    }
    setToken(params) {
        const token = token_1.createToken(params, this.getTimeStamp());
        return token;
    }
};
__decorate([
    loon_1.Inject(),
    __metadata("design:type", Http_1.default)
], UserService.prototype, "myHttp", void 0);
UserService = __decorate([
    loon_1.Service()
], UserService);
exports.default = UserService;
