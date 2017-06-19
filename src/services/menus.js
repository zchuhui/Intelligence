import request from '../utils/request';
import { IS_SERVER } from '../constants/constant';
import { url } from '../config/config.url';

// 获取站点菜单
export function getMenuSite() { 
  	return request(`${url}?com=api&t=getSite`);
}


// 获取分类菜单
export function getMenuCate() { 
	
	let currentUrl = `${url}?com=api&t=getCateList`;

  	return request(currentUrl);
}


// 获取所有品牌菜单
export function getMenuBrand(site) { 

	let currentUrl = `${url}?com=api&t=getBrandList&site=${site.site}`;
	
  	return request(currentUrl);
}

