/**
 * 销售秘书-商品排名模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import Lazyload from 'react-lazyload';

class GoodsRank extends React.Component {

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    商品排名
                </div>
                {
                    this.props.myProductRank?
                    //this.props.myProductRank.salesRank?
                    <div className={styles.goodsRankWrap}>
                        <ul className={styles.clear}>
                            <li>
                                <h3>销量排行榜</h3>
                                {
                                    this.props.myProductRank.salesRank?
                                    this.props.myProductRank.salesRank.map((item,index) => 
                                        <div className={styles.itemPanel} key={`sales-${index}`}>
                                            <div className={styles.imgWrap}>
                                                <Link to={"/detail/"+item.sku} target="_blank">
                                                    <img src={item.img_url}/>
                                                </Link>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}><a href={item.product_url} target="_blank">{item.pname}</a></div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.sales_ins} 件</b>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                    :null
                                }
                            </li>
                            <li>
                                <h3>销售额排行榜</h3>
                                {
                                    this.props.myProductRank.payAmountRank?
                                    this.props.myProductRank.payAmountRank.map((item,index) => 
                                        <div className={styles.itemPanel} key={`saler-${index}`}>
                                            <div className={styles.imgWrap}>
                                                <Link to={"/detail/"+item.sku} target="_blank">
                                                    <img src={item.img_url}/>
                                                </Link>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}><a href={item.product_url} target="_blank">{item.pname}</a></div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.pay_amount} 美元</b>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                    :null
                                }
                            </li>
                            <li>
                                <h3>访客排行榜</h3>
                                {
                                    this.props.myProductRank.uvRank?
                                    this.props.myProductRank.uvRank.map((item,index) => 
                                        <div className={styles.itemPanel} key={`zhl-${index}`}>
                                            <div className={styles.imgWrap}>
                                                <Link to={"/detail/"+item.sku} target="_blank">
                                                    <img src={item.img_url}/>
                                                </Link>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}>
                                                    <a href={item.product_url} target="_blank">{item.pname}</a>
                                                </div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.uv_ins}</b>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                    :null
                                }
                            </li>
                        </ul>
                        {/* <ul className={styles.clear}>
                            <li>
                                <h3>当天新品销售量排行榜</h3>
                                {
                                    this.props.myProductRank.salesDailyNewRank?
                                    this.props.myProductRank.salesDailyNewRank.map((item,index) => 
                                        <div className={styles.itemPanel} key={`sales-${index}`}>
                                            <div className={styles.imgWrap}>
                                                <a href={item.product_url} target="_blank"><img src={item.img_url}/></a>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}><a href={item.product_url} target="_blank">{item.pname}</a></div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.sales_ins} 件</b>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                    :null
                                }
                            </li>
                            <li>
                                <h3>加购量排行榜</h3>
                                {
                                    this.props.myProductRank.basketRank?
                                    this.props.myProductRank.basketRank.map((item,index) => 
                                        <div className={styles.itemPanel} key={`saler-${index}`}>
                                            <div className={styles.imgWrap}>
                                                <a href={item.product_url} target="_blank"><img src={item.img_url}/></a>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}><a href={item.product_url} target="_blank">{item.pname}</a></div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.rate}件</b>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                    :null
                                }
                            </li>
                            <li>
                                <h3>收藏量排行榜</h3>
                                {
                                    this.props.myProductRank.favoritesRank?
                                    this.props.myProductRank.favoritesRank.map((item,index) => 
                                        <div className={styles.itemPanel} key={`zhl-${index}`}>
                                            <div className={styles.imgWrap}>
                                                <a href={item.product_url} target="_blank"><img src={item.img_url}/></a>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}>
                                                    <a href={item.product_url} target="_blank">{item.pname}</a>
                                                </div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.favorites_ins} </b>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                    :null
                                }
                            </li>
                        </ul> */}
                    </div>
                    :
                    <div className={styles.dataNullWrap}>木有数据 &nbsp; <Icon type="frown-o" /></div>
                }
                
            </div>
        )
    }

    // 格式化热度的显示格式
    formatTrendNumber(no){
        //if(no){
            if(no == 'hot'){
                return (<span className={styles.exponentDown}>{no}</span>)
            }
            else if(no > 0){
                return (<span className={styles.exponentTop}><Icon type="arrow-up" />{no}</span>)
            }
            else if(no < 0){
                return (<span className={styles.exponentDown}><Icon type="arrow-down" />{no}</span>)
            }
            else if(no == 0){
                return (<span className={styles.exponentZero}>{no}</span>)
            }
        //}
    }

}

export default GoodsRank;