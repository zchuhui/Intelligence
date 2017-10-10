
/**
 * 竞品模块
 * Author:zhuangchuhui
 * Date:2017-10-10
 */
import request from '../utils/request-axios';
import { Url } from '../config/config.url';


/**
 * 搜索数据
 * @param {object} params 
 */
export function search(params) { 
	params = params.searchArgs;
	Object.assign(params,{'com':'ajax','t':'productList'})
    return request(Url, {
          method: 'get',
          data: params,
    });
}

