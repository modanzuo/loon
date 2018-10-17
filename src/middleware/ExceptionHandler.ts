import {Err, ErrorMiddleware, IMiddleware, Res} from 'loon'
import * as Express from "Express"
import {CODE} from "../../config/code"

@ErrorMiddleware()
class ExceptionHandler implements IMiddleware {

    public use(@Err() err: any, @Res() res: Express.Response) {
        res.sendStatus(CODE.ABNORMAL)
    }
}
