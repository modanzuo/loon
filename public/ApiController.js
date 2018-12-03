"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../config/code");
const log = require("../config/log");
class ApiController {
    constructor() {
        this.log = log;
    }
    success(res, data, code = code_1.CODE.SUCCESS) {
        res.send({
            code,
            data
        });
    }
    error(res, message, code = code_1.CODE.ABNORMAL) {
        res.send({
            code,
            msg: message
        });
    }
}
exports.default = ApiController;
