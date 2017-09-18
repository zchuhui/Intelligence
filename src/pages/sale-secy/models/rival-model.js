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

        saveRivalData(state,{ payload }){
            return {...state, rivalData:payload.data};
        },

        saveRivalViewList(state,{ payload }){
            return {...state, rivalViewList:payload.data};
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

    },

    subscriptions:{

    }

}