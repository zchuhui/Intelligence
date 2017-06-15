import request from '../utils/request';
import { PAGE_SIZE } from '../constants/constant';

// 根据页数获取数据
// page: 页数
export function fetch({page}) { 
	//添加两个默认参数，并加上页数
	const apiArgs= `com=api&t=productList&page=${page}`;
  	return request(`/api?${apiArgs}`);
}


// 搜索数据
// arg: 搜索参数
export function search(args) { 
	
	const argument = args.searchArgs;
	let argumentStr = `com=api&t=productList`;
	
	// 把参数转为url格式
	for(let i in argument){ 
		if(argument[i] !== '' && argument[i] !== undefined && argument[i] !== null ){ 
			argumentStr += `&${i}=${argument[i]}`
		}
	}
	 
	let url = `/api?${argumentStr}`;
	console.log("url:"+url) 
	
  	return request(url);
}


