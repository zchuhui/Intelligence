import request from '../utils/request';
import { Url } from '../config/config.url';

/**
 * 登录
 * @param  {[type]} args [用户名、密码]
 * @return {[type]}      [登录信息]
 */
export function login(args) {
	let url = `${Url}?com=login&t=validate&username=${args.username}&password=${args.password}`;
  	return request(url);
}

/**
 * 退出登录
 * @return {[type]}      [退出登录信息]
 */
export function logout() {
	let url = `${Url}?com=login&t=logout`;
  	return request(url);
}
