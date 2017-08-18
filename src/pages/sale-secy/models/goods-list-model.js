/**
 * BG关联表 Model
 * Date:2017-06-25
 * Author:zhuangchuhui
 */

import * as BgService from '../../../services/service-bg-goods';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import moment from 'moment';
import { message } from 'antd';

// 默认一个月时间
const firstDay = moment(new Date()).subtract(30,"days").format("YYYY-MM-DD");
const lastDay  = moment().format('YYYY-MM-DD');


export default {
    namespace: 'RelevanceBGModel',
    
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
        searchArguments: {
            site: '',
            cid: '',
            bid: '',
            status: '',
            price1: '',
            price2: '',
            startTime: firstDay,
            endTime: lastDay,
            sku: '',
            sort: '',
            page: 1
        },

        // 主商品趋势图
        goodsEchartData: {},
        goodsEchartDataLoading: false,

        // 对比商品
        goodContrastData: {},
        goodContrastDataLoading: false,

    },

    reducers: {

        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            return { ...state, data, loading: false };
        },
        // 切换loading状态
        toggleLoading(state, { payload }) {
            return { ...state, loading: payload.loading };
        },
        // 更新搜索参数
        updateSearchArgs(state, { payload }) {
            return { ...state, searchArguments: payload.searchArguments };
        },

        // 更新主商品趋势图
        updateGoodsEchartData(state, { payload }) {

            let data = payload.data.data;

            // 时间段
            let startTime = payload.startTime;
            let endTime = payload.endTime;

            // 对应echart的结构数据
            let legendData = [];
            let seriesData = [];
            let xAxisData = dataScope(startTime, endTime);

            for (let i in data) {
                let obj = data[i];
                let arrItem = {
                    name: dataToLabel(i),
                    type: 'line',
                }

                legendData.push(dataToLabel(i));


                let arrItemData = [];

                for (let k in obj) {
                    arrItemData.push((obj[k]));
                }
                arrItem.data = arrItemData;
                seriesData.push(arrItem);
            }

            const goodsEchartData = {
                legendData: legendData,
                seriesData: seriesData,
                xAxisData: xAxisData
            }


            return { ...state, goodsEchartData: goodsEchartData };
        },
        // 更新主商品趋势图载入状态
        updateGoodsEchartDataLoading(state, { payload }) {
            return { ...state, goodsEchartDataLoading: payload.goodsEchartDataLoading };
        },

        // 更新商品对比数据
        updateGoodContrastData(state, { payload }) {

            // 转化数据格式
            let data = payload.data,
                info = payload.data.info,
                relateInfo = payload.data.relateInfo,
                relateInfoArray = [];

            for (let item in relateInfo) {
                relateInfoArray.push(relateInfo[item]);
            }


            if (info && info.sevenRunChart) {
                // 载入BG趋势图
                for (let item in info.sevenRunChart) {
                    let array = [];
                    let sevenDays = [];
                    for (let item2 in info.sevenRunChart[item]) {
                        sevenDays.push(item2)
                        array.push(info.sevenRunChart[item][item2]);
                    }
                    info[item] = array;            // 数组：值
                    info['sevenDays'] = sevenDays; // 数组：日期
                }
            }

            if (relateInfoArray.sevenRunChart) {
                // 载入关联的趋势图
                for (let item in relateInfoArray.sevenRunChart) {
                    let array = [];
                    let sevenDays = [];
                    for (let item2 in relateInfoArray.sevenRunChart[item]) {
                        sevenDays.push(item2)
                        array.push(relateInfoArray.sevenRunChart[item][item2]);
                    }
                    relateInfoArray[item] = array;            // 数组：值
                    relateInfoArray['sevenDays'] = sevenDays; // 数组：日期
                }
            }


            data.info = info;
            data.relateInfo = relateInfoArray;

            return { ...state, goodContrastData: data };
        },
        // 清空商品对比数据
        clearGoodContrastData(state, { payload }) {
            return { ...state, goodContrastData: [] };
        },
        // 更新商品对比数据载入状态
        updateGoodContrastDataLoading(state, { payload }) {
            return { ...state, goodContrastDataLoading: payload.goodContrastDataLoading };
        },
    },

    effects: {
        // 获取BG列表数据
        * fetch({ dispatch,payload }, { select, call, put }) {

            yield put({ type: 'toggleLoading', payload: { loading: true } });

            try {

                // 请求数据
                const { data } = yield call(BgService.fetch, payload);
                // 存储数据
                yield put({ type: 'save', payload: data });

            } catch (e) {
                //message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'toggleLoading', payload: { loading: false } });

        },

        // BG表搜索
        * search({ payload }, { select, call, put }) {
            
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            try {
                // 更新参数到state
                yield put({ type: 'updateSearchArgs', payload: { searchArguments: payload.searchArgs } });

                // 从state中获取搜索参数
                const searchArgs = yield select(state => state.RelevanceBGModel.searchArguments);
                searchArgs.page = payload.page;
                
                // 请求数据
                const { data } = yield call(BgService.search, { searchArguments: searchArgs });

                // 存储数据
                yield put({ type: 'save', payload: data });
                
            } catch (e) {
                //message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'toggleLoading', payload: { loading: false } });
        },

        // BG表分页与排序功能
        * pagination({ payload }, { select, call, put }) {

            yield put({ type: 'toggleLoading', payload: { loading: true } });

            try {

                // 从state中获取搜索参数
                const searchArguments = yield select(state => state.RelevanceBGModel.searchArguments);

                // 分页参数
                if (payload.page) {
                    searchArguments.page = payload.page;
                }
                
                // 排序参数
                if (payload.sort) {
                    searchArguments.sort = payload.sort;
                }

                // 请求数据
                const { data } = yield call(BgService.search, { searchArguments: searchArguments });
                // 存储数据
                yield put({ type: 'save', payload: data });

                
            } catch (e) {
                //message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'toggleLoading', payload: { loading: false } });

        },

        // 获取主商品的趋势图数据
        * fetchGoodsEchartByPidAndTime({ payload }, { select, call, put }) {

            yield put({ type: 'updateGoodsEchartDataLoading', payload: { goodsEchartDataLoading: false } });

            try {

                const { data } = yield call(BgService.fetchGoodsEchartByPidAndTime, payload);
                yield put({ type: 'updateGoodsEchartData', payload: { data: data, startTime: payload.startTime, endTime: payload.endTime, } });
                yield put({ type: 'updateGoodsEchartDataLoading', payload: { goodsEchartDataLoading: true } });
                
            } catch (e) {
                //message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'updateGoodsEchartDataLoading', payload: { goodsEchartDataLoading: true } });

        },

        // 获取商品对比数据
        * fetchGoodsContrastDataByPid({ payload }, { select, call, put }) {
            
            yield put({ type: 'updateGoodContrastDataLoading', payload: { goodContrastDataLoading: false } });

            try {
                // 请求数据
                const { data } = yield call(BgService.fetchGoodsContrastData, payload.pid);
                // 存储数据
                yield put({ type: 'updateGoodContrastData', payload: data });

            } catch (e) {
                //message.warning(ERRORMESSAGE);
            }

            yield put({ type: 'updateGoodContrastDataLoading', payload: { goodContrastDataLoading: true } });
        }
        
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // 初始化首页
            //dispatch({ type: 'fetch', payload: { page: 1 } });
        },
    }
}




/**
 * 计算两个日期时间段内所有日期 
 *  
 * @param begin  开始日期 YYYY-MM-DD 
 * @param end  结束日期 
 * return 日期数组 
 */
const dataScope = (begin, end) => {
    var ab = begin.split('-');
    var ae = end.split('-');
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    var arr = [];
    for (var k = unixDb; k <= unixDe;) {
        arr.push((new Date(parseInt(k))).format());
        k = k + 24 * 60 * 60 * 1000;
    }
    return arr;
}

Date.prototype.format = function () {
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。  
    s += mouth + '-'; // 获取月份。  
    s += day; // 获取日。  
    return (s); // 返回日期。  
};


/**
 * 把数据转为汉字标识
 * @param value  原始值 
 * return 转换后的数组 
 */
const dataToLabel = (value) => {
    let label = '';
    switch (value) {
        case 'priceSet':
            label = '价格';
            break;
        case 'salesSet':
            label = '销量';
            break;
        case 'scoreSet':
            label = '评分';
            break;
        case 'reviewsSet':
            label = '评论';
            break;
        case 'questionsSet':
            label = '问答';
            break;
        case 'favoritesSet':
            label = '关注';
            break;
    }

    return label;
}