"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../config/code");
class ApiController {
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
exports.ApiController = ApiController;
