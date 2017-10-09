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
    Object.assign(params,{'com':'ajax','t':'productInfo'})

    return request(Url, {
        method: 'get',
        data: params,
    });
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
    Object.assign(params,{'com':'ajax','t':'setBgToOtherRelation','sku':params.sku,'content':JSON.stringify(params.relevanceGoodsList)})
    return request(Url, {
        method: 'get',
        data: params,
    }); 
}
  
/**
 * 清除已关联的商品
 * @param  {object} args [sku,list]
 * @return {object}      [data]
 */
export function clearRelevanceGoods(params) {
  Object.assign(params,{'com':'ajax','t':'delBgToOtherRelation','sku':params.sku})
  return request(Url, {
      method: 'get',
      data: params,
  }); 
}

