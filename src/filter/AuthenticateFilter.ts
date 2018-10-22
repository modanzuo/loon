import {CookieParam, Data, Filter, IMiddleware, Next, Res} from "loon";
import * as Express from "express"
import {CODE} from "../../config/code"

@Filter()
export class AuthenticateFilter implements IMiddleware {

    public use(@Data() data: any, @Res() res: Express.Response, @Next() next: Express.NextFunction, @CookieParam('XSession') token: string) {
        data.token = token
        if (token) {
            next()
        } else {
            res.sendStatus(CODE.ABNORMAL)
        }
    }
}
