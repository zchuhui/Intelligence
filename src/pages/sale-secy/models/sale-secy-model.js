/**
 * 销售秘书 model
 */

import * as SaleSecyService from '../../../services/service-sale-secy';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';
import Moment from 'moment';


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

		myProductRank:{},        // 商品排行
		myProductInCate:{},      // 第一个类目 你的商品排行
		cateSet:{},              // 分类饼图
		myCateSalesFromPrice:{}, // 第一个类目 商品排行 		

	},

	reducers:{
		// 存储数据
		saveSaleSecyInfo(state, { payload }) {
			return {...state,...payload};
		},

		// 更新加载状态
		updateLoading(state,{ payload }){
			return {...state,loading: payload.loading}
		}
	},

	effects:{
		
		// 获取销售数据
		* getSaleSecyInfo({payload},{select,call,put}){
			
			yield put({type:'updateLoading', payload:{loading:true}})

			try {
				const { data } = yield call(SaleSecyService.getSalesSecretaryInfo,payload);

				if(data.code == CODE200){
					yield put({ type:'saveSaleSecyInfo', payload:data.data});

					
					// 继续加载排行榜数据
					yield put({ type: 'getRankAndCatetory',payload});

				}else{
					message.warning(data.msg);
				}
			} catch (error) {
				message.warning(error.message);
			}

			yield put({type:'updateLoading', payload:{loading:false}})
		},


		// 获取排行榜与类目数据
		* getRankAndCatetory({payload},{select,call,put}){
			try {
				
				const { data } = yield call(SaleSecyService.getSalesSecretaryCateInfo,payload);

				if(data.code == CODE200){
					yield put({ type:'saveSaleSecyInfo', payload:data.data});
				}else{
					message.warning(data.msg);
				}
			} catch (error) {
				message.warning(error.message);
			}
		}
	},

	subscriptions:{
		setup({ dispatch, history }) {
			dispatch({ type: 'getSaleSecyInfo',payload:{time:Moment().format('YYYY-MM-DD')}});
        },
	}

}