/**
 * BG关联表model
 */

import * as BgService from '../../../services/relevanceBG';
import moment from 'moment';

// 默认抓取时间为当月
let firstDay = moment().startOf('month').format('YYYY-MM-DD');
let endDay = moment().endOf('month').format('YYYY-MM-DD');

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


        // 单个商品
        goods: {},

        // 关联的商品
        relevanceGoodsList: [],

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
        // 保存获取的商品
        saveRelevanceGoods(state, { payload }) {
            return {...state, goods: payload.data };
        },
        // 保存关联的商品
        saveRelevanceGoodsList(state, { payload }) {
            console.log('arr',payload);

            return {...state, relevanceGoodsList: payload };
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

        // 获取单个商品详情
        * fetchGoodsDetailBySku({ payload }, { select, call, put }) {

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data.status == 1) {
                    yield put({ type: 'saveRelevanceGoods', payload: data });
                } else {
                    console.log('获取商品失败:', data.msg)
                }
            } catch (e) {
                console.log('获取商品失败:', e.msg)
            }
        },

        // 获取单个商品,并选中
        * fetchGoodsBySkuAndSite({ payload }, { select, call, put }) {
            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);
                
                // 保存数据
                if (data.status == 1) {

                    let list = yield select(state => state.RelevanceBG.relevanceGoodsList);
                    list.push(data.data);

                    yield put({ type: 'saveRelevanceGoodsList', payload: list });
                } else {
                    console.log('获取商品失败:', data.msg)
                }
            } catch (e) {
                console.log('获取商品失败:', e)
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({ type: 'fetch', payload: { page: 1 } });
        },
    },

};
