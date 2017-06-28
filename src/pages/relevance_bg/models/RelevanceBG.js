/**
 * BG关联表model
 */

import * as BgService from '../../../services/relevanceBG';
import moment from 'moment';

// 默认抓取时间为当月
let firstDay = moment().startOf('month').format('YYYY-MM-DD');
let endDay = moment().endOf('month').format('YYYY-MM-DD');


// 虚拟数据
const similarGoodsList = [{
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
    namespace: 'RelevanceBG',

    state: {
        // 加载状态
        loading: false,
        // 列表参数
        data: {
            page: {
                page: 0,
                pageSize: 0,
                count: 0,
                pageNum: 0
            },
            list: [],
        },
        // 搜索参数
        searchArgs: {
            site: '',
            cid: '',
            bid: '',
            status: '',
            price1: '',
            price2: '',
            startTime: firstDay,
            endTime: endDay,
            sku: '',
            page: 1
        },


        /*------------------创建关联模块----------------------*/

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
        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            return {...state, data, loading: false };
        },
        // 切换loading状态
        toggleLoading(state, { payload }) {
            return {...state, loading: payload.loading };
        },
        // 更新搜索参数
        updateSearchArgs(state, { payload }) {
            return {...state, searchArgs: payload.searchArgs };
        },


        /*------------------创建关联模块----------------------*/

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
            console.log('goodsBySite',payload)
            return {...state, goodsBySite: payload };
        },
        // 保存已关联的商品
        saveRelevanceGoodsList(state, { payload }) {
            console.log('arr', payload);
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
        // 获取数据
        * fetch({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 开始请求数据
            const { data } = yield call(BgService.fetch, payload);

            // 保存数据
            if (data.status == 1) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log('载入数据失败:', data.msg)
            }
        },

        // 搜索
        * search({ payload }, { select, call, put }) {

            // 更新参数到state,并取回来当搜索参数
            yield put({ type: 'updateSearchArgs', payload: { searchArgs: payload.searchArgs } });

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 从state中获取搜索参数
            const searchArgs = yield select(state => state.RelevanceBG.searchArgs);
            searchArgs.page = payload.page;

            // 开始请求数据
            const { data } = yield call(BgService.search, { searchArgs: searchArgs });

            // 保存数据
            if (data.status == 1) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log('搜索失败:', data.msg)
            }

        },

        // 分页，根据页数获取数据
        * pagination({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 从state中获取搜索参数
            const searchArgs = yield select(state => state.RelevanceBG.searchArgs);
            searchArgs.page = payload.page;

            // 开始请求数据
            const { data } = yield call(BgService.search, { searchArgs: searchArgs });

            // 保存数据
            if (data.status == 1) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log('分页失败:', data.msg)
            }

        },

        /*------------------创建关联模块-------------------*/

        // 获取相似产品表
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

        // 获取单个商品详情
        * fetchGoodsDetailBySku({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data) {
                    // 请求成功，关闭loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });

                    yield put({ type: 'saveRelevanceGoods', payload: data });
                }
            } catch (e) {
                // 请求成功，关闭loading状态
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                console.log('catch:', e)
            }
        },

        // 获取单个商品,并选中
        * fetchGoodsBySkuAndSite({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data) {
                    console.log('site data',data)
                    yield put({ type: 'saveRelevanceGoodsBySite', payload: data });

                    /*if (data.status == 1) {
                        let list = yield select(state => state.RelevanceBG.relevanceGoodsList);
                        list.push(data.data);
                    }*/

                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });

                }
            } catch (e) {
                console.log(e)
            }
        },

        // 设置了关联的商品
        * setRelevanceGoods({ payload }, { call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {

                const { data } = yield call(BgService.setRelevanceGoods, payload);

                // 保存数据
                if (data) {
                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: true } });
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
            dispatch({ type: 'fetch', payload: { page: 1 } });
            dispatch({ type: 'fetchSimilarGoodsList' });
        },
    },

};
