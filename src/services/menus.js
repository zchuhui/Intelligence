import request from '../utils/request';
import { IS_SERVER } from '../constants/constant';

// 获取站点菜单
export function getMenuSite() { 
  	return request(`/api?com=api&t=getSite`);
}


// 获取分类菜单
export function getMenuCate() { 
	
	//开发环境
	let url = `/api?com=api&t=getCateList`;
	
	if(IS_SERVER){
		// 线上环境
		url = `http://betabia.banggood.com/index.php?com=api&t=getCateList`;
	}

  	return request(url);
}


// 获取所有品牌菜单
export function getMenuBrand() { 

	//开发环境
	let url = `/api?com=api&t=getBrandList`;
	
	if(IS_SERVER){
		// 线上环境
		url = `http://betabia.banggood.com/index.php?com=api&t=getBrandList`;
	}

  	return request(url);
}

