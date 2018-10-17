import {Service} from "loon"
import {Common} from "../../../public/common";
import * as Express from 'express';

import CommentModel from '../../../db/models/CommentModel'


@Service()
export class MessageService extends Common {

    public    getTime(){
        return this.getTimeStamp()
    }
    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 获取列表
     */
    public async getList(req: Express.Request) {
        let data = []

        try {
            data = await CommentModel.findAll({
                attributes: ['id'],
                where: {name: '测试'}, order: [['id', 'DESC']]
            })
        } catch (e) {
            console.log(e)
            throw  new Error('服务器异常')
        }
        return data
    }

    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 插入数据
     */
    public async add(dataPost: any, req: Express.Request) {
        let sql = "INSERT INTO `comment` (`name`,`content`,`ip`,`ua`,`state`,`created`) VALUES (?,?,?,?,?,?)";
        const ip = this.getClientIp(req)
        const ua = this.getUserAgent(req)
        let time = this.getTimeStamp()
        console.log(time)
        let params = ['测试', '内容1', ip, ua, 0, time];
        let data
        try {
            data = await this.mySql.EXECUTE(sql, ...params)
        } catch (e) {
            console.log(e)
        }

        return data;
    }

    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 更新数据
     */
    public async update(dataPost: any) {
        let data = [];
        try {
            let sql = 'update comment set password="ddd" where name="zhangsan"';
            let params = {
                password: 'ppp'
            };
            data = await this.mySql.EXECUTE(sql, params)
        } catch (e) {

        }
        return data;
    }

    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 删除
     */
    public async delete($id: string) {
        let data = [];
        try {
            let sql = "delete from  comment ";
            let params = {}
            data = await this.mySql.EXECUTE(sql, params)
        } catch (e) {

        }
        return data;
    }
}