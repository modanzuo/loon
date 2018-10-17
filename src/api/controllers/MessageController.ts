import {BodyParam, Get, Inject, Post, Req, Res, RestController} from "loon";
import {MessageService} from "../../api/services/messageService";
import * as Express from 'express';
import {ApiController} from "../../../public/ApiController";


@RestController('/api/message')
class MessageController extends ApiController {
    @Inject()
    private MessageService: MessageService;

    @Get('/list')
    @Post('/list')
    public async getList(@Res() res: Express.Response, @Req() req: Express.Request) {
        try {
            const data = await this.MessageService.getList(req);
            this.success(res, data)
        } catch (e) {
            this.error(res, '服务器异常！')
        }

    }

    @Get('/add')
    @Post('/add')
    public async add(@Res() res: Express.Response, @Req() req: Express.Request, @BodyParam('data') dataPost: any) {
        let data;
        try {
            data = await this.MessageService.add(dataPost, req);
            this.success(res, data);
        } catch (e) {
            this.error(res, "服务器繁忙")
        }

    }

    @Post('/update')
    public async update(@Res() res: Express.Response, @BodyParam('data') dataPost: any) {
        const data = await this.MessageService.update(dataPost);
        res.send({})
    }

    @Get('/delete')
    @Post('/delete')
    public async delete(@Res() res: Express.Response, @BodyParam('id') id: string) {
        const data = await this.MessageService.delete(id)
        res.send({})
    }

}