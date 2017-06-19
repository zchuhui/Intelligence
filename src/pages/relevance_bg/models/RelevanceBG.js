/**
 * BG关联表model
 */

import * as BgService from '../../../services/relevanceBG';

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
            startTime: '',
            endTime: '',
            sku: '',
            page: 1
        }
    },
    reducers: {
        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            return {...state, data, loading: false };
        },
        // 切换loading状态
        toggleLoading(state, { payload }) {
            return {...state, loading: payload.loading };
        }
    },
    effects: {
        // 获取数据
        * fetch({ payload }, { select, call, put }) {
            
            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 开始请求数据
            const { data } = yield call(BgService.fetch, payload);

            // 保存数据
            if (data) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log("data null")
            }
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
             dispatch({ type: 'fetch', payload: { page: 1 } });
        },

    },

};
