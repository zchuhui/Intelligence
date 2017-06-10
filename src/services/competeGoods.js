import request from '../utils/request';
import { PAGE_SIZE } from '../constants/constant';

// 获取数据
export function fetch() { 
  	return request(`/api`);
}


// 搜索条件，分别是：站点、分类ID、品牌ID、关联状态
// 开始时间、结束时间、价格区间1、价格区间2、sku、请求页数
/*const argument = {
	site:'',      
	cid:'',       
	bid:'',       
	status:'',    
	startTime:'', 
	endTime:'',	
	price1:'',
	price2:'',
	sku:'',
	page:1
}*/


// 搜索数据
export function search(args) { 
	
	const argument = args.searchArgs;
	let argumentStr = `com=api&t=productList`;
	
	for(let i in argument){ 
		if(argument[i] !== ''){ 
			argumentStr += `&${i}=${argument[i]}`
		}
	}
	 
	let url = `/api?${argumentStr}`;
	console.log("url:"+url) 
  	return request(url);
}


