import ApiController from "../../../public/ApiController";
import ReptilianService from "../../admin/services/ReptilianService";
import * as Express from 'express';
import {Req, Res, Get, RestController, Inject, QueryParam} from "loon";


@RestController('/admin/reptilian')
class ReptilianController extends ApiController {
    @Inject()
    private reptilianService: ReptilianService;


    @Get('/start')
    public async start(@Res() res: Express.Response, @Req() req: Express.Request, @QueryParam('max') max: number, @QueryParam('min') min: number) {

        try {
            let data = this.reptilianService.addPLW(max, min);
            this.success(res, "成功")
        } catch (e) {
            this.success(res, e.message)
        }
    }

}