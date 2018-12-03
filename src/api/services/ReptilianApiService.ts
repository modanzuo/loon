import {Service} from "loon"
import Common from "../../../public/Common";
import OpenJackpotModel from '../../../db/models/OpenJackpotModel'
import UserModel from "../../../db/models/UserModel";
import {MyError} from '../../../public/CommonException'
import SubscribeModel from "../../../db/models/SubscribeModel";

@Service()
export default class ReptilianApiService extends Common {

    public async dbMode() {
        // const list = await this.sequelize.query("SELECT  * FROM open_jackpot  WHERE open_term IN ( SELECT MAX( open_term ) FROM open_jackpot GROUP BY open_type ) ORDER BY open_type",{ type: sequelize.QueryTypes.SELECT });
        const list = await OpenJackpotModel.findAll({
            where: {
                open_term: "10001"
            },
        })
        return list || []
    }

    /**
     * 每期中新一个列表
     * @returns {Promise<any[]>}
     */
    public async getList() {
        const list = await this.sequelize.query("SELECT *  FROM open_jackpot op LEFT JOIN  jackpot_type   ja  on ja.type=op.open_type WHERE open_term IN ( SELECT MAX( open_term ) FROM open_jackpot GROUP BY open_type )  ORDER BY open_type", {type: this.sequelize.QueryTypes.SELECT});
        return list || []
    }

    /**
     *  详情
     * @param {string} id
     * @returns {Promise<{}>}
     */
    public async getInfo(id: string) {
        const info = await OpenJackpotModel.find({
            where: {
                id
            }
        });
        return info || {}
    }

    /**
     * 历史列表
     * @param {string} type
     * @returns {Promise<any[]>}
     */
    public async getHistory(type: string) {
        const info = await OpenJackpotModel.findAll({
            where: {
                open_type: type
            },
            'order': [["open_term", "DESC"]],
            offset: 0,
            limit: 20
        });
        return info || []
    }

    /**
     * 关注
     * @param user
     * @param {string} type
     * @returns {Promise<any>}
     */
    public async subscribe(user: any, type: string) {
        const userData =await UserModel.findOne({
            where: {
                openid: user.openid
            }
        });
        if (!userData) {
            throw new MyError('未授权', this.CODE.AUTHOR_ERROR)
        }
        const sub =await SubscribeModel.findOne({
            where: {
                user_id: userData.user_id
            }
        });
        if (!sub) {
            return await SubscribeModel.create({
                user_id: userData.user_id,
                params: type,
                created_at: this.getTimeStamp(),
                update_at: this.getTimeStamp()
            })
        }
        let params = sub.params;
        params = params.split(",")
        let index = params.indexOf(type.toString())
        if (index > -1) {
            throw new MyError('您已经关注!', this.CODE.REPEAT)
        }
        params = sub.params
        return await SubscribeModel.update({
                user_id: userData.user_id
            }, {
                params: params.join(","),
                update_at: this.getTimeStamp()
            }
        )

    }

    /**
     * 取消关注
     * @param user
     * @param {string} type
     * @returns {Promise<any>}
     */
    public async cancelSubscribe(user: any, type: string) {
        const userData = UserModel.findOne({
            where: {
                openid: user.openid
            }
        });
        if (!userData) {
            throw new MyError('未授权', this.CODE.AUTHOR_ERROR)
        }
        const sub = SubscribeModel.findOne({
            where: {
                user_id: userData.user_id
            }
        });
        if (!sub) {
            throw new MyError('您还没关注', this.CODE.REPEAT)
        }
        let params = sub.params;
        params = params.split(",")
        let index = params.indexOf(type.toString())
        if (index === -1) {
            throw new MyError('您还没关注', this.CODE.REPEAT)
        }
        params = params.splice(index, 1);
        return await SubscribeModel.update({
                user_id: userData.user_id
            }, {
                params: params.join(","),
                update_at: this.getTimeStamp()
            }
        )
    }
}
