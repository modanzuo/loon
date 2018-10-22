import * as Express from 'express';
import * as moment from 'moment';

const mySql = require('../db/mySql');

export default  class Common {
    public mySql = mySql

    public getClientIp(req: Express.Request): string {
        let ipAddress;
        let headers = req.headers;
        let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
        forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        console.log(req.ip, req.ips, ipAddress)
        return ipAddress;
    }

    public getUserAgent(req: Express.Request): string {
        let headers = req.headers;
        let userAgent;
        if (headers['user-agent']) {
            userAgent = headers['user-agent']
        }
        return userAgent;
    }

    public getTimeStamp(str: string = ''): string {
        let time = moment().format('X');
        if (str) {
            time = moment(str).format('X');
        }
        return String(time);
    }

}

