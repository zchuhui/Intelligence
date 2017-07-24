/**
 * BG创建关联 model
 */

import * as BgService from '../../../services/service-bg-goods';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';


export default {
    namespace: 'CreateRelevanceModel',

    state: {
        // 创建关联模块的加载状态 
        createRelevanceLoading: false,
        // 步骤一单个商品
        goods: {},
        // 步骤二单个商品
        goodsBySite: {},
        
        // 相似的商品表
        similarGoodsList:null,
        
        // 选中的关联商品
        relevanceGoodsList: null,
        // 设置状态是否成功
        setRevanceStatus: false,
    },
    reducers: {

        // 保存相似的商品表
        saveSimilarGoodsList(state, { payload:{data} }) {

            let array = []; 
            let index = 0;
            for(let label in data){
                let obj = {};
                obj.tname = label;
                obj.tkey = index;
                obj.children = data[label];

                array.push(obj);
                index ++;
            }
            
            return { ...state, similarGoodsList:array};


        },
        // 步骤一的保存获取的单个商品
        saveRelevanceGoods(state, { payload }) {
            return { ...state, goods: payload };
        },
        // 步骤二的保存获取的单个商品，
        saveRelevanceGoodsBySite(state, { payload }) {
            return { ...state, goodsBySite: payload };
        },
        // 保存已关联的商品
        saveRelevanceGoodsList(state, { payload }) {
            return { ...state, relevanceGoodsList: payload.data };
        },
        // 切换创建模块的loading状态
        toggleCreateRelevanceLoading(state, { payload }) {
            return { ...state, createRelevanceLoading: payload.loading };
        },
        // 切换设置关联模块
        toggleSetRevanceStatus(state, { payload }) {
            return { ...state, setRevanceStatus: payload.status };
        },
    },
    effects: {

        // 步骤一，搜索单个商品
        * fetchGoodsDetailBySku({ payload }, { select, call, put }) {

            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {

                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);
                yield put({ type: 'saveRelevanceGoods', payload: data });
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                
                // 获取相似商品数据表
                yield put({ type: 'fetchSimilarGoodsList',payload:{title:data.data.pname}});
                // 请求已关联的商品
                yield put({ type: 'featchRevanceGoods',payload});
                
            } catch (e) {
                message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
        }, 

        // 步骤二，获取相似产品表
        * fetchSimilarGoodsList({ payload }, { select, call, put }) {

            try {

                const { data } = yield call(BgService.fetchSimilarGoodsList, payload);
                yield put({ type: 'saveSimilarGoodsList', payload: { data: data.data, } });

            } catch (e) {
                // message.error('error',ERRORMESSAGE);
            }
        },

        // 步骤二，手动搜索单个商品
        * fetchGoodsBySkuAndSite({ payload }, { select, call, put }) {

            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {

                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);
                yield put({ type: 'saveRelevanceGoodsBySite', payload: data });

            } catch (e) {
            }

            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
        },

        // 步骤二，设置了关联的商品
        * setRelevanceGoods({ payload }, { call, put }) {

            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {

                const { data } = yield call(BgService.setRelevanceGoods, payload);
                yield put({ type: 'toggleSetRevanceStatus', payload: { status: true } });

            } catch (e) {
                yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });
                message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
        },

        // 步骤二，获取已关联的竞品信息
        * featchRevanceGoods({ payload }, { select, call, put }) {

            try {
                const { data } = yield call(BgService.fetchRevanceBySku, payload);

                // 保存数据
                if (data.code == CODE200) {
                    yield put({ type: 'saveRelevanceGoodsList', payload: data });
                } 

            } catch (e) {
            }
        }, 

        
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // 只识别url的create,不识别后面的参数
                /* pathname = pathname.split('/')[1];

                if (pathname == 'create') {
                } */
            })
        },
    },

};
