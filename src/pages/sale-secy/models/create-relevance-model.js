/**
 * BG 创建关联 Model
 * Date: 2017-8-17
 * Author: zhuangchuhui
 */

import * as BgService from '../../../services/service-bg-goods';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';


export default {

	namespace: "CreateRelevanceModel",

	state: {
		// 创建关联模块的加载状态
		createRelevanceLoading: false,

		// 步骤一单个商品
		goods: {},

		// 步骤二单个商品
		goodsBySite: {},

		// 相似的商品表
		similarGoodsList: null,

		// 选中的关联商品
		relevanceGoodsList: null,

		// 设置状态是否成功
		setRevanceStatus: false
	},

	reducers: {

		/**
		 * 存储相似的商品表
		 * @param {*} state 
		 * @param {*} param1 
		 */
		saveSimilarGoodsList(state, { payload: { data } }) {

			// 处理数据
			let array = [];
			let index = 0;
			for (let label in data) {
				let obj = {};
				obj.tname = label;
				obj.tkey = index;
				obj.children = data[label];

				array.push(obj);
				index++;
			}

			return { ...state, similarGoodsList: array };
		},
		
		/**
		 * 存储获取的单个商品(步骤一)
		 * @param {*} state 
		 * @param {*} param1 
		 */
		saveRelevanceGoods(state, { payload }) {
			return { ...state, goods: payload };
		},
		
		/**
		 * 保存获取的单个商品（步骤二）
		 * @param {*} state 
		 * @param {*} param1 
		 */
		saveRelevanceGoodsBySite(state, { payload }) {
			return { ...state, goodsBySite: payload };
		},
		
		/**
		 * 存储已关联的商品（步骤二）
		 * @param {*} state 
		 * @param {*} param1 
		 */
		saveRelevanceGoodsList(state, { payload }) {
			return { ...state, relevanceGoodsList: payload.data };
		},
		
		/**
		 * 切换创建关联模块的 loading 状态
		 */
		toggleCreateRelevanceLoading(state, { payload }) {
			return { ...state, createRelevanceLoading: payload.loading };
		},
		
		/**
		 * 切换设置关联状态，成功与否
		 * @param {*} state 
		 * @param {*} param1 
		 */
		toggleSetRevanceStatus(state, { payload }) {
			return { ...state, setRevanceStatus: payload.status };
		}
		
	},

	effects: {

		/**
		 * 根据 sku 搜索单个商品(步骤一)
		 * @param {*} param0
		 * @param {*} param1
		 */
		*fetchGoodsDetailBySku({ payload }, { select, call, put }) {
			try{

				// 显示加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: true }});

				// 请求获取商品信息
				const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);
				
				if (data) {
					// 存储商品信息
					yield put({ type: "saveRelevanceGoods", payload: data });

					// 请求获取相似商品
					yield put({type: "fetchSimilarGoodsList", payload: { title: data.data.pname }});

					// 请求获取已关联的商品
					yield put({ type: "featchRevanceGoods", payload });
				}

				// 隐藏加载状态
				yield put({ type: "toggleCreateRelevanceLoading", payload: { loading: false }});
				
			}catch(e){
				// 隐藏加载状态
				yield put({ type: "toggleCreateRelevanceLoading", payload: { loading: false }});
			}
		},

		/**
		 * 获取相似商品列表（步骤二）
		 * @param {*} param0
		 * @param {*} param1
		 */
		*fetchSimilarGoodsList({ payload }, { select, call, put }) {

			// 请求获取相似商品
			const { data } = yield call(BgService.fetchSimilarGoodsList, payload);
			// 存储相似商品  
			yield put({ type: "saveSimilarGoodsList", payload: { data: data.data } });
		},

		/**
		 * 获取已关联的商品 (步骤二)
		 * @param {*} param0 
		 * @param {*} param1 
		 */
		*featchRevanceGoods({ payload }, { select, call, put }) {

			// 请求数据
			const { data } = yield call(BgService.fetchRevanceBySku, payload);
			// 存储数据
			yield put({ type: "saveRelevanceGoodsList", payload: data });
		},

		/**
		 * 手动搜索单个相似商品（步骤二）
		 * @param {*} param0 
		 * @param {*} param1 
		 */
		*fetchGoodsBySkuAndSite({ payload }, { select, call, put }) {
			try{

				// 显示加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: true } });

				// 请求获取数据
				const { data } = yield call(BgService.fetchGoodsDetailBySku, payload);
				// 存储数据
				yield put({ type: "saveRelevanceGoodsBySite", payload: data });

				// 隐藏加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: false }});
			
			}catch(e){
				// 隐藏加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: false }});
			}
		},

		/**
		 * 设置关联相似商品(步骤二)
		 * @param {*} param0 
		 * @param {*} param1 
		 */
		*setRelevanceGoods({ payload }, { call, put }) {

			try {
				// 显示加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: true }});

				// 请求设置
				const { data } = yield call(BgService.setRelevanceGoods, payload);
				// 存储设置信息
				yield put({ type: "toggleSetRevanceStatus",payload: { status: true }});

				// 隐藏加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: false }});

				// 关联成功后，自动返回BG列表
				//setTimeout(function() {window.location.href = "/bg";}, 2000);
				
			} catch (e) {
				// 存储关联失败信息
				yield put({type: "toggleSetRevanceStatus",payload: { status: false }});
				// 隐藏加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: false }});

				message.destroy();
				message.warning('关联失败');
			}
		},

		/**
		 * 清除已关联商品 (步骤二)
		 * @param {*} param0 
		 * @param {*} param1 
		 */
		*clearRelevanceGoods({ payload }, { call, put }) {

			try {
				// 显示加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: true }});

				// 请求设置
				const { data } = yield call(BgService.clearRelevanceGoods, payload);
				// 存储设置信息
				yield put({ type: "toggleSetRevanceStatus",payload: { status: true }});

				// 隐藏加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: false }});
				
			} catch (e) {
				// 存储关联失败信息
				yield put({type: "toggleSetRevanceStatus",payload: { status: false }});
				// 隐藏加载状态
				yield put({type: "toggleCreateRelevanceLoading",payload: { loading: false }});

				message.destroy();
				message.warning('关联失败');
			}
		},
		
	},

	subscriptions: {
		setup({ dispatch, history }) {
		/* return history.listen(({ pathname, query }) => {
		}); */
		}
	}
};