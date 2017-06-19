import request from '../utils/request';
import { Url } from '../config/config.url';

// 获取站点菜单
export function getMenuSite() { 
  	return request(`${Url}?com=api&t=getSite`);
}


// 获取分类菜单
export function getMenuCate() { 
	
	let currentUrl = `${Url}?com=api&t=getCateList`;

  	return request(currentUrl);
}


// 获取所有品牌菜单
export function getMenuBrand(site) { 

	let currentUrl = `${Url}?com=api&t=getBrandList&site=${site.site}`;
	
  	return request(currentUrl);
}

