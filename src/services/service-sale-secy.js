/**
 * 销售秘书 Service
 */
import request from '../utils/request';
import { Url } from '../config/config.url';


/**
 * 获取销售秘书信息
 * @param {*日期参数} args 
 */
export function getSalesSecretaryInfo(args) {

    const apiArgs = `com=ajax&t=getSalesSecretaryInfo&time=${args.time}`;

    let currentUrl = `${Url}?${apiArgs}`;

    return request(currentUrl);
}

/**
 * 获取排行与类目的信息
 * @param {*日期参数} args 
 */
export function getSalesSecretaryCateInfo(args) {
	
    const apiArgs = `com=ajax&t=getSalesSecretaryCateInfo&time=${args.time}`;

    let currentUrl = `${Url}?${apiArgs}`;

    return request(currentUrl);
}

/**
 * 获取商品对比信息
 * @param {*日期参数} args 
 */
export function getSalesSecretaryComparison(args) {
	
    const apiArgs = `com=ajax&t=getSalesSecretaryComparison&time=${args.time}`;

    let currentUrl = `${Url}?${apiArgs}`;

    return request(currentUrl);
}