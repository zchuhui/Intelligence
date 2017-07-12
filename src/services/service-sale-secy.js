/**
 * 销售秘书 Service
 */
import request from '../utils/request';
import { Url } from '../config/config.url';
import moment from 'moment';


/**
 * 获取销售秘书信息
 * @param {*日期参数} args 
 */
export function getSalesSecyInfo(args) {
	
    const apiArgs = `com=api&t=getSalesSecretaryInfo&time=${args.date}`;

    let currentUrl = `${Url}?${apiArgs}`;
    console.log(currentUrl);
    return request(currentUrl);
}
