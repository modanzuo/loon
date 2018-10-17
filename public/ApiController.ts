import * as Express from 'express';
import {CODE} from "../config/code"

export class ApiController {
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