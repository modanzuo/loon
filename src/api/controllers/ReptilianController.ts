import ApiController from "../../../public/ApiController";
import ReptilianApiService from "../../api/services/ReptilianApiService";
import * as Express from 'express';
import {Res, Get, RestController, Inject, PathParam, BeforeFilter, Data} from "loon";
import {AuthenticateFilter} from "../../filter/AuthenticateFilter";


@RestController('/api/reptilian')
@BeforeFilter(AuthenticateFilter, {only: ['subscribeAction', 'noSubscribeAction']})
class ReptilianController extends ApiController {
    @Inject()
    private reptilianApiService: ReptilianApiService;

    @Get('/get-list')
    public async getListAction(@Res() res: Express.Response) {
        const list = await  this.reptilianApiService.getList();
        this.success(res, list)
    }

    @Get('/get-info/:id')
    public async getInfoAction(@Res() res: Express.Response, @PathParam('id') id: string) {
        const list = await  this.reptilianApiService.getInfo(id);
        this.success(res, list)
    }

    @Get('/get-history/:type')
    public async getHistoryAction(@Res() res: Express.Response, @PathParam('type') type: string) {
        const list = await  this.reptilianApiService.getHistory(type);
        this.success(res, list)
    }

    @Get('/subscribe/:type')
    public async subscribeAction(@Data() data: any, @Res() res: Express.Response, @PathParam('type') type: string) {
        try {
            console.log(data)
            const {user} = data
            const result = this.reptilianApiService.subscribe(user, type);
            this.success(res, result)
        } catch (e) {
            this.log.error(e);
            this.error(res, "服务器繁忙!", e.code)
        }

    }

    @Get('/cancel_subscribe/:type')
    public async noSubscribeAction(@Data() data: any, @Res() res: Express.Response, @PathParam('type') type: string) {
        try {
            const {user} = data
            const result = this.reptilianApiService.cancelSubscribe(user, type);
            this.success(res, result)
        } catch (e) {
            this.log.error(e);
            this.error(res, e.message || "服务器繁忙!", e.code)
        }
    }
}