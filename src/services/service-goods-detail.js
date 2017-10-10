/**
 * 商品详情数据接入模块
 * Date:2017-8-29
 * Author:zhuangchuhui
 */
import request from '../utils/request-axios';
import { Url } from "../config/config.url";


/**
 * 根据SKU获取商品
 * @param {string} sku 
 */
export function getGoodsBySku(sku) {
    const params = {'com':'products','sku':sku};
    return request(Url, {
          method: 'get',
          data: params,
    });
}


/**
 * 根据SKU获取商品价格汇总信息
 * @param {string} sku 
 */
export function getPriceListBySku(sku) {
    const params = {'com':'products','t':'priceSet','sku':sku};
    return request(Url, {
          method: 'get',
          data: params,
    });
}


/**
 * 获取单个商品某段时间内价格趋势图和对比关系
 * @param {object} params 
 */
export function getGoodsByArguments(params) {
    Object.assign(params,{'com':'products','t':'productOtherRunChart'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}

