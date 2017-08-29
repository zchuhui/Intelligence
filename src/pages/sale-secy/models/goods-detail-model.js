/**
 * 商品详情Model
 * Date:2017-08-29
 * Author:zhuangchuhui
 */

import * as ServiceGoodsDetail from '../../../services/service-goods-detail';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';


export default {
    namespace: 'GoodsDetailModel',
    
    state: {
        goods:null,          // 商品详情
    },

    reducers:{
        /**
         * 存储商品信息
         */
        saveGoods(state,{ payload }){
            return {goods:payload.data}
        }
    },

    effects:{

        /**
         * 获取商品
         */
        * getGoodsBySku({dispatch,payload},{select,call,put}){

            const { data } = yield call(ServiceGoodsDetail.getGoodsBySku,payload.sku);
            
            yield put({type:'saveGoods',payload:data});

        }


    },

    subscriptions:{
        setup({ dispatch, history }) {
        },
    }

}