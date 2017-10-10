
/**
 * 销售秘书模块
 * Author:zhuangchuhui
 * Date:2017-10-10
 */
import request from '../utils/request-axios';
import { Url } from '../config/config.url';


/**
 * 获取销售秘书信息
 * @param {object} params 
 */
export function getSalesSecretaryInfo(params) {
    Object.assign(params,{'com':'ajax','t':'getSalesSecretaryInfo'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}

/** 
 * 获取排行与类目的信息
 * @param {object} params 
 */
export function getSalesSecretaryCateInfo(params) {
    Object.assign(params,{'com':'ajax','t':'getSalesSecretaryCateInfo'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}

/**
 * 获取商品对比信息
 * @param {object} params 
 */
export function getSalesSecretaryComparison(params) {
	Object.assign(params,{'com':'ajax','t':'getSalesSecretaryComparison'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}