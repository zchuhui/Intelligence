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


/**
 * 根据SKU获取商品价格汇总信息
 * @param {string} sku 
 */
export function getPriceListBySku(sku) {
    const url = `${Url}?com=products&t=priceSet&sku=${sku}`;
    return request(url);
}


/**
 * 获取单个商品某段时间内价格趋势图和对比关系
 * @param {object} argument 
 */
export function getGoodsByArguments(argument) {
    
    let url = `${Url}?com=products&t=productOtherRunChart`;

    // 把参数转为url格式，并追加
    for (let i in argument) {
        if (argument[i] !== "" && argument[i] !== undefined && argument[i] !== null) {
            url += `&${i}=${argument[i]}`;
        }
    }
    
    return request(url);
}

