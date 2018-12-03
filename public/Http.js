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
const http = require("http");
const fetch = require("node-fetch");
const loon_1 = require("loon");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const html_entities_1 = require("html-entities");
const entities = new html_entities_1.XmlEntities();
let myHttp = class myHttp {
    decode(str) {
        str = entities.decode(str);
        return str;
    }
    getHtmlData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                http.get(url, function (res) {
                    const { statusCode } = res;
                    if (statusCode == 200) {
                        let html = [];
                        let length = 1;
                        // 绑定data事件 回调函数 累加html片段
                        res.on('data', function (data) {
                            html.push(data);
                            length += data.length;
                        });
                        res.on('end', function () {
                            const data = Buffer.concat(html, length);
                            const change_data = iconv.decode(data, 'gb2312');
                            resolve(change_data);
                        });
                    }
                    else {
                        reject(statusCode);
                    }
                }).on('error', function () {
                    reject('获取数据错误');
                });
            });
        });
    }
    getHtml(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.getHtmlData(url);
            return cheerio.load(html, { decodeEntities: false });
        });
    }
    post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let header = {};
            try {
                let res = yield fetch(url, { method: 'POST', timeout: 10000, body, headers: header }).then(res => res.json());
                return res;
            }
            catch (e) {
            }
        });
    }
    get(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let par = '';
            for (let item in params) {
                par += '&' + item + '=' + params[item];
            }
            par = '?' + par.slice(1);
            url += par;
            let header = {};
            try {
                let res = yield fetch(url, { method: 'GET', timeout: 10000, headers: header }).then(res => res.json());
                return res;
            }
            catch (e) {
                return {};
            }
        });
    }
};
myHttp = __decorate([
    loon_1.Service()
], myHttp);
exports.default = myHttp;
