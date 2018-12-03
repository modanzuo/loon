import ApiController from "../../../public/ApiController";
import * as Express from 'express';
import {Req, Res, Get, RestController, Inject, BeforeFilter, QueryParam, PathParam, Post, BodyParam, Data} from "loon";
import UserService from "../services/UserService";
import {AuthenticateFilter} from "../../filter/AuthenticateFilter";


@RestController('/api/user')
@BeforeFilter(AuthenticateFilter, {only: ['getUserInfoAction']})
class UserController extends ApiController {
    @Inject()
    private userService: UserService;

    @Post('/login')
    public async LoginAction(@Res() res: Express.Response, @BodyParam('data') data: any) {
        try {
            const user = await this.userService.setAuth(data);
            this.success(res, user)
        } catch (e) {
            console.log(e)
            this.error(res, '授权失败')
        }
    }

    @Get('/user-info')
    public async getUserInfoAction(@Data() data: any, @Res() res: Express.Response) {
        const {user} = data
        let info = null;
        if (user) {
            try {
                info = await  this.userService.getUserInfo(user.openid)
            } catch (e) {
                this.log.error(e)
            }

        }
        this.success(res, info)
    }
}