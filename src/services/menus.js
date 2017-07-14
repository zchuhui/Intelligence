import request from '../utils/request';
import { Url } from '../config/config.url';

// 获取站点菜单
export function getMenuSite() { 
  	return request(`${Url}?com=ajax&t=getSite`);
}


// 获取分类菜单
export function getMenuCate() { 
	
	let currentUrl = `${Url}?com=ajax&t=getCateList`;

  	return request(currentUrl);
}


// 获取banggood站点的分类菜单
export function getMenuCateByBanggood() { 
	
	let currentUrl = `${Url}?com=ajax&t=getCateList&site=banggood`;

  	return request(currentUrl);
}


// 获取所有品牌菜单
export function getMenuBrand() { 

	let currentUrl = `${Url}?com=ajax&t=getBrandList`;
	
  	return request(currentUrl);
}

