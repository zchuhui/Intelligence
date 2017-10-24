/**
 * 竞品 Model
 * Date:2017-09-13
 * Author:zhuangchuhui
 */

import * as ServiceRival from '../../../services/service-rival';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';

export default {
    namespace: 'RivalModel',
    
    state: {
        loading:true,
        rivalData:null,

        rivalViewLoading:true,
        rivalViewList:null,

        relatedLoading:false,     // 关联加载
        relatedStatus:0,       // 关联状态

        stockLoading:false,      // 采购加载
        stockStatus:false,       // 采购状态
    },

    reducers:{
        // 更新初始加载状态
		updateLoading(state,{ payload }){
			return {...state, loading: payload.loading}
        },
        // 更新初始加载状态
		updateRivalViewLoading(state,{ payload }){
			return {...state, rivalViewLoading: payload.loading}
        },

        // 存储图表数据
        saveRivalData(state,{ payload }){
            return {...state, rivalData:payload};
        },
        // 存储列表数据
        saveRivalViewList(state,{ payload }){
            return {...state, rivalViewList:payload};
        },

        // 更新关联的加载状态
        updateRelatedLoading(state,{payload}){
            return {...state,relatedLoading:payload}
        },

        // 更新关联状态
        updateRelatedStatus(state,{payload}){
            return {...state,relatedStatus:payload}
        },

        // 更新采购加载状态
        updateStockLoading(state,{payload}){
            return {...state, stockLoading:payload}
        },

        // 更新采购状态
        updateStockStatus(state,{payload}){
            return {...state, stockStatus:payload}
        },

    },

    effects:{
        // 获取竞品图表数据
		* getRivalDataByDate({payload},{select,call,put}){
			try{
                // 清空数据
                yield put({ type:'saveRivalData', payload:{data:null}});

				yield put({type:'updateLoading', payload:{loading:true}})
                
				// 请求获取数据
                const { data } = yield call(ServiceRival.getRivalDataByDate,payload);
                
				if(data){
                    yield put({ type:'saveRivalData', payload:data});
				}
				
				yield put({type:'updateLoading', payload:{loading:false}})

			}catch(e){
				yield put({type:'updateLoading', payload:{loading:false}})
			}
        },
    
        // 获取竞品列表数据
		* getRivalDataByParams({payload},{select,call,put}){
            // 清除关联、采购状态
            yield put({ type:'updateRelatedStatus', payload:0});
            yield put({ type:'updateStockStatus', payload:false});

            try{
                // 先清空数据
                yield put({ type:'saveRivalViewList', payload:{data:null}});
                
                yield put({type:'updateRivalViewLoading', payload:{loading:true}})
                
                // 请求获取数据
                const { data } = yield call(ServiceRival.getRivalDataByParams,payload);
                
                if(data){
                    yield put({ type:'saveRivalViewList', payload:data});
                }
                yield put({type:'updateRivalViewLoading', payload:{loading:false}})
            
            }catch(e){
                yield put({type:'updateRivalViewLoading', payload:{loading:false}})

                message.destroy();
                message.warning(ERRORMESSAGE);
            }
        },

        // 关联商品
		* setRelatedBgBySku({payload},{select,call,put}){

            yield put({ type:'updateRelatedLoading', payload:true});

            const {data, code, msg} = yield call(ServiceRival.setRelatedBgBySku,payload);
            
            if(code == CODE200){
                message.success(msg)
                yield put({ type:'updateRelatedStatus', payload:1});
            }else{
                yield put({ type:'updateRelatedStatus', payload:2});
            }
            yield put({ type:'updateRelatedLoading', payload:false});
        },

        // 商品采购
		* setStock({payload},{select,call,put}){
            
            yield put({ type:'updateStockLoading', payload:true});

            // 请求获取数据
            const {data, code, msg} = yield call(ServiceRival.addPurchaseProducts,payload);
            //console.log(data,code,msg);

            if(code == CODE200){
                message.success(msg)
                yield put({ type:'updateStockStatus', payload:true});
            }else{
                yield put({ type:'updateStockStatus', payload:false});
            }
            
            yield put({ type:'updateStockLoading', payload:false});
        },
        /* // 
		* setStockStatus({payload},{select,call,put}){
            yield put({ type:'updateStockStatus', payload:false});
        }
 */
    },

    subscriptions:{

    }

}