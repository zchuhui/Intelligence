/**
 * 通用菜单集合
 * Date:2017/6/20
 * Author:zhuangchuhui
 */

import * as menusService from '../services/menus';


// 默认站点
const defautSite = ["banggood", "gearbest"];


// 默认分类
const defautCate = [
{
    value: 'banggood',
    label: 'banggood'
}]

// 默认品牌
const defautBrand = [{
    bid: "2",
    bname: "HeLICMAX",
    site: "gearbest"
}, {
    bid: "3",
    bname: "GTeng",
    site: "gearbest"
}]


export default {
    namespace: 'Menus',

    state: {
        site: defautSite, // 站点列表
        cate: defautCate, // 分类列表
        brand: defautBrand, // 品牌列表
    },
    reducers: {
        // 存储分类表
        saveCate(state, { payload: { data: data } }) {
            // 把获取数据转为组件可用的数据格式
            data = cateToMenu(data);
            return {...state, cate: data };
        },
        // 存储品牌表
        saveBrand(state, { payload: { data: data } }) {
            return {...state, brand: data };
        },
    },
    effects: {
        // 获取分类表
        * getCates({ payload }, { select, call, put }) {

            try {
                // 获取分类数据
                const { data } = yield call(menusService.getMenuCate);

                // 存储数据
                if (data) {
                    yield put({ type: 'saveCate', payload: data });
                }
            } catch (e) {
                console.log(e.message)
            }
        },

        // 获取品牌表
        * getBrands({ payload }, { select, call, put }) {
            try {
                // 开始请求数据
                const { data } = yield call(menusService.getMenuBrand);

                // 存储数据
                if (data) {
                    yield put({ type: 'saveBrand', payload: data });
                } 
                
            } catch (e) {
                console.log(e.message)
            }
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            
            dispatch({ type: 'getCates' });
            dispatch({ type: 'getBrands' });

        },
    },
};


/**
 * 用递归遍历所有参数，
 * 并添加value、label值，用于植入插件的参数
 */
const cateToMenu = (cate) => {
    var arr = [];

    const mapCateToString = (item) => {
        item.map((i, index) => {

            i.value = i.cid;
            i.label = i.cname;

            if (i.children) {
                mapCateToString(i.children);
            }
        })
    };

    for (let i in cate) {

        mapCateToString(cate[i]);

        var obj = {
            value: i,
            label: i,
            children: cate[i],
        }
        if (i !== "") {
            arr.push(obj);
        }

    }

    return arr;
}



/**
 * 数组操作：判断元素是否在素组里面
 * @param  {[type]} val [元素1]
 * @return {[type]}     [description]
 */
Array.prototype.contains = function(val){
    var len = this.length;
    while(len--){
        if (this[len] === val) {
            return true;
        }
    }
    return false;
}
