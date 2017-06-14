/*菜单类集合，所以菜单载入都放这里*/

import * as menusService from '../services/menus';

// 默认站点
const defautSite = ["banggood", "gearbest"];

// 默认分类
const defautCate = {
    gearbest: [{
        cid: "1",
        cname: "Toys & Hobbies",
        parent_cid: "0",
        site: "gearbest",
        children: [{
            cid: "2",
            cname: "Remote Control Toys",
            parent_cid: "1",
            site: "gearbest",
        }, {
            cid: "30",
            cname: "Action Figures",
            parent_cid: "1",
            site: "gearbest",
            children: [{
                cid: "31",
                cname: "Movies & TV Action Figures",
                parent_cid: "30",
                site: "gearbest"
            }]
        }, ]
    }, {
        cid: "32",
        cname: "Consumer Electronics",
        parent_cid: "0",
        site: "gearbest",
        children: {}
    }]
}

// 默认品牌
const defautBrand = [
    {
        bid: "84",
        bname: "123",
        site: "gearbest"
    }, {
        bid: "2",
        bname: "HeLICMAX",
        site: "gearbest"
    }, {
        bid: "3",
        bname: "GTeng",
        site: "gearbest"
    }
]


export default {
    namespace: 'Menus',
    state: {
        site: defautSite, // 站点列表
        cate: defautCate, // 分类列表
        brand: defautBrand, // 品牌列表
    },
    reducers: {

    },
    effects: {

    },
    subscriptions: {

    },
};
