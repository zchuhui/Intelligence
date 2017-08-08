/**
 * 通用菜单集合
 * Date:2017/6/20
 * Author:zhuangchuhui
 */

import * as menusService from '../services/menus';
import { CODE200 } from '../constants/constant';


// 默认分类
const defautCate = [
    {
        value: 'banggood',
        label: 'banggood'
    }]

// 默认banggood分类
const defautBanggoodCate = [
    {
        value: 'Electronics',
        label: 'Electronics'
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
        cate: defautCate,                   // 所有分类
        brand: defautBrand,                 // 品牌
        banggoodCate: defautBanggoodCate,   // banggood站点分类
    },
    reducers: {
        // 存储分类表
        saveCate(state, { payload: { data: data } }) {
            // 把获取数据转为组件可用的数据格式
            data = cateToMenu(data);
            return { ...state, cate: data };
        },

        // 存储Banggood分类表
        saveBanggoodCate(state, { payload: { data: data } }) {
            // 把获取数据转为组件可用的数据格式
            data = cateToMenu(data);
            return { ...state, banggoodCate: data };
        },

        // 存储品牌表
        saveBrand(state, { payload: { data: data } }) {
            // 判断是数组还是对象，对象的话转为数组
            let array = [];
            if (data instanceof Array) {
                array = data;
            } else {
                for (let i in data) {
                    array.push(data[i]);
                }
            }
            return { ...state, brand: array };
        },
    },
    effects: {
        // 获取分类
        * getCates({ payload }, { select, call, put }) {

            try {
                // 获取分类数据菜单
                const { data } = yield call(menusService.getMenuCate);

                // 存储数据
                if (data.code == CODE200) {
                    yield put({ type: 'saveCate', payload: data });
                }
            } catch (e) {
                //console.log(e.message)
            }
        },

        // 获取Bangood下的分类菜单
        * getBanggoodCates({ payload }, { select, call, put }) {

            try {
                // 获取分类数据
                const { data, code } = yield call(menusService.getMenuCateByBanggood);

                // 存储数据
                if (data.code == CODE200) {
                    yield put({ type: 'saveBanggoodCate', payload: data });
                }
            } catch (e) {
                //console.log(e.message)
            }
        },

        // 获取品牌菜单
        * getBrands({ payload }, { select, call, put }) {
            try {
                // 开始请求数据
                const { data } = yield call(menusService.getMenuBrand);

                // 存储数据
                if (data.code == CODE200) {
                    yield put({ type: 'saveBrand', payload: data });
                }

            } catch (e) {
                //console.log(e.message)
            }
        },

        // 获取Banggood的品牌菜单
        * getBanggoodBrands({ payload }, { select, call, put }) {
            try {
                // 开始请求数据
                const { data } = yield call(menusService.getMenuBrandByBanggood);

                // 存储数据
                if (data.code == CODE200) {
                    yield put({ type: 'saveBrand', payload: data });
                }

            } catch (e) {
                //console.log(e.message)
            }
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            /* dispatch({ type: 'getCates' });
            dispatch({ type: 'getBanggoodCates' });
            dispatch({ type: 'getBrands' }); */
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
Array.prototype.contains = function (val) {
    var len = this.length;
    while (len--) {
        if (this[len] === val) {
            return true;
        }
    }
    return false;
}
