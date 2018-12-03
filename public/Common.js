"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const crypto = require("crypto");
const sequelize_1 = require("../db/sequelize");
const log = require("../config/log");
const code_1 = require("../config/code");
class Common {
    constructor() {
        this.sequelize = sequelize_1.sequelize;
        this.log = log;
        this.CODE = code_1.CODE;
    }
    base64Encode(str) {
        return new Buffer(str).toString('base64');
    }
    base64Decode(str) {
        return new Buffer(str, 'base64').toString();
    }
    getMd5(str) {
        const md5 = crypto.createHash('md5');
        str = md5.update(str).digest('hex');
        return str;
    }
    getClientIp(req) {
        let ipAddress;
        let headers = req.headers;
        let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
        forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        console.log(req.ip, req.ips, ipAddress);
        return ipAddress;
    }
    getUserAgent(req) {
        let headers = req.headers;
        let userAgent;
        if (headers['user-agent']) {
            userAgent = headers['user-agent'];
        }
        return userAgent;
    }
    getTimeStamp(str = '', format = 'X') {
        let time = moment().format('X');
        if (str) {
            str = str.replace(/年/gi, '-');
            str = str.replace(/月/gi, '-');
            str = str.replace(/日/gi, '');
            time = moment(new Date(str)).format(format);
        }
        return String(time);
    }
}
exports.default = Common;
