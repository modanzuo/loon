import {Inject, Service} from "loon"
import Common from "../../../public/Common";
import * as config from "config"
import UserModel from "../../../db/models/UserModel";
import {createToken} from "../../../public/token"
import * as WXBizDataCrypt from '../../../public/WXBizDataCrypt';
import myHttp from "../../../public/Http";
import {sequelize} from "../../../db/sequelize";

@Service()
export default class UserService extends Common {
    @Inject()
    private myHttp: myHttp;

    private appid = config.get('weChatConfig.appId')
    private secret = config.get('weChatConfig.AppSecret')

    public async getUserInfo(openid: string) {
        const user = sequelize.query('SELECT  * from  user as  u ' +
            'left join subscribe as sub   on sub.user_id =u.user_id ' +
            'WHERE u.openid = ?',
            {
                replacements: [openid],
                type: sequelize.QueryTypes.SELECT
            })

        return user;
    }

    /**
     * 获取
     * @param code
     * @returns {Promise<T | {}>}
     */
    private async getSessionKey(code) {
        const params = {
            appid: this.appid,
            secret: this.secret,
            js_code: code,
            grant_type: 'authorization_code'
        }
        const url = 'https://api.weixin.qq.com/sns/jscode2session';
        const data = await  this.myHttp.get(url, params)
        return data;
    }

    /**
     *  获取授权信息
     * @param data
     * @returns {Promise<any>}
     */
    public async setAuth(data: any) {
        let token = null
        const res = await this.getSessionKey(data.code);
        try {

            const pc = new WXBizDataCrypt(this.appid, res.session_key)
            const userData = pc.decryptData(data.encryptedData, data.iv)
            const params = {
                openid: userData.openId,
                nickname: userData.nickName,
                headimg: userData.avatarUrl,
                params: JSON.stringify(userData),
                created_at: this.getTimeStamp(),
                unionid: 'no'
            }
            let user = await UserModel.findOne({
                select: "openid,nickname",
                where: {
                    openid: userData.openId
                }
            })
            if (user) {
                await UserModel.update(params
                    , {
                        where: {
                            openid: userData.openId
                        }
                    })
            } else {
                UserModel.create(params)
            }
            token = this.setToken({openid: params.openid, nickName: params.nickname})
        } catch (e) {
            this.log.error(e)
            token = null
        }
        return token
    }

    private setToken(params: object) {
        const token = createToken(params, this.getTimeStamp());
        return token;
    }

}