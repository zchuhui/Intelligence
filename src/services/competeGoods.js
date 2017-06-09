import request from '../utils/request';
import { PAGE_SIZE } from '../constants/constant';

// 获取数据
export function fetch() { 
  	return request(`/api`);
}


// 搜索条件，分别是：站点、分类ID、品牌ID、关联状态
// 开始时间、结束时间、价格区间1、价格区间2、sku、请求页数
const argument = {
	site:null,      
	cid:null,       
	bid:null,       
	status:null,    
	startTime:null, 
	endTime:null,	
	price1:null,
	price2:null,
	sku:null,
	page:1
}


// 搜索数据
export function search(argument) { 

	let argumentStr = `com=api&t=productList
	&site=${argument.site}
	&cid=${argument.cid}
	&bid=${argument.bid}
	&status=${argument.status}
	&startTime=${argument.startTime}
	&endTime=${argument.endTime}
	&price1=${argument.price1}
	&price2=${argument.price2}
	&sku=${argument.sku}
	&page=${argument.page}
	`

	let url = `/php?${argumentStr}`;

  	return request(url);
}


