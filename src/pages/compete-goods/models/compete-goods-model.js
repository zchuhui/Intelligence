/**
 * 竞品报表 Model
 * Date: 2017-06-01
 * Author: zhuangchuhui
 */

import * as competeServices from '../../../services/service-compete-goods';
import { ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';

export default {
    namespace: 'CompeteGoods',

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
            sort: '',
            page: 1
        }
    },
    reducers: {
        // 存储列表数据
        save(state, { payload }) {
            return {...state, data:payload, loading: false };
        },
        
        // 存储最新搜索参数
        updateSearchArgs(state, { payload }) {
            return {...state, searchArgs: payload.searchArgs };
        },

        // 切换loading状态
        showLoading(state, { payload }) {
            return {...state, loading: payload.loading };
        }
    },
    effects: {

        // 搜索数据
        * search({ payload }, { select, call, put }) {

            yield put({ type: 'showLoading', payload: { loading: true } });

            // 更新参数到state,并取回来当搜索参数
            yield put({ type: 'updateSearchArgs', payload: { searchArgs: payload.searchArgs } });

            // 获取搜索条件
            const searchArgs = yield select(state => state.CompeteGoods.searchArgs);

            // 开始请求数据
            const { data } = yield call(competeServices.search, { searchArgs: searchArgs });

            yield put({ type: 'save', payload: data });

            yield put({ type: 'showLoading', payload: { loading: false } });

        },

        // 分页
        * paginationQuery({ payload }, { select, call, put }) {

            yield put({ type: 'showLoading', payload: { loading: true } });


            // 获取搜索条件
            let searchArgs = yield select(state => state.CompeteGoods.searchArgs);

            // 分页参数
            if (payload.page) {
                searchArgs.page = payload.page;
            }
            // 排序参数
            if (payload.sort) {
                searchArgs.sort = payload.sort;
            }

            // 请求数据
            const { data } = yield call(competeServices.search, { searchArgs: searchArgs });
            yield put({ type: 'save', payload: data });
            

            yield put({ type: 'showLoading', payload: { loading: false } });

        }
    },
    subscriptions: {
        
    },
};
