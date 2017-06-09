import request from '../utils/request';

// 获取站点菜单
export function getMenuSite() { 
  	return request(`/api?com=api&t=getSite`);
}


// 获取分类菜单
export function getMenuCate() { 
  	return request(`/api?com=api&t=getCateList`);
}


// 获取所有品牌菜单
export function getMenuBrand() { 
  	return request(`/api?com=api&t=getBrandList`);
}

