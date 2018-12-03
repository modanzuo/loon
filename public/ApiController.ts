import * as Express from 'express';
import {CODE} from "../config/code"
import {Res} from "loon";
import * as  log from '../config/log'

export default class ApiController {
    public log = log

    public success(res: Express.Response, data: any, code: number = CODE.SUCCESS): void {
        res.send({
            code,
            data
        })
    }

    public error(res: Express.Response, message: string, code: number = CODE.ABNORMAL): void {
        res.send({
            code,
            msg: message
        })
    }
}