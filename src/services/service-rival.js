/**
 * 竞品数据接入模块
 * Date:2017-9-13
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

