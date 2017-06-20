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
        value:'banggood',
        label:'banggood',
        children:[
            {
                value: "40564",
                label: "Electronics",
                parent_cid: "0",
                site: "banggood"
            },
            {
                value: "41100",
                label: "",
                parent_cid: "0",
                site: "banggood"
            },
        ]
    },
    {
        value:'gearbest',
        label:'gearbest',
        children:[
            {
                value: "1",
                label: "Toys & Hobbies",
                parent_cid: "0",
                site: "gearbest",
                children: [
                    {
                        value: "5",
                        label: "ESC",
                        parent_cid: "3",
                        site: "gearbest"
                    },
                    {
                        value: "10",
                        label: "Motor",
                        parent_cid: "3",
                        site: "gearbest"
                    },
                    {
                        value: "12",
                        label: "Flight Controller",
                        parent_cid: "3",
                        site: "gearbest"
                    },
                    {
                        value: "14",
                        label: "Charger",
                        parent_cid: "3",
                        site: "gearbest"
                    },
                ]
            },
            {
                value: "2",
                label: "Remote Control Toys",
                parent_cid: "1",
                site: "gearbest",
            },
        ]
    }
]

// 默认品牌
const defautBrand = [
    {
    bid: "2",
    bname: "HeLICMAX",
    site: "gearbest"
    },
    {
    bid: "3",
    bname: "GTeng",
    site: "gearbest"
    },
    {
    bid: "4",
    bname: "Furibee",
    site: "gearbest"
    },
    {
    bid: "5",
    bname: "Holybro",
    site: "gearbest"
    },
    {
    bid: "6",
    bname: "JJRC",
    site: "gearbest"
    },
    {
    bid: "7",
    bname: "MJX",
    site: "gearbest"
    },
    {
    bid: "8",
    bname: "Flysky",
    site: "gearbest"
    },
    {
    bid: "9",
    bname: "WLTOYS",
    site: "gearbest"
    },
    {
    bid: "10",
    bname: "SYMA",
    site: "gearbest"
    },
    {
    bid: "11",
    bname: "LENENGTOYS",
    site: "gearbest"
    },
    {
    bid: "12",
    bname: "DYS",
    site: "gearbest"
    },
]


export default {
    namespace: 'Menus',

    state: {
        site: defautSite,   // 站点列表
        cate: defautCate,   // 分类列表
        brand: defautBrand, // 品牌列表
    },
    reducers: {
        // 存储分类表
        saveCate(state, { payload: { data: data} }) {
            // 把获取数据转为组件可用的数据格式
            data = cateToMenu(data);

            console.log("分类获取完毕")
            return {...state, cate:data};
        },
        // 存储品牌表
        saveBrand(state, { payload: { data: data} }) {

            console.log("品牌表获取完毕")
            return {...state, brand:data};
        },
    },
    effects: {
        // 获取分类表
        * getCates({ payload },{ select, call, put }){

            // 获取分类数据
            const  { data }  = yield call(menusService.getMenuCate);

            // 存储数据
            if(data){
                yield put({ type: 'saveCate', payload: data});
            }else{
                console.log("cate menu null")
            }
        },

        // 获取品牌表
        * getBrands({ payload }, { select, call, put }) {

            // 开始请求数据
            const brand = yield call(menusService.getMenuBrand);

            // 存储数据
            if(brand){
                yield put({ type: 'saveBrand', payload: brand.data});
            }else{
                console.log("brand menu null")
            } 
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {

            dispatch({ type: 'getCates' });
            dispatch({ type: 'getBrands' }); 

            /*return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    dispatch({ type: 'getCates'});
                    dispatch({ type: 'getBrands'});
                }
            })*/
        },
    },
};


/**
 * 用递归遍历所有参数，
 * 并添加value、label值，用于植入插件的参数
 */
const cateToMenu = (cate) =>{
    var arr = [];

    const mapCateToString = (item) => {
        item.map((i,index) => {

            i.value = i.cid;
            i.label = i.cname; 

            if (i.children) {
                mapCateToString(i.children);
            }
        })
    };

    for(let i in cate){

        mapCateToString(cate[i]);

        var obj = {
            value:i,
            label:i,
            children:cate[i],
        }
        if (i !== "") {
            arr.push(obj);
        }
        
    }

    return arr;
}
