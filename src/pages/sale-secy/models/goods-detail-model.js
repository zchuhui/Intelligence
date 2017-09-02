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
        goods:null,              // 商品详情
        runChart:null,           // runChart图
        relateInfo:null,         // 关联信息
        attrInfo:null,           // 属性集合

        compareInfoList:null,    // 表1：竞品对比
        priceList:null,          // 表2：价格汇总
    },

    reducers:{
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
            console.log('compareInfoList',compareInfoList);


            // 关联信息
             let relateInfo = payload.data.relateInfo,
                relateInfoByMenu = [],                   // 关联商品（用于菜单切换）
                relateInfoRunChart = [],                 // 图表
                relateInfoAttrInfo = [];                 // 关联商品属性

            if(relateInfo !== null){
                // 如果是数组，则去掉
                //if(attrInfo instanceof Array){return;}

                for(let i in relateInfo){
                    relateInfoByMenu.push(i);
                    relateInfoRunChart.push(relateInfo[i]);
                    
                    // 属性
                    let attrInfoItem = relateInfo[i].attrInfo;
                    if(attrInfoItem !== null){
                        // 如果是数组，则去掉
                        //if(attrInfoItem instanceof Array){return;}

                        let arr = [];
                        for(let k in attrInfoItem){
                            relateInfoAttrInfo.push(attrInfoItem[k]);
                        }
                    } 
                }

                relateInfo.relateInfoByMenu = relateInfoByMenu;
                relateInfo.relateInfoRunChart = relateInfoRunChart;
                relateInfo.relateInfoAttrInfo = relateInfoAttrInfo;

            }
            console.log('relateInfo',relateInfo);

            // 属性集合
            let attrInfo = payload.data.attrInfo,
                attrInfoList = [];
            /* if(attrInfo !== null){
                // 如果是数组，则去掉
                if(attrInfo instanceof Array){return;}

                let arr = [];

                for(let i in attrInfo){
                    var arrItem = Object.keys(attrInfo[i].values).map(function(el){
                        return attrInfo[i].values[el];
                    });

                    attrInfo[i].children = arrItem;
                    attrInfoList.push(attrInfo[i]); 
                }
            }  */


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
                item.valid = item.valid.date; 
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
                            item.key = 'child__'+index; 
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
                ...state
            }
        },
        
    },

    effects:{

        /**
         * 获取商品
         */
        * getGoodsBySku({dispatch,payload},{select,call,put}){
            const { data } = yield call(ServiceGoodsDetail.getGoodsBySku,payload.sku);
            yield put({type:'saveGoods',payload:data});
            
            // 获取价格汇总信息
            yield put({type:'getPriceListBySku',payload})
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
            console.log('payload',payload);
            const {data} = yield call(ServiceGoodsDetail.getGoodsByArguments,payload);

            if(payload.site == 'banggood'){
                yield put({type:'saveGoodsBGByArguments',payload:data});
            }
            else{
                yield put({type:'saveGoodsOtherByArguments',payload:data});
            }
            
        }

    },

    subscriptions:{
        setup({ dispatch, history }) {
        },
    }

}