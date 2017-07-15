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
		loading:false,           // 初始加载
		
		productTotal : {},       // 商品总数
		salesAmount: {},         // 销售额
		salesSum: {},            // 销量
		changeRate: {},          // 转化率
		productNew: {},          // 新品上架数
		basket: {},              // 加购量
		favorites: {},           // 收藏量
		visitor: {},             // 访客量
		pageView: {},            // 浏览量
		myProductRank:{},        // 商品排行

		cateLoading:false,       // 类目加载
		productInCate:{},        // 第一个类目 商品排行
		myProductInCate:{},      // 第一个类目 你的商品排行
		cateSet:{},              // 分类饼图
		myCateSalesFromPrice:{}, // 第一个类目 商品排行 		
		
		comparisonLoading:false, // 商品对比加载
		goodsComparisonList:null   // 商品对比信息
	},

	reducers:{
		// 存储数据
		saveSaleSecyInfo(state, { payload }) {
			return {...state,...payload};
		},

		// 存储商品对比信息
		saveGoodsComparisonList(state, { payload }) {
			return {...state, goodsComparisonList: payload.data};
		},

		// 更新初始加载状态
		updateLoading(state,{ payload }){
			return {...state, loading: payload.loading}
		},

		// 更新初始加载状态
		updateCateLoading(state,{ payload }){
			return {...state, cateLoading: payload.loading}
		},

		// 更新初始加载状态
		updateComparisonLoading(state,{ payload }){
			return {...state, comparisonLoading: payload.loading}
		},
		
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
			yield put({type:'updateCateLoading', payload:{loading:true}})
			try {
				
				const { data } = yield call(SaleSecyService.getSalesSecretaryCateInfo,payload);

				if(data.code == CODE200){
					yield put({ type:'saveSaleSecyInfo', payload:data.data});


					// 继续加载商品对比信息
					yield put({ type: 'getSalesSecretaryComparison',payload});
				}else{
					message.warning(data.msg);
				}
			} catch (error) {
				message.warning(error.message);
			}
			yield put({type:'updateCateLoading', payload:{loading:false}})
		},

		// 获取商品对比
		* getSalesSecretaryComparison({payload},{select,call,put}){

			yield put({type:'updateComparisonLoading', payload:{loading:true}})

			try {
				
				const { data } = yield call(SaleSecyService.getSalesSecretaryComparison,payload);
				console.log('comparison',data);

				if(data.code == CODE200){
					yield put({ type:'saveGoodsComparisonList', payload:data});
				}else{
					message.warning(data.msg);
				}
			} catch (error) {
				message.warning(error.message);
			}

			yield put({type:'updateComparisonLoading', payload:{loading:false}})
		},

	},

	subscriptions:{
		setup({ dispatch, history }) {
			dispatch({ type: 'getSaleSecyInfo',payload:{time:Moment().format('YYYY-MM-DD')}});
        },
	}

}