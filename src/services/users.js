import request from '../utils/request';
import { Url } from '../config/config.url';

/**
 * 登录
 * @param  {[type]} args [用户名、密码]
 * @return {[type]}      [登录信息]
 */
export function login(args) {
	console.log(args)
	let url = `${Url}?com=login&t=validate&username=${args.username}&password=${args.password}`;
	console.log(url)
  	return request(url);

}

