/**
 * BG创建关联 model
 */

import * as BgService from '../../../services/relevanceBG';


// 接口还没提供，虚拟数据
const similarGoodsList = [
    {
    tname: 'banggood',
    tkey: 0,
    children: [{
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通1',
        select: false,
    }, {
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通2',
        select: false,
    }, {
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
    }, {
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
        select: false,
    }, {
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通3',
        select: false,
    }]
}, {
    tname: 'gearbest',
    tkey: 1,
    children: [{
        cid: 1,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
        select: false,
    }, {
        cid: 2,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
        select: false,
    }, {
        cid: 3,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
        select: false,
    }, {
        cid: 4,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
        select: false,
    }, {
        cid: 5,
        img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
        sku: '56545465',
        site: '大卖通',
        select: false,
    }]
}, ];



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
            console.log('savegoodsBySite',payload)
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
                }
            } catch (e) {
                // 请求成功，关闭loading状态
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                console.log('catch:', e)
            }
        },

        // 步骤二，获取相似产品表
        * fetchSimilarGoodsList({ payload }, { select, call, put }) {

            try {
                //const { data } = yield call(BgService.fetchSimilarGoodsList, payload);
                const data = similarGoodsList;
                console.log('fetchSimilarGoodsList', data)

                // 保存数据
                if (data) {
                    yield put({ type: 'saveSimilarGoodsList', payload: data });
                }
            } catch (e) {
                console.log('catch:', e)
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
                console.log('post',data)
                // 保存数据
                if (data.status === 1) {
                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: true } });
                }else{
                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });
                }
            } catch (e) {
                console.log(e)

                // 请求数据时，显示loading状态
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({ type: 'fetchSimilarGoodsList' });
        },
    },

};
