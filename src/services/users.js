
import request from '../utils/request-axios';
import { Url } from '../config/config.url';


/**
 * 登录
 * @return {object} 
 */
export function login(params) {
	params.com = "login";
	params.t = "validate";
	
	return request(Url, {
		method: 'post',
		data: params,
	});
}


/**
 * 退出登录
 * @return {object} 
 */
export function logout(params) {
	params.com = "login";
	params.t = "logout";

	return request(Url, {
		method: 'post',
		data: params,
	});
}
