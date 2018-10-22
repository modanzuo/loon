"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const mySql = require('../db/mySql');
class Common {
    constructor() {
        this.mySql = mySql;
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
    getTimeStamp(str = '') {
        let time = moment().format('X');
        if (str) {
            time = moment(str).format('X');
        }
        return String(time);
    }
}
exports.default = Common;
