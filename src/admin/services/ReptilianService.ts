import {Inject, Service} from "loon"
import Common from "../../../public/Common";
import myHttp from "../../../public/Http";

import OpenJackpotModel from '../../../db/models/OpenJackpotModel'
import {PLWData} from '../../data'

interface FiveRow {
    periods: string,
    openNum: string[],
    amount: string,
    addAmount: string,
    date: string[],
    award: {
        num: number,
        amount: number,
    }
}

@Service()
export default class ReptilianService extends Common {
    @Inject()
    private myHttp: myHttp;


    public async getHtmlData<FiveRow>(url: string, num: string) {
        let str: string = `00000${num}`
        str = str.substring(str.length - 5)
        url = `${url}${str}.shtml`;
        let $ = null
        try {
            $ = await this.myHttp.getHtml(url);
        } catch (e) {
            console.log(`第${num}期  无`)
            return null;
        }
        let periods = $(".cfont2 strong").html();
        const ball_orange_arr = $(".ball_box01 .ball_orange")
        let openNum: string[] = [];
        ball_orange_arr.map((index) => {
            openNum.push(ball_orange_arr.eq(index).html());
        })

        let amount = $(".cfont1 ").eq(0).html();
        let addAmount = $(".cfont1 ").eq(1).html();
        let awardNum = $(".kj_tablelist02 ").eq(1).find('tr').eq(2).find("td").eq(1).html();
        let awardAmount = $(".kj_tablelist02").eq(1).find('tr').eq(2).find("td").eq(2).html();
        let dateStr = $(".span_right").html();
        let dateData = dateStr.match(/\S+：(\S+) \S+：(\S+)/)

        return {
            periods,
            openNum,
            amount,
            addAmount,
            date: [
                this.getTimeStamp(dateData[1]),
                this.getTimeStamp(dateData[2])
            ],
            award:[{
                num: awardNum,
                amount: awardAmount
            }]
        }
    }

    public async addPLW(max: number, min: number) {
        // let num: number = 0;
        // min = Math.min(max, min);
        // min = Math.max(4001, min);
        // num = min;
        // max = Math.max(max, min);
        // console.log(min);
        const url: string = 'http://kaijiang.500.com/shtml/plw/';
        let addNumber: number = 0;
        do {
            try {
                let data = await this.getHtmlData(url, PLWData[addNumber])
                if (data) {
                    let time = this.getTimeStamp()
                    let type = 3;
                    const jackpot = await OpenJackpotModel.findOne({
                        where: {
                            openTerm: data.periods,
                            openType: type
                        }
                    });
                    let params = {
                        open_number: data.openNum.join(','),
                        open_term: data.periods,
                        open_created: data.date[1],
                        open_type: type,
                        open_params: JSON.stringify(data),
                        created: time
                    };
                    if (!jackpot || jackpot.length <= 0) {
                       await OpenJackpotModel.create({...params});
                        console.log(`第${data.periods}期 录入成功`)
                    } else {
                        await OpenJackpotModel.update({...params}, {
                            where: {
                                open_term: data.periods,
                                open_type: type
                            }
                        });
                        console.log(`第${data.periods}期 数据已存在`)
                    }
                }
            } catch (e) {
                console.log('失败', e)
            }
            addNumber++
        } while (addNumber < PLWData.length)

        return []
    }

    public async  addPLS(){

    }
}