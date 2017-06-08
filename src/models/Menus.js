/*菜单类集合，所以菜单载入都放这里*/

import * as menusService from '../services/menus';

// 默认站点
const defautSite = [
	{
		banggood: "banggood",
		gearbest: "gearbest"
	}
]

// 默认分类
const defautCate = [
	{
        "cid": "1", 	            //分类ID
        "cname": "Toys & Hobbies",  //类名
        "parent_cid": "3",
        "level": "0",
        "site": "gearbest",
    },
    {
        "cid": "2", 	            //分类ID
        "cname": "Hobbies",         //类名
        "parent_cid": "0",
        "level": "2",
        "site": "gearbest",
    },
]

// 默认品牌
const defautBrand = [
	{
      "bid": "2",                //品牌ID
      "bname": "HeLICMAX11",     //品牌名称
      "site": "gearbest"         //所属站点
    },
    {
      "bid": "2",               //品牌ID
      "bname": "HeLICMAX22",    //品牌名称
      "site": "gearbest"        //所属站点
    },
]


export default {
    namespace: 'Menus',
    state: {
    	site:defautSite,      // 站点列表
    	cate:defautCate,      // 分类列表
    	brand:defautBrand,    // 品牌列表
    },
    reducers: {
    	
    },
    effects: {
    	
    },
    subscriptions: {
    	
    },
};
