/**
 * 竞品数据接入模块
 * Date:2017-9-13
 * Author:zhuangchuhui
 */
import request from '../utils/request-axios';
import { Url } from "../config/config.url";


/**
 * 根据时间获取竞品图表数据
 * @param {object} params 
 */
export function getRivalDataByDate(params) {
    Object.assign(params,{'com':'products','t':'productNewCountList'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}
 

/**
 * 搜索竞品数据
 * @param {object} params 
 */
export function getRivalDataByParams(params) {
    Object.assign(params,{'com':'products','t':'getProductsNewList'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}

/**
 * 竞品关联BG商品
 * @param {object} params 
 */
export function setRelatedBgBySku(params) {
    Object.assign(params,{'com':'products','t':'relateBgProduct'})
    return request(Url, {
          method: 'post',
          data: params,
    });
}

