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
const Http_1 = require("../../../public/Http");
const OpenJackpotModel_1 = require("../../../db/models/OpenJackpotModel");
const data_1 = require("../../data");
let ReptilianService = class ReptilianService extends Common_1.default {
    getHtmlData(url, num) {
        return __awaiter(this, void 0, void 0, function* () {
            let str = `00000${num}`;
            str = str.substring(str.length - 5);
            url = `${url}${str}.shtml`;
            let $ = null;
            try {
                $ = yield this.myHttp.getHtml(url);
            }
            catch (e) {
                console.log(`第${num}期  无`);
                return null;
            }
            let periods = $(".cfont2 strong").html();
            const ball_orange_arr = $(".ball_box01 .ball_orange");
            let openNum = [];
            ball_orange_arr.map((index) => {
                openNum.push(ball_orange_arr.eq(index).html());
            });
            let amount = $(".cfont1 ").eq(0).html();
            let addAmount = $(".cfont1 ").eq(1).html();
            let awardNum = $(".kj_tablelist02 ").eq(1).find('tr').eq(2).find("td").eq(1).html();
            let awardAmount = $(".kj_tablelist02").eq(1).find('tr').eq(2).find("td").eq(2).html();
            let dateStr = $(".span_right").html();
            let dateData = dateStr.match(/\S+：(\S+) \S+：(\S+)/);
            return {
                periods,
                openNum,
                amount,
                addAmount,
                date: [
                    this.getTimeStamp(dateData[1]),
                    this.getTimeStamp(dateData[2])
                ],
                award: [{
                        num: awardNum,
                        amount: awardAmount
                    }]
            };
        });
    }
    addPLW(max, min) {
        return __awaiter(this, void 0, void 0, function* () {
            // let num: number = 0;
            // min = Math.min(max, min);
            // min = Math.max(4001, min);
            // num = min;
            // max = Math.max(max, min);
            // console.log(min);
            const url = 'http://kaijiang.500.com/shtml/plw/';
            let addNumber = 0;
            do {
                try {
                    let data = yield this.getHtmlData(url, data_1.PLWData[addNumber]);
                    if (data) {
                        let time = this.getTimeStamp();
                        let type = 3;
                        const jackpot = yield OpenJackpotModel_1.default.findOne({
                            where: {
                                openTerm: data.periods,
                                openType: type
                            }
                        });
                        let params = {
                            open_number: data.openNum.join(','),
                            open_term: data.periods,
                            open_created: data.date[1],
                            open_type: type,
                            open_params: JSON.stringify(data),
                            created: time
                        };
                        if (!jackpot || jackpot.length <= 0) {
                            yield OpenJackpotModel_1.default.create(Object.assign({}, params));
                            console.log(`第${data.periods}期 录入成功`);
                        }
                        else {
                            yield OpenJackpotModel_1.default.update(Object.assign({}, params), {
                                where: {
                                    open_term: data.periods,
                                    open_type: type
                                }
                            });
                            console.log(`第${data.periods}期 数据已存在`);
                        }
                    }
                }
                catch (e) {
                    console.log('失败', e);
                }
                addNumber++;
            } while (addNumber < data_1.PLWData.length);
            return [];
        });
    }
    addPLS() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    loon_1.Inject(),
    __metadata("design:type", Http_1.default)
], ReptilianService.prototype, "myHttp", void 0);
ReptilianService = __decorate([
    loon_1.Service()
], ReptilianService);
exports.default = ReptilianService;
