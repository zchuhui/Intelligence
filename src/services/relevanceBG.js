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
