/**
 * BG创建关联 model
 */

import * as BgService from '../../../services/service-bg-goods';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';


const similarGoodsListTitle=['gearbest','dx','lightinthebox','tomtop']

// 接口还没提供，虚拟数据
const defaultSimilarGoodsList = [
    {
        tname: 'gearbest',
        tkey: 0,
        children: [
        ]
    },
    {
        tname: 'dx',
        tkey: 1,
        children: []
    }, {
        tname: 'lightinthebox',
        tkey: 2,
        children: []
    },
    {
        tname: 'tomtop',
        tkey: 3,
        children: []
    },

];



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
        similarGoodsList:defaultSimilarGoodsList,

        /* similarGoodsListChildren: {
            gearbest:null,
            dx:null,
            lightinthebox:null,
            tomtop:null,
        }, */

        gearbestSimilarGoods:null,
        dxSimilarGoods:null,
        

        // 选中的关联商品
        relevanceGoodsList: [],
        // 设置状态是否成功
        setRevanceStatus: false,
    },
    reducers: {

        // 保存相似的商品表
        saveSimilarGoodsList(state, { payload:{data,title} }) {
            switch(title){
                case 'gearbest':
                    return { ...state, gearbestSimilarGoods:data};
                    break;
                case 'dx':
                    return { ...state, dxSimilarGoods:data};
                    break;
            }
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
            return { ...state, relevanceGoodsList: payload };
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

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data.code == CODE200) {
                    yield put({ type: 'saveRelevanceGoods', payload: data });
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });

                    // 请求相似数据
                    //yield put({ type: 'fetchSimilarGoodsList'});
                    
                } else {
                    message.warning(data.msg)
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                }

            } catch (e) {
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                message.error(ERRORMESSAGE);
            }
        }, 

        // 步骤二，获取相似产品表
        * fetchSimilarGoodsList({ payload }, { select, call, put }) {
            console.log('similar payload',payload);
            try {
                
                const { data } = yield call(BgService.fetchSimilarGoodsList, payload);

                // 注意！！！
                // 目前是虚拟数据
                // const data = similarGoodsList;
                

                // 保存数据
                if (data.code == CODE200) {
                    console.log('similar',data); 
                    yield put({ type: 'saveSimilarGoodsList', payload:{data:data.data,title:payload.title} });
                } else {
                    message.warning(data.msg)
                } 
             } catch (e) {
               // message.error('error',ERRORMESSAGE);
            } 
        },

        // 步骤二，手动搜索单个商品
        * fetchGoodsBySkuAndSite({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {
                const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);

                // 保存数据
                if (data.code == CODE200) {

                    yield put({ type: 'saveRelevanceGoodsBySite', payload: data });
                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });

                } else {
                    message.warning(data.msg)
                    // 请求数据时，显示loading状态
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                }
            } catch (e) {
                // 报错，关闭loading状态
                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                //message.error(ERRORMESSAGE);
            }
        },

        // 步骤二，设置了关联的商品
        * setRelevanceGoods({ payload }, { call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: true } });

            try {

                const { data } = yield call(BgService.setRelevanceGoods, payload);

                // 保存数据
                if (data.code == CODE200) {
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: true } });
                } else {
                    yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                    yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });
                    message.warning(data.msg)
                }
            } catch (e) {

                yield put({ type: 'toggleCreateRelevanceLoading', payload: { loading: false } });
                yield put({ type: 'toggleSetRevanceStatus', payload: { status: false } });

                message.error(ERRORMESSAGE);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {

                // 只识别url的create,不识别后面的参数
                pathname = pathname.split('/')[1];

                if (pathname == 'create') {
                    // 载入相识商品
                    dispatch({ type: 'fetchSimilarGoodsList',payload:{title:similarGoodsListTitle[0]}});
                    dispatch({ type: 'fetchSimilarGoodsList',payload:{title:similarGoodsListTitle[1]}});
                }
            })
        },
    },

};
