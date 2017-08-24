import request from "../utils/request";
import { originRequest } from "../utils/request";
import { Url } from "../config/config.url";
import DataTime from "../utils/date-time.js";


/**
 * 获取BG报表数据
 * @param {*} param0 
 */
export function fetch({ page }) {
  // 默认抓取时间为当月数据
  const firstDay = DataTime.getDataOfMonth("start");
  const endDay = DataTime.getDataOfMonth("end");

  //默认参数，并加上页数
  const url = `${Url}?com=ajax&t=getBgProductList&site=banggood&startTime=${firstDay}&endTime=${endDay}&page=${page}`;

  return request(url);
}

/**
 * 搜索数据
 * @param  {[type]} args [搜索参数]
 * @return {[type]}      [请求数据的集合]
 */
export function search(args) {
  // 获取参数
  let argument = args.searchArguments,
    url = `${Url}?com=ajax&t=getBgProductList&`; //请求url

  // 把参数转为url格式，并追加
  for (let i in argument) {
    if (
      argument[i] !== "" &&
      argument[i] !== undefined &&
      argument[i] !== null
    ) {
      url += `&${i}=${argument[i]}`;
    }
  }

  return request(url);
}

/**
 * 获取单个商品信息
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
export function fetchGoodsDetailBySku(args) {
  let url = `${Url}?com=ajax&t=productInfo&site=${args.site}&sku=${args.sku}`;

  // 这里需要返回的验证数据，用originRequest
  return originRequest(url);
}

/**
 * 获取相似商品列表
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
export function fetchSimilarGoodsList(args) {
  let url = `${Url}?com=ajax&t=getLikeProduct&title=${args.title}`;

  return request(url);
}

/**
 * 设置关联的商品
 * @param  {[type]} args [sku,list]
 * @return {[type]}      [data]
 */
export function setRelevanceGoods(args) {
  let content = JSON.stringify(args.relevanceGoodsList);

  let url = `${Url}?com=ajax&t=setBgToOtherRelation&sku=${args.sku}&content=${content}`;

  return request(url, { method: "POST" });
}

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
export function fetchGoodsEchartByPidAndTime(args) {
  let url = `${Url}?com=ajax&t=getBgProductRunChart&pid=${args.pid}&startTime=${args.startTime}&endTime=${args.endTime}`;

  return request(url);
}

/**
 * 获取对比商品数据
 * @param  {[type]} pid [商品pid]
 * @return {[type]}     [data]
 */
export function fetchGoodsContrastData(pid) {
  let url = `${Url}?com=ajax&t=getBgRelateProductComtrastInfo&pid=${pid}`;

  return request(url);
}

/**
 * 获取该商品已关联的竞品表
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
export function fetchRevanceBySku(args) {
  let url = `${Url}?com=ajax&t=getBgToOtherRelationInfo&site=${args.site}&sku=${args.sku}`;

  return request(url);
}
