"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const OpenJackpotModel_1 = require("../../../db/models/OpenJackpotModel");
const UserModel_1 = require("../../../db/models/UserModel");
const CommonException_1 = require("../../../public/CommonException");
const SubscribeModel_1 = require("../../../db/models/SubscribeModel");
let ReptilianApiService = class ReptilianApiService extends Common_1.default {
    dbMode() {
        return __awaiter(this, void 0, void 0, function* () {
            // const list = await this.sequelize.query("SELECT  * FROM open_jackpot  WHERE open_term IN ( SELECT MAX( open_term ) FROM open_jackpot GROUP BY open_type ) ORDER BY open_type",{ type: sequelize.QueryTypes.SELECT });
            const list = yield OpenJackpotModel_1.default.findAll({
                where: {
                    open_term: "10001"
                },
            });
            return list || [];
        });
    }
    /**
     * 每期中新一个列表
     * @returns {Promise<any[]>}
     */
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.sequelize.query("SELECT *  FROM open_jackpot op LEFT JOIN  jackpot_type   ja  on ja.type=op.open_type WHERE open_term IN ( SELECT MAX( open_term ) FROM open_jackpot GROUP BY open_type )  ORDER BY open_type", { type: this.sequelize.QueryTypes.SELECT });
            return list || [];
        });
    }
    /**
     *  详情
     * @param {string} id
     * @returns {Promise<{}>}
     */
    getInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield OpenJackpotModel_1.default.find({
                where: {
                    id
                }
            });
            return info || {};
        });
    }
    /**
     * 历史列表
     * @param {string} type
     * @returns {Promise<any[]>}
     */
    getHistory(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield OpenJackpotModel_1.default.findAll({
                where: {
                    open_type: type
                },
                'order': [["open_term", "DESC"]],
                offset: 0,
                limit: 20
            });
            return info || [];
        });
    }
    /**
     * 关注
     * @param user
     * @param {string} type
     * @returns {Promise<any>}
     */
    subscribe(user, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield UserModel_1.default.findOne({
                where: {
                    openid: user.openid
                }
            });
            if (!userData) {
                throw new CommonException_1.MyError('未授权', this.CODE.AUTHOR_ERROR);
            }
            const sub = yield SubscribeModel_1.default.findOne({
                where: {
                    user_id: userData.user_id
                }
            });
            if (!sub) {
                return yield SubscribeModel_1.default.create({
                    user_id: userData.user_id,
                    params: type,
                    created_at: this.getTimeStamp(),
                    update_at: this.getTimeStamp()
                });
            }
            let params = sub.params;
            params = params.split(",");
            let index = params.indexOf(type.toString());
            if (index > -1) {
                throw new CommonException_1.MyError('您已经关注!', this.CODE.REPEAT);
            }
            params = sub.params;
            return yield SubscribeModel_1.default.update({
                user_id: userData.user_id
            }, {
                params: params.join(","),
                update_at: this.getTimeStamp()
            });
        });
    }
    /**
     * 取消关注
     * @param user
     * @param {string} type
     * @returns {Promise<any>}
     */
    cancelSubscribe(user, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = UserModel_1.default.findOne({
                where: {
                    openid: user.openid
                }
            });
            if (!userData) {
                throw new CommonException_1.MyError('未授权', this.CODE.AUTHOR_ERROR);
            }
            const sub = SubscribeModel_1.default.findOne({
                where: {
                    user_id: userData.user_id
                }
            });
            if (!sub) {
                throw new CommonException_1.MyError('您还没关注', this.CODE.REPEAT);
            }
            let params = sub.params;
            params = params.split(",");
            let index = params.indexOf(type.toString());
            if (index === -1) {
                throw new CommonException_1.MyError('您还没关注', this.CODE.REPEAT);
            }
            params = params.splice(index, 1);
            return yield SubscribeModel_1.default.update({
                user_id: userData.user_id
            }, {
                params: params.join(","),
                update_at: this.getTimeStamp()
            });
        });
    }
};
ReptilianApiService = __decorate([
    loon_1.Service()
], ReptilianApiService);
exports.default = ReptilianApiService;
