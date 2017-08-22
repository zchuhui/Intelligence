/**
 * 菜单集合
 * Date:2017/6/20
 * Author:zhuangchuhui
 */

import * as menusService from "../services/menus";
import { CODE200 } from "../constants/constant";


// 默认分类数据
const defautCate = [
  {
    value: "banggood",
    label: "加载中..."
  }
];

// 默认品牌
const defautBrand = [
  {
    bid: "0",
    bname: "加载中...",
    site: "加载中..."
  }
];


export default {
  namespace: "Menus",

  state: {
    cate: defautCate, // 竞品分类
    brand: defautBrand, // 品牌
    banggoodCate: defautCate, // bg 分类
  },

  reducers: {
    /**
	 * 存储分类数据
	 * @param {*} state 
	 * @param {*} param1 
	 */
    saveCate(state, { payload: { data: data } }) {
      // 把获取数据转为组件可用的数据格式
      data = cateToMenu(data);
      return { ...state, cate: data };
    },

    /**
	 * 存储 Banggood 分类数据
	 * @param {*} state 
	 * @param {*} param1 
	 */
    saveBanggoodCate(state, { payload: { data: data } }) {
      // 把获取数据转为组件可用的数据格式
      data = cateToMenu(data);
      return { ...state, banggoodCate: data };
    },

    /**
	 * 存储品牌数据
	 * @param {*} state 
	 * @param {*} param1 
	 */
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
    /**
     * 获取竞品分类数据
     * @param {*} param0 
     * @param {*} param1 
     */
    *getCates({ payload }, { select, call, put }) {
      try{
        const { data } = yield call(menusService.getMenuCate);

        if (data.code == CODE200) {
          yield put({ type: "saveCate", payload: data });
        }
      }catch(e){}
    },

    /**
     * 获取 Bangood 分类数据
     * @param {*} param0 
     * @param {*} param1 
     */
    *getBanggoodCates({ payload }, { select, call, put }) {
        try{
          
          const { data, code } = yield call(menusService.getMenuCateByBanggood);

          if (data.code == CODE200) {
              yield put({ type: "saveBanggoodCate", payload: data });
          }
        }catch(e){ }
    },

    /**
	 * 获取品牌数据
	 * @param {*} param0 
	 * @param {*} param1 
	 */
    *getBrands({ payload }, { select, call, put }) {
      try{
        const { data } = yield call(menusService.getMenuBrand);

        if (data.code == CODE200) {
          yield put({ type: "saveBrand", payload: data });
        }
      }catch(e){}
    },

    /**
	 * 获取 Banggood 品牌数据
	 * @param {*} param0 
	 * @param {*} param1 
	 */
    *getBanggoodBrands({ payload }, { select, call, put }) {
      try{
          // 开始请求数据
          const { data } = yield call(menusService.getMenuBrandByBanggood);
          
          // 存储数据
          if (data.code == CODE200) {
              yield put({ type: "saveBrand", payload: data });
          }
      }catch(e){}
    }
  },

  subscriptions: {
  }
};






/**
 * 用递归遍历所有参数，
 * 并添加value、label值，用于植入插件的参数
 */
const cateToMenu = cate => {
  var arr = [];

  const mapCateToString = item => {
    item.map((i, index) => {
      i.value = i.cid;
      i.label = i.cname;

      if (i.children) {
        mapCateToString(i.children);
      }
    });
  };

  for (let i in cate) {
    mapCateToString(cate[i]);

    var obj = {
      value: i,
      label: i,
      children: cate[i]
    };
    if (i !== "") {
      arr.push(obj);
    }
  }

  return arr;
};


/**
 * 数组操作：判断元素是否在素组里面
 * @param  {[type]} val [元素1]
 * @return {[type]}     [description]
 */
Array.prototype.contains = function(val) {
  var len = this.length;
  while (len--) {
    if (this[len] === val) {
      return true;
    }
  }
  return false;
};
