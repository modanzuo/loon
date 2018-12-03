import * as http from 'http';
import * as fetch from 'node-fetch';
import {Service} from "loon";
import * as cheerio from 'cheerio'
import * as iconv from 'iconv-lite';

import {XmlEntities as Entities} from 'html-entities';

const entities = new Entities();
@Service()
export default class myHttp {

    private decode(str: string): any {
        str = entities.decode(str)
        return str
    }

    public async getHtmlData(url: string) {
        return new Promise((resolve, reject) => {
            http.get(url, function (res) {
                const {statusCode} = res;
                if (statusCode == 200) {
                    let html = [];
                    let length: number = 1;
                    // 绑定data事件 回调函数 累加html片段
                    res.on('data', function (data) {
                        html.push(data);
                        length += data.length;
                    });

                    res.on('end', function () {
                        const data = Buffer.concat(html, length);
                        const change_data = iconv.decode(data, 'gb2312');
                        resolve(change_data)
                    });
                } else {
                    reject(statusCode);
                }

            }).on('error', function () {
                reject('获取数据错误');
            });
        })
    }

    public async getHtml(url: string) {
        const html = await this.getHtmlData(url);
        return cheerio.load(html, {decodeEntities: false});
    }

    public async post(url: string, body: any) {
        let header = {}
        try {
            let res = await fetch(url, {method: 'POST', timeout: 10000,body, headers: header}).then(res => res.json())
            return res;
        } catch (e) {

        }
    }

    public async get(url: string, params: any){
        let par = ''
        for (let item in params) {
            par += '&' + item + '=' + params[item]
        }
        par = '?' + par.slice(1)
        url += par
        let header = {}
        try {
            let res = await fetch(url, {method: 'GET', timeout: 10000, headers: header}).then(res => res.json())
            return res;
        } catch (e) {
            return {};
        }
    }
}