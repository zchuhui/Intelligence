/*菜单类集合，所以菜单载入都放这里*/

import * as menusService from '../services/menus';


// 默认站点
const defautSite = ["banggood", "gearbest"];


// 默认分类
const defautCate = [
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

        saveCate(state, { payload: { data: data} }) {
            // 把数据转为想要的参数
            data = cateToMenu(data);
            return {...state, cate:data};
        },
        saveBrand(state, { payload: { data: data} }) {
            //console.log(data)
            return {...state, brand:data};
        },
    },
    effects: {
        // 获取品牌数据
        * getBrands({ payload }, { select, call, put }) {
            // 开始请求数据
            const  brand = yield call(menusService.getMenuBrand);

            // 保存数据
            if(brand.data){
                yield put({ type: 'saveBrand', payload: brand.data});

                // 获取分类数据
                const  {data}  = yield call(menusService.getMenuCate);
                if(data){
                    yield put({ type: 'saveCate', payload: data});
                }else{
                    console.log("cate menu null")
                }

            }else{
                console.log("brand menu null")
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    dispatch({ type: 'getBrands' });
                }
            })
        },
    },
};


// 用递归遍历所有参数，
// 并添加value、label值，用于插件的参数
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
        //console.log(cate[i]);
        mapCateToString(cate[i]);

        var obj = {
            value:i,
            label:i,
            children:cate[i],
        }
        arr.push(obj);
    }

    console.log(arr)
    return arr;
}