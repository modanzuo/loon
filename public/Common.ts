import * as Express from 'express';
import * as moment from 'moment';
import * as crypto from 'crypto'
import {sequelize} from '../db/sequelize'
import * as  log from '../config/log'
import {CODE} from "../config/code";


export default class Common {
    public sequelize = sequelize
    public log = log
    public CODE = CODE

    public base64Encode(str: string) {
        return new Buffer(str).toString('base64');
    }

    public base64Decode(str: string) {
        return new Buffer(str, 'base64').toString();
    }

    public getMd5(str: string): string {
        const md5 = crypto.createHash('md5');
        str = md5.update(str).digest('hex');
        return str
    }

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

    public getTimeStamp(str: string = '', format: string = 'X'): string {
        let time = moment().format('X');
        if (str) {
            str = str.replace(/年/gi, '-')
            str = str.replace(/月/gi, '-')
            str = str.replace(/日/gi, '')
            time = moment(new Date(str)).format(format);
        }
        return String(time);
    }

}

