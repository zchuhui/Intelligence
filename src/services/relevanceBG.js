import request from '../utils/request';
import { Url } from '../config/config.url';
import moment from 'moment';

// 获取BG报表数据
// page: 页数
export function fetch({ page }) {
    // 默认抓取时间为当月数据
    let firstDay = moment().startOf('month').format('YYYY-MM-DD')
    let endDay = moment().endOf('month').format('YYYY-MM-DD')

    //默认参数，并加上页数	
    const apiArgs = `com=api&t=getBgProductList&site=banggood&startTime=${firstDay}&endTime=${endDay}&page=${page}`;

    // 合成Url
    let currentUrl = `${Url}?${apiArgs}`;

    return request(currentUrl);
}


/**
 * 搜索数据
 * @param  {[type]} args [搜索参数]
 * @return {[type]}      [请求数据的集合]
 */
export function search(args) {

    const argument = args.searchArgs;

    let argumentStr = `com=api&t=getBgProductList&site=banggood`;

    // 把参数转为url格式
    for (let i in argument) {
        if (argument[i] !== '' && argument[i] !== undefined && argument[i] !== null) {
            argumentStr += `&${i}=${argument[i]}`
        }
    }

    let url = `${Url}?${argumentStr}`;

    return request(url);
}


/**
 * 获取单个商品信息
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
export function fetchGoodsDetailBySku(args) {

    let argumentStr = `com=api&t=productInfo&site=${args.site}&sku=${args.sku}`;

    let url = `${Url}?${argumentStr}`;

    return request(url);

}


/**
 * 获取相似商品列表
 * @param  {[type]} args [site,sku]
 * @return {[type]}      [data]
 */
export function fetchSimilarGoodsList(args) {

    let argumentStr = `com=api&t=productInfo&site=${args.site}&sku=${args.sku}`;

	let url = `${Url}?${argumentStr}`;

  	return request(url);

}

/**
 * 设置关联的商品
 * @param  {[type]} args [sku,list]
 * @return {[type]}      [data]
 */
export function setRelevanceGoods(args) {
	let content = JSON.stringify(args.relevanceGoodsList); 
	console.log('set',content);
    let argumentStr = `com=api&t=t=setBgToOtherRelation&sku=${args.sku}&content=${content}`;

	let url = `${Url}?${argumentStr}`;

  	return request(url);
  	
}

