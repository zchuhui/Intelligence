import fetch from 'dva/fetch';
import LocalStorage from './localStorage';

/*function parseJSON(response) {
  return response.json();
}*/

function checkStatus(response) {

	// 返回的状态码为请求成功
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);

	error.response = response;

	throw error;

}


/**
 * 异步请求url，获取数据
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

	// 加上 token
	const token = LocalStorage.get('token');
	if(token){
		url = `${url}&token=${token}`;
	}

	// 请求数据
	const response = await fetch(url, options);

	// 检查请求是否成功
	checkStatus(response);
	
	// 转为json格式
	//const data = await response;
	const data = await response.json();
	//console.log('json',data); 
	const ret = {
		data,
		headers: {
		},
	};

	if (response.headers.get('x-total-count')) {
		ret.headers['x-total-count'] = response.headers.get('x-total-count');
	}
	//console.log('ret',ret);
	return ret;
}
