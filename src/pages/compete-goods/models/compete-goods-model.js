/**
 * 竞品报表 model
 * Date: 2017-06-01
 * Author: zhuangchuhui
 */

import * as competeServices from '../../../services/service-compete-goods';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
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
        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            return {...state, data, loading: false };
        },
        // 更新搜索参数
        updateSearchArgs(state, { payload }) {
            return {...state, searchArgs: payload.searchArgs };
        },
        // 显示loading状态
        showLoading(state, { payload }) {
            return {...state, loading: payload.loading };
        }
    },
    effects: {
        // 获取数据
        * query({ payload }, { select, call, put }) {

            yield put({ type: 'showLoading', payload: { loading: true } });

            try{

                // 开始请求数据
                const { data } = yield call(competeServices.fetch, payload);

                // 保存数据
                if (data.code == CODE200) {
                    yield put({ type: 'save', payload: data });
                }
                else{
                    message.warning(ERRORMESSAGE);
                }
            }
            catch(e){
                 message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'showLoading', payload: { loading: false } });

        },

        // 搜索
        * search({ payload }, { select, call, put }) {

            yield put({ type: 'showLoading', payload: { loading: true } });

            try{
                // 更新参数到state,并取回来当搜索参数
                yield put({ type: 'updateSearchArgs', payload: { searchArgs: payload.searchArgs } });

                // 获取搜索条件
                const searchArgs = yield select(state => state.CompeteGoods.searchArgs);

                // 开始请求数据
                const { data } = yield call(competeServices.search, { searchArgs: searchArgs });

                // 保存数据
                if (data.code == CODE200) {
                    yield put({ type: 'save', payload: data });
                }
                else{
                    message.warning(ERRORMESSAGE);
                }

            }catch(e){
                message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'showLoading', payload: { loading: false } });

        },

        // 分页
        * paginationQuery({ payload }, { select, call, put }) {

            yield put({ type: 'showLoading', payload: { loading: true } });

            try{

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

                // 开始请求数据
                const { data } = yield call(competeServices.search, { searchArgs: searchArgs });

                // 保存数据
                if (data.code == CODE200) {
                    yield put({ type: 'save', payload: data });
                }
                else{
                    message.warning(ERRORMESSAGE);
                }
            }catch(e){
                 message.warning(ERRORMESSAGE);
            }
            
            yield put({ type: 'showLoading', payload: { loading: false } });

        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // 监听url，但ulr为‘/’时，执行query
                if (pathname === '/') {
                    
                    dispatch({ type: 'query', payload: { page: 1 } });
                    // 菜单
                    dispatch({ type: 'Menus/getCates'}); 
                    dispatch({ type: 'Menus/getBrands'});
                }
            })
        },

    },

};
