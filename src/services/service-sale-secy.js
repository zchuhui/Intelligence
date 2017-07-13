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
	console.log(args);
    const apiArgs = `com=api&t=getSalesSecretaryInfo&time=${args.time}`;

    let currentUrl = `${Url}?${apiArgs}`;

    return request(currentUrl);
}

/**
 * 获取销售秘书信息
 * @param {*日期参数} args 
 */
export function getSalesSecretaryCateInfo(args) {
	
    const apiArgs = `com=api&t=getSalesSecretaryCateInfo&time=${args.time}`;

    let currentUrl = `${Url}?${apiArgs}`;
    console.log(currentUrl);
    return request(currentUrl);
}