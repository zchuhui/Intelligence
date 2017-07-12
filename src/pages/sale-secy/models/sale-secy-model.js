/**
 * 销售秘书 model
 */

import * as SaleSecyService from '../../../services/service-sale-secy';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';


export default {
	namespace:'SaleSecyModel',

	state:{
		loading:false,
		
		productTotal : {},       //商品总数
		salesAmount: {},         //销售额
		salesSum: {},            //销量
		changeRate: {},          //转化率
		productNew: {},          //新品上架数
		basket: {},              //加购量
		favorites: {},           //收藏量
		visitor: {},             //访客量
		pageView: {},            //浏览量
	},

	reducers:{
		saveSaleSecyInfo(state, { payload }) {
			return {...state,...payload};
		}
	},

	effects:{
		
		* getSaleSecyInfo({payload},{select,call,put}){
			try {
				
				const { data } = yield call(SaleSecyService.getSalesSecyInfo,payload);

				if(data.code == CODE200){
					console.log(data);
					yield put({ type:'saveSaleSecyInfo', payload:data.data});
				}else{
					message.warning(data.msg);
				}
			} catch (error) {
				console.log(error.message);
				message.warning(error.message);
			}
		}
	},

	subscriptions:{
		setup({ dispatch, history }) {
			dispatch({ type: 'getSaleSecyInfo',payload:{date:'2017-07-12'}});
        },
	}

}