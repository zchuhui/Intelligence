import { originRequest } from '../utils/request';
import { Url } from '../config/config.url';

/**
 * 登录
 * @param  {string} args 用户名、密码
 * @return {object}      登录信息
 */
export function login(args) {
	let url = `${Url}?com=login&t=validate&username=${args.username}&password=${args.password}`;
	return originRequest(url,{
        method:'POST',
    });
}


/**
 * 退出登录
 * @return {object}     退出登录信息
 */
export function logout() {
	let url = `${Url}?com=login&t=logout`;
  	return originRequest(url);
}
