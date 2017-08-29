/**
 * 商品详情数据接入模块
 * Date:2017-8-29
 * Author:zhuangchuhui
 */
import request from "../utils/request";
import { Url } from "../config/config.url";


/**
 * 根据SKU获取商品
 * @param {string} sku 
 */
export function getGoodsBySku(sku) {
    const url = `${Url}?com=products&sku=${sku}`;
    return request(url);
}


