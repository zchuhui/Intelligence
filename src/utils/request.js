import fetch from 'dva/fetch';
import LocalStorage from './local-storage';
import { message } from 'antd';
import qs from 'qs';  

/**
 * 检查状态码
 * @param {object} response 
 */
const checkStatus = (response) => {

	// 返回的状态码为请求成功
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);

	error.response = response;

	throw error;
}


/**
 * 存储用户权限信息
 * @param {object} data 
 */
const saveUserInfoSj = (data) => {
	if(data.userInfo){
		if(data.userInfo.sj_info == null){
			LocalStorage.set('sj_info',false);
		}else{
			LocalStorage.set('sj_info',true);
		}
	}
}


/**
 * 异步请求url，获取数据
 * 添加状态码处理
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

	// 在请求的url加上 token,用于登录验证
	const token = LocalStorage.get('token');
	if(token){
		url = `${url}&token=${token}`;
	}

	// 替换 #
	url = url.replace("#","%");

	// 请求数据
	const response = await fetch(url, options);
	// 检查请求是否成功
	checkStatus(response);
	
	// 转为json格式
	const data = await response.json();
	const ret = {
		data,
		headers: {
		},
	};
	if (response.headers.get('x-total-count')) {
		ret.headers['x-total-count'] = response.headers.get('x-total-count');
	}

	// 存储用户权限信息
	saveUserInfoSj(data);

	// 返回数据验证
	const code = ret.data.code;
	const msg = ret.data.msg;

	// 如果请求成功，则返回数据，失败则统一处理
	if(code == 200){
		return ret;
	} 
	else{
		switch(code){
			case 401:
				// 未登录状态
				window.location.href = "/login";
				break;
			case 400:
				// 请求失败状态
				//message.warning('请求失败，请重试');
				message.destroy();
				message.warning(msg);
				break;
			case 501:
				// 请求失败状态
				message.destroy();
				message.warning('网络繁忙，请重试');
				break;
			case 500:
				// 请求失败状态
				message.destroy();
				message.warning('网络繁忙，请重试');
				break;
			default:
				// 请求失败状态
				message.destroy();
				message.warning('未知错误');
				break;
		}
	}
}


/**
 * 异步请求url，获取数据
 * 原始版本，不对返回数据进行处理
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function originRequest(url, options) {

	try{
		// 在请求的url加上 token,用于登录验证
		const token = LocalStorage.get('token');
		if(token){
			url = `${url}&token=${token}`;
		}

		// 替换 #
		url = url.replace("#","%");

		// 请求数据
		const response = await fetch(url, options);
		
		// 检查请求是否成功
		checkStatus(response);
		
		// 转为json格式
		const data = await response.json();
		const ret = {
			data,
			headers: {
			},
		};
		if (response.headers.get('x-total-count')) {
			ret.headers['x-total-count'] = response.headers.get('x-total-count');
		}

		// 存储用户权限信息
		saveUserInfoSj(data);

		return ret;

	 }catch(e){
		message.destroy();
		message.warning("网络异常");
	} 
}


