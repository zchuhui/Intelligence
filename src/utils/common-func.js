/**
 * 可共用的一些功能模块
 * Date:2017-07-21
 * Author:zhuangchuhui
 */

import moment from 'moment';
import { DATE_FORMAT } from '../constants/constant';

/**
 * 获取多少天前的日期 
 * @param {*} number 
 */
export function getDaysAgoDate(number){
    
    let date = moment(new Date()).subtract(number,"days").format(DATE_FORMAT);

    return date;
}