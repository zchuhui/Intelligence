/**
 * 竞品数据接入模块
 * Date:2017-9-13
 * Author:zhuangchuhui
 */
import request from "../utils/request";
import { Url } from "../config/config.url";


/**
 * 根据时间获取竞品图表数据
 * @param {object} params 
 */
export function getRivalDataByDate(params) {
    const url = `${Url}?com=products&t=productNewCountList&startDate=${params.startDate}&endDate=${params.endDate}`;
    
    return request(url);
}


/**
 * 搜索竞品数据
 * @param {object} params 
 */
export function getRivalDataByParams(params) {
    let url = `${Url}?com=products&t=getProductsNewList`;
    // 把参数转为url格式，并追加
    for (let i in params) {
        if (params[i] !== "" &&params[i] !== undefined && params[i] !== null) 
        {
            const item = encodeURIComponent(params[i]);   // 转义
            url += `&${i}=${item}`;                       // 拼接
        }
    }
    return request(url);
}



