import request from '../utils/request';
import { Url } from '../config/config.url';

// 获取BG报表数据
// page: 页数
export function fetch({page}) { 

	//默认参数，并加上页数	
	const apiArgs= `com=api&t=productList&site=banggood&page=${page}`;
	
	// 合成Url
	let currentUrl = `${Url}?${apiArgs}`;
	
  	return request(currentUrl);
}



/**
 * 搜索数据
 * @param  {[type]} args [搜索参数]
 * @return {[type]}      [请求数据的集合]
 */
export function search(args) { 
	
	const argument = args.searchArgs;
	
	let argumentStr = `com=api&t=productList&site=banggood`;
	
	// 把参数转为url格式
	for(let i in argument){ 
		if(argument[i] !== '' && argument[i] !== undefined && argument[i] !== null ){ 
			argumentStr += `&${i}=${argument[i]}`
		}
	}
	
	let url = `${Url}?${argumentStr}`;
	
	console.log(url);
  	return request(url);
}