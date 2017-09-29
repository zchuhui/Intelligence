/* import request from "../utils/request"; */
import request from '../utils/request-axios';
import { originRequest } from "../utils/request";
import { Url } from "../config/config.url";
import DataTime from "../utils/date-time.js";



 /**
  * 查询数据
  @param {Object}
  */
export function query(params){
  Object.assign(params,{'com':'ajax','t':'getBgProductList'})

  return request(Url, {
		method: 'get',
		data: params,
	});
}

/**
 * 获取主体商品趋势图
 * @param  {object} params [pid,startTime,endTime]
 * @return {object}        [data]
 */
export function fetchGoodsEchartByPidAndTime(params) {
    Object.assign(params,{'com':'ajax','t':'getBgProductRunChart'})

    return request(Url, {
      method: 'get',
      data: params,
    });
}

/**
 * 获取对比商品数据
 * @param  {[type]} pid [商品pid]
 * @return {[type]}     [data]
 */
export function fetchGoodsContrastData(pid) {
    const params = {'com':'ajax','t':'getBgRelateProductComtrastInfo','pid':pid};

    return request(Url, {
      method: 'get',
      data: params,
    });
}
  



/**
 * 获取单个商品信息
 * @param  {[type]} params [site,sku]
 * @return {[type]}      [data]
 */
export function fetchGoodsDetailBySku(params) {
    console.log('params:',params);
    Object.assign(params,{'com':'ajax','t':'productInfo'})

    return request(Url, {
        method: 'get',
        data: params,
    });

    // console.log('params:',params);
    // let url = `${Url}?com=ajax&t=productInfo&site=${params.site}&sku=${params.sku}`;
    
    //   // 这里需要返回的验证数据，用originRequest
    //   return originRequest(url);
}

/**
 * 获取相似商品列表
 * @param  {[type]} params [site,sku]
 * @return {[type]}      [data]
 */
export function fetchSimilarGoodsList(params) {
    Object.assign(params,{'com':'ajax','t':'getLikeProduct'})

    return request(Url, {
        method: 'get',
        data: params,
    });
  }

  /**
 * 获取该商品已关联的竞品表
 * @param  {[type]} params [site,sku]
 * @return {[type]}      [data]
 */
export function fetchRevanceBySku(params) {
    Object.assign(params,{'com':'ajax','t':'getBgToOtherRelationInfo'})
    
    return request(Url, {
        method: 'get',
        data: params,
    });
}

/**
 * 设置关联的商品
 * @param  {[type]} params [sku,list]
 * @return {[type]}      [data]
 */
export function setRelevanceGoods(params) {
    
    console.log('setRelevanceGoods params',params);

    Object.assign(params,{'com':'ajax','t':'setBgToOtherRelation','sku':params.sku,'content':JSON.stringify(params.relevanceGoodsList)})
    
    console.log('setRelevanceGoods params',params);
    return request(Url, {
        method: 'get',
        data: params,
    }); 
  }
  

/**
 * 获取单个商品信息
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
/* export function fetchGoodsDetailBySku(args) {
  let url = `${Url}?com=ajax&t=productInfo&site=${args.site}&sku=${args.sku}`;

  // 这里需要返回的验证数据，用originRequest
  return originRequest(url);
} */

/**
 * 获取相似商品列表
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
/* export function fetchSimilarGoodsList(args) {
  let url = `${Url}?com=ajax&t=getLikeProduct&title=${args.title}`;

  return request(url);
} */

/**
 * 设置关联的商品
 * @param  {[type]} args [sku,list]
 * @return {[type]}      [data]
 */
/* export function setRelevanceGoods(args) {
  let content = JSON.stringify(args.relevanceGoodsList);

  let url = `${Url}?com=ajax&t=setBgToOtherRelation&sku=${args.sku}&content=${content}`;

  return request(url, { method: "POST" });
} */

/**
 * 清除已关联的商品
 * @param  {object} args [sku,list]
 * @return {object}      [data]
 */
export function clearRelevanceGoods(args) {
  let url = `${Url}?com=ajax&t=delBgToOtherRelation&sku=${args.sku}`;

  return request(url, { method: "POST" });
}

/**
 * 获取主体商品趋势图
 * @param  {object} args [pid,startTime,endTime]
 * @return {object}      [data]
 */
/* export function fetchGoodsEchartByPidAndTime(args) {
  
  let url = `${Url}?com=ajax&t=getBgProductRunChart&pid=${args.pid}&startTime=${args.startTime}&endTime=${args.endTime}`;

  return request(url);
} */


/**
 * 获取对比商品数据
 * @param  {[type]} pid [商品pid]
 * @return {[type]}     [data]
 */
/* export function fetchGoodsContrastData(pid) {
  let url = `${Url}?com=ajax&t=getBgRelateProductComtrastInfo&pid=${pid}`;

  return request(url);
} */

/**
 * 获取该商品已关联的竞品表
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
/* export function fetchRevanceBySku(args) {
  let url = `${Url}?com=ajax&t=getBgToOtherRelationInfo&site=${args.site}&sku=${args.sku}`;

  return request(url);
}
 */