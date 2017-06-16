import request from '../utils/request';
import { IS_SERVER } from '../constants/constant';

// 根据页数获取数据
// page: 页数
export function fetch({page}) { 
	//添加两个默认参数，并加上页数
	const apiArgs= `com=api&t=productList&page=${page}`;

	// 开发环境
	let url = `/api?${apiArgs}`;

	if(IS_SERVER){
		// 线上环境
		url = `https://betabia.banggood.com/index.php?${apiArgs}`;
	}

	console.log(url);

  	return request(url);
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
	 
	// 开发环境：代理
	let url = `/api?${argumentStr}`;
	
	if(IS_SERVER){
		// 线上环境
		url = `https://betabia.banggood.com/index.php?${argumentStr}`;
	}

	console.log(url) 
	
  	return request(url);
}


