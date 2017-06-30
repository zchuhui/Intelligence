/**
 * BG关联表model
 */

import * as BgService from '../../../services/relevanceBG';
import moment from 'moment';

// 默认抓取时间为当月
const firstDay = moment().startOf('month').format('YYYY-MM-DD');
const endDay = moment().endOf('month').format('YYYY-MM-DD');

export default {
    namespace: 'RelevanceBG',

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
        searchArgs: {
            site: '',
            cid: '',
            bid: '',
            status: '',
            price1: '',
            price2: '',
            startTime: firstDay,
            endTime: endDay,
            sku: '',
            page: 1
        },
        // 主商品趋势图
        goodsEchartData:{},
        goodsEchartDataLoading:false,
    },

    reducers: {
        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            return {...state, data, loading: false };
        },
        // 切换loading状态
        toggleLoading(state, { payload }) {
            return {...state, loading: payload.loading };
        },
        // 更新搜索参数
        updateSearchArgs(state, { payload }) {
            return {...state, searchArgs: payload.searchArgs };
        },
        // 保存主商品趋势图
        updateGoodsEchartData(state, { payload }) {

           let data = payload.data.data; 

           // 时间段
           let startTime = payload.startTime;
           let endTime = payload.endTime;

           // 对应echart的结构数据
           let legendData = [];
           let seriesData = [];
           let xAxisData = dataScope(startTime,endTime);


           for (let i in data) {
               let obj = data[i]; 
               let arrItem = {
                   name: dataToLabel(i),
                   type: 'line',
               }

               legendData.push(dataToLabel(i));


               let arrItemData = [];

               for (let k in obj) {
                   arrItemData.push((obj[k]+Math.random()*1000));
               }
               arrItem.data = arrItemData;
               seriesData.push(arrItem);
           }

           const goodsEchartData = {
                legendData: legendData,
                seriesData: seriesData,
                xAxisData: xAxisData
            }


           return {...state, goodsEchartData: goodsEchartData };
        },
        // 保存主商品趋势图载入状态
        updateGoodsEchartDataLoading(state, { payload }) {
           console.log(payload.goodsEchartDataLoading)
           return {...state, goodsEchartDataLoading: payload.goodsEchartDataLoading };
        }
    },

    effects: {
        // 获取数据
        * fetch({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 开始请求数据
            const { data } = yield call(BgService.fetch, payload);

            // 保存数据
            if (data.status == 1) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log('载入数据失败:', data.msg)
            }
        },

        // 搜索
        * search({ payload }, { select, call, put }) {

            // 更新参数到state,并取回来当搜索参数
            yield put({ type: 'updateSearchArgs', payload: { searchArgs: payload.searchArgs } });

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 从state中获取搜索参数
            const searchArgs = yield select(state => state.RelevanceBG.searchArgs);
            searchArgs.page = payload.page;

            // 开始请求数据
            const { data } = yield call(BgService.search, { searchArgs: searchArgs });

            // 保存数据
            if (data.status == 1) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log('搜索失败:', data.msg)
            }
        },

        // 分页，根据页数获取数据
        * pagination({ payload }, { select, call, put }) {

            // 请求数据时，显示loading状态
            yield put({ type: 'toggleLoading', payload: { loading: true } });

            // 从state中获取搜索参数
            const searchArgs = yield select(state => state.RelevanceBG.searchArgs);
            searchArgs.page = payload.page;

            // 开始请求数据
            const { data } = yield call(BgService.search, { searchArgs: searchArgs });

            // 保存数据
            if (data.status == 1) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log('分页失败:', data.msg)
            }
        },

        // 获取主商品的趋势图数据
        * fetchGoodsEchartByPidAndTime({payload},{select,call,put}){
            try{
                yield put({type:'updateGoodsEchartDataLoading',payload:{goodsEchartDataLoading:false}});

                const {data} = yield call(BgService.fetchGoodsEchartByPidAndTime,payload);

                if (data) {
                    yield put({type:'updateGoodsEchartData',payload:{data:data,startTime:payload.startTime,endTime:payload.endTime,}});

                    yield put({type:'updateGoodsEchartDataLoading',payload:{goodsEchartDataLoading:true}});
                }
            }catch(e){
                console.log(e)
                // 请求失败
                yield put({type:'updateGoodsEchartDataLoading',payload:{goodsEchartDataLoading:true}});
            }
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({ type: 'fetch', payload: { page: 1 } });
        },
    }
}




/**
 * 计算两个日期时间段内所有日期 
 *  
 * @param value1  开始日期 YYYY-MM-DD 
 * @param value2  结束日期 
 * return 日期数组 
 */  
const dataScope = (value1, value2) => {  
    var getDate = function(str) {  
        var tempDate = new Date();  
        var list = str.split("-");  
        tempDate.setFullYear(list[0]);  
        tempDate.setMonth(list[1] - 1);  
        tempDate.setDate(list[2]);  
        return tempDate;  
    }  
    var date1 = getDate(value1);  
    var date2 = getDate(value2);  
    if (date1 > date2) {  
        var tempDate = date1;  
        date1 = date2;  
        date2 = tempDate;  
    }  
    date1.setDate(date1.getDate() + 1);  
    var dateArr = [];  
    var i = 0;  
    while (!(date1.getFullYear() == date2.getFullYear()  
            && date1.getMonth() == date2.getMonth() && date1.getDate() == date2  
            .getDate())) {  
         var dayStr =date1.getDate().toString();  
            if(dayStr.length ==1){  
                dayStr="0"+dayStr;  
            }  
        dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"  
                + dayStr;  
        i++;  
        date1.setDate(date1.getDate() + 1);  
    }  
    
    return dateArr;  
}


/**
 * 把数据转为汉字标识
 * @param value  原始值 
 * return 转换后的数组 
 */ 
const dataToLabel = (value) => {
    let label = '';
    switch(value){
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