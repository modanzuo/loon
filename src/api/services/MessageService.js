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
const common_1 = require("../../../public/common");
const CommentModel_1 = require("../../../db/models/CommentModel");
let MessageService = class MessageService extends common_1.Common {
    getTime() {
        return this.getTimeStamp();
    }
    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 获取列表
     */
    getList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            try {
                data = yield CommentModel_1.default.findAll({
                    attributes: ['id'],
                    where: { name: '测试' }, order: [['id', 'DESC']]
                });
            }
            catch (e) {
                console.log(e);
                throw new Error('服务器异常');
            }
            return data;
        });
    }
    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 插入数据
     */
    add(dataPost, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO `comment` (`name`,`content`,`ip`,`ua`,`state`,`created`) VALUES (?,?,?,?,?,?)";
            const ip = this.getClientIp(req);
            const ua = this.getUserAgent(req);
            let time = this.getTimeStamp();
            console.log(time);
            let params = ['测试', '内容1', ip, ua, 0, time];
            let data;
            try {
                data = yield this.mySql.EXECUTE(sql, ...params);
            }
            catch (e) {
                console.log(e);
            }
            return data;
        });
    }
    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 更新数据
     */
    update(dataPost) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            try {
                let sql = 'update comment set password="ddd" where name="zhangsan"';
                let params = {
                    password: 'ppp'
                };
                data = yield this.mySql.EXECUTE(sql, params);
            }
            catch (e) {
            }
            return data;
        });
    }
    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 删除
     */
    delete($id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            try {
                let sql = "delete from  comment ";
                let params = {};
                data = yield this.mySql.EXECUTE(sql, params);
            }
            catch (e) {
            }
            return data;
        });
    }
};
MessageService = __decorate([
    loon_1.Service()
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=messageService.js.map