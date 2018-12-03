import {CookieParam, Data, Filter, IMiddleware, Next, Res, HeaderParam} from "loon";
import * as Express from "express"
import {CODE} from "../../config/code"
import {checkToken, decodeToken} from "../../public/token"

@Filter()
export class AuthenticateFilter implements IMiddleware {
    public use(@Data() data: any, @Res() res: Express.Response, @Next() next: Express.NextFunction, @HeaderParam('xcx-token') token: string) {
        if (checkToken(token)) {
            const payload = decodeToken(token).payload
            data.user = payload.data
            next()
        } else {
            res.sendStatus(CODE.ABNORMAL)
        }
    }
}
