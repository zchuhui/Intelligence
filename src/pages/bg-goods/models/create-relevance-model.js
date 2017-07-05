/**
 * BG创建关联 model
 */

import * as BgService from '../../../services/service-bg-goods';


// 接口还没提供，虚拟数据
const similarGoodsList = 
[
    {
    tname: 'gearbest',
    tkey: 0,
    children: [{
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/pdm-product-pic/Electronic/2017/06/24/goods-img/1498266711576411825.jpg',
        sku: '21686430',
        site: 'gearbest',
        select: false,
    },
    {
        cid: 2,
        img_url: 'https://gloimg.gearbest.com/gb/pdm-product-pic/Electronic/2017/06/24/goods-img/1498260182222254373.jpg',
        sku: '21688560',
        site: 'gearbest',
        select: false,
    }
    ]
},
{
    tname: 'dx',
    tkey: 4,
    children: [
    {
        cid: 1,
        img_url: 'http://img.dxcdn.com/productimages/sku_445370_1.jpg',
        sku: '9cfc7148f14836dfb52c1768c8a69c8d',
        site: 'dx',
        select: false,
    }
    ]
}, {
    tname: 'aliexpress',
    tkey: 1,
    children: []
},
{
    tname: 'lightinthebox',
    tkey: 3,
    children: []
}, 
{
    tname: 'amazon',
    tkey: 5,
    children: []
}, 
{
    tname: 'tomtop',
    tkey: 6,
    children: []
}, 

];



export default {
    namespace: 'createRelevanceModel',

    state: {
        // 创建关联模块的加载状态 
        createRelevanceLoading: false,
        // 步骤一单个商品
        goods: {},
        // 步骤二单个商品
        goodsBySite: {},
        // 相似的商品表
        similarGoodsList: [],
        // 选中的关联商品
        relevanceGoodsList: [],
        // 设置状态是否成功
        setRevanceStatus:false,
    },
    reducers: {

        // 保存相似的商品表
        saveSimilarGoodsList(state, { payload }) {
            return {...state, similarGoodsList: payload };
        },
        // 步骤一的保存获取的单个商品
        saveRelevanceGoods(state, { payload }) {
            return {...state, goods: payload };
        },
        // 步骤二的保存获取的单个商品，
        saveRelevanceGoodsBySite(state, { payload }) {
            return {...state, goodsBySite: payload };
        },
        // 保存已关联的商品
        saveRelevanceGoodsList(state, { payload }) {
            return {...state, relevanceGoodsList: payload };
        },
        // 切换创建模块的loading状态
        toggleCreateRelevanceLoading(state, { payload }) {
            return {...state, createRelevanceLoading: payload.loading };
        },
        // 切换设置关联模块
        toggleSetRevanceStatus(state, { payload }) {
            return {...state, setRevanceStatus: payload.status };
        },
    },
    effects: {

        // 步骤一，搜索单个商品
        * fetchGoodsDetailBySku({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data) {
                    yield put({ type: 'saveRelevanceGoods', payload: data });
                    // 请求成功，关闭loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });

                    // 请求相似数据
                   /* yield put({ type: 'fetchSimilarGoodsList'});*/

                }

            } catch (e) {
                // 请求成功，关闭loading状态
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                console.log(e)
            }
        },

        // 步骤二，获取相似产品表
        * fetchSimilarGoodsList({ payload }, { select, call, put }) {

            try {
                //const { data } = yield call(BgService.fetchSimilarGoodsList, payload);
                // 目前是虚拟数据
                const data = similarGoodsList;

                // 保存数据
                if (data) {
                    yield put({ type: 'saveSimilarGoodsList', payload: data });

                    console.log('fetchSimilarGoodsList', data)
                }
            } catch (e) {
                console.log(e)
            }
        },

        // 步骤二，手动搜索单个商品
        * fetchGoodsBySkuAndSite({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data) {

                    yield put({ type: 'saveRelevanceGoodsBySite', payload: data });
                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });

                }
            } catch (e) {
                // 请求成功，关闭loading状态
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                console.log(e)
            }
        },

        // 步骤二，设置了关联的商品
        * setRelevanceGoods({ payload }, { call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {

                const { data } = yield call(BgService.setRelevanceGoods, payload);

                // 保存数据
                if (data.code === 200) {
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: true } });
                }else{
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });
                }
            } catch (e) {

                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });

                console.log(e)
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // 载入相识商品
                if (pathname === '/create') {
                    dispatch({ type: 'fetchSimilarGoodsList' });
                }
            })
        },
    },

};
