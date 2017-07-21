import request from '../utils/request';
import { IS_SERVER } from '../constants/constant';
import { Url } from '../config/config.url';

// 根据页数获取数据
// page: 页数
export function fetch({page}) { 
	//添加两个默认参数，并加上页数
	const apiArgs= `com=ajax&t=productList&page=${page}`;

	let url = `${Url}?${apiArgs}`;

  	return request(url);
}


// 搜索数据
// arg: 搜索参数
export function search(args) { 
	
	const argument = args.searchArgs;
	let argumentStr = `com=ajax&t=productList`;
	
	// 把参数转为url格式
	for(let i in argument){ 
		if(argument[i] !== '' && argument[i] !== undefined && argument[i] !== null ){ 
			argumentStr += `&${i}=${argument[i]}`
		}
	}
	
	let url = `${Url}?${argumentStr}`;
	
  	return request(url);
}


