//import request from '../utils/request';
import request from '../utils/request-axios';
import { Url } from '../config/config.url';

// 获取站点菜单
export function getMenuSite() { 
  	return request(`${Url}?com=ajax&t=getSite`);
}


/**
 * 获取竞品分类菜单
 */
export function getMenuCate() { 
	const params = {'com':'ajax','t':'getCateList'};
    return request(Url, {
          method: 'get',
          data: params,
    });
}

/**
 * 获取竞品品牌菜单
 */
export function getMenuBrand() { 
	const params = {'com':'ajax','t':'getBrandList'};
    return request(Url, {
          method: 'get',
          data: params,
	});
}
	

/**
 * 获取banggood站点的分类菜单
 */
export function getMenuCateByBanggood() { 
	
	const params = {'com':'ajax','t':'getCateList','site':'banggood'};
    return request(Url, {
          method: 'get',
          data: params,
	});
}


/**
 * 获取Banggood的品牌菜单
 */
export function getMenuBrandByBanggood() { 
	 
	const params = {'com':'ajax','t':'getBrandList','site':'banggood'};
    return request(Url, {
          method: 'get',
          data: params,
	});
}

