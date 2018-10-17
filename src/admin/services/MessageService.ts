import {Service} from "loon"
import {Common} from "../../../public/Common";
import * as Express from 'express';


@Service()
export class MessageService extends Common {
    /**
     * @author modanzuo@sina.com
     * @date 2018/9/26
     * 获取列表
     */
    public async getList(req: Express.Request) {
        let data = []
        try {
            data = await  this.mySql.ROW('SELECT * FROM  `comment`')
        } catch (e) {
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
        let sql = "INSERT INTO `comment` (`name`,`content`,`ip`,`ua`,`state`,`created`) VALUES (?,?,?,?,?,?,?)";
        const ip = this.getClientIp(req)
        const ua = this.getUserAgent(req)
        let params = ['测试', '内容1', ip, ua, 0, Date.now()];
        let data = await this.mySql.EXECUTE(sql, ...params)

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
            let sql = 'update users set password="ddd" where name="zhangsan"';
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
            let sql = "delete from  users where name='zhangsan'";
            let params = {password: 'ppp'}
            data = await this.mySql.EXECUTE(sql, params)
        } catch (e) {

        }
        return data;
    }
}