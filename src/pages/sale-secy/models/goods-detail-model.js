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
        goodsLoading: false,     // 初始化加载状态
        goods:null,              // 商品详情
        runChart:null,           // runChart图
        relateInfo:null,         // 关联信息
        attrInfo:null,           // 属性集合

        compareInfoList:null,    // 表1：竞品对比
        priceList:null,          // 表2：价格汇总

        chartLoading:true,       // 获取图表加载状态
        relateInfoNewChart:null, // 关联的最新表
    },

    reducers:{
        saveGoodLoading(state,{payload}){
            return {...state,goodsLoading:payload.goodsLoading}
        },
        saveGetChartLoading(state,{payload}){
            return {...state,chartLoading:payload.chartLoading}
        },

        /**
         * 存储商品信息
         */
        saveGoods(state,{ payload }){

            // 对比信息
            let compareInfo = payload.data.compareInfo,
                compareInfoList = [];
            for(let i in compareInfo){

                let obj = compareInfo[i];
                obj.name = i;
                obj.key = 'parent_'+i; 

                for(let j in obj){
                    
                    if(j == 'poa' && obj[j].length > 0){
                        obj.children = obj[j]; 
                        obj.children.map((item,index)=>{
                            item.name = `${item.attrName} - ${item.poa_sku}`;
                            item.key = Math.random(); 
                        })
                    }
                }

                compareInfoList.push(obj);
            }


            // 关联信息
            let relateInfo = payload.data.relateInfo,
                relateInfoByMenu = [],                   // 关联商品（用于菜单切换）
                relateInfoRunChart = [],                 // 图表
                relateInfoAttrInfo = [];                 // 关联商品属性

            if(relateInfo !== null){
                for(let i in relateInfo){
                    let menuItem = {'name':i,'pid':relateInfo[i].pid};
                    relateInfoByMenu.push(menuItem);
                    relateInfoRunChart.push(relateInfo[i]);
                    
                    // 属性
                    let attrInfoItem = relateInfo[i].attrInfo;
                    if(attrInfoItem !== null){
                        // attrs
                        var arrItem = Object.keys(attrInfoItem).map(function(el){
                            return attrInfoItem[el];
                        });

                        // values
                        arrItem.map((item,index) => {
                            
                            if(!item instanceof Array){

                            }else{
                                var arrItemValues = Object.keys(item.values).map(function(el){
                                    return item.values[el];
                                });
                                item.values = arrItemValues;
                            }
                        })

                        relateInfoAttrInfo.push(arrItem);
                    }

                }
                relateInfo.relateInfoByMenu = relateInfoByMenu;
                relateInfo.relateInfoRunChart = relateInfoRunChart;
                relateInfo.relateInfoAttrInfo = relateInfoAttrInfo;

            }

            // 属性集合
            let attrInfo = payload.data.attrInfo,
                attrInfoList = [];
            if(attrInfo !== null){
                // 如果是数组，则去掉
                if(attrInfo instanceof Array){
                    
                }else{
                    let arr = [];
                    for(let i in attrInfo){
                        var arrItem = Object.keys(attrInfo[i].values).map(function(el){
                            return attrInfo[i].values[el];
                        });
    
                        attrInfo[i].children = arrItem;
                        attrInfoList.push(attrInfo[i]); 
                    }
                }
            }


            return {
                ...state,
                goods: payload.data,
                compareInfoList: compareInfoList,
                relateInfo: relateInfo,
                runChart: payload.data.runChart,
                attrInfo: attrInfoList
            }
        },

        /**
         * 存储价格汇总列表
         */
        savePriceList(state,{ payload }){

            // object转成数组格式
            let data = Object.keys(payload.data).map(function(el){
                return payload.data[el];
            });

            // 添加元素
            data.map((item,index)=>{
                item.key = index; 
                item.date = item.valid.date; 
                item.is_date = item.valid.is_valid; 
            })

            return {...state,priceList:data}
        },

        /**
         * 存储某段时间内价格趋势图和对比关系
         */
        saveGoodsBGByArguments(state,{payload}){
            
            // 对比信息
            let compareInfo = payload.data.compareInfo,
                compareInfoList = [];

            for(let i in compareInfo){

                let obj = compareInfo[i];
                obj.name = i;
                obj.key = 'parent_'+i; 

                for(let j in obj){
                    if(j == 'poa' && obj[j].length > 0){
                        obj.children = obj[j]; 
                        obj.children.map((item,index)=>{
                            item.name = `${item.attrName} - ${item.poa_sku}`;
                            item.key = Math.random();
                        })
                    }
                }

                compareInfoList.push(obj);
            }

            return {
                ...state,
                compareInfoList:compareInfoList,
                runChart:payload.data.runChart,
            }
        },

        /**
         * 存储某段时间内价格趋势图和对比关系
         */
        saveGoodsOtherByArguments(state,{payload}){
            return {
                ...state,
                relateInfoNewChart:payload.data
            }
        },
        
    },

    effects:{

        /**
         * 获取商品
         */
        * getGoodsBySku({dispatch,payload},{select,call,put}){
            yield put({type:'saveGoodLoading',payload:{goodsLoading:false}});
            try{
                const { data } = yield call(ServiceGoodsDetail.getGoodsBySku,payload.sku);
                yield put({type:'saveGoods',payload:data});
    
                
                // 获取价格汇总信息
                yield put({type:'getPriceListBySku',payload})
            }catch(e){
                yield put({type:'saveGoodLoading',payload:{goodsLoading:true}});
            }

            yield put({type:'saveGoodLoading',payload:{goodsLoading:true}});
            
        },

        /**
         * 获取价格汇总列表
         */
        * getPriceListBySku({dispatch,payload},{select,call,put}){
            const { data } = yield call(ServiceGoodsDetail.getPriceListBySku,payload.sku);
            yield put({type:'savePriceList',payload:data});
        },
        
        /**
         * 获取单个商品某段时间内价格趋势图和对比关系
         */
        * getGoodsByArguments({payload},{select,call,put}){

            yield put({type:'saveGetChartLoading',payload:{chartLoading:false}});

            const {data} = yield call(ServiceGoodsDetail.getGoodsByArguments,payload);

            if(payload.site == 'banggood'){
                yield put({type:'saveGoodsBGByArguments',payload:data});
            }
            else{
                yield put({type:'saveGoodsOtherByArguments',payload:data});
            }

            yield put({type:'saveGetChartLoading',payload:{chartLoading:true}});
        }

    },

    subscriptions:{
        setup({ dispatch, history }) {
        },
    }

}