/**
 * 商品详情模块
 * Date: 2017/8/18
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './goods-detail.less'
import moment from 'moment';
import { Button, Icon, DatePicker, Select, Tag, Cascader } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;


class GoodsDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    
    render() {

        const children = [];
        for (let i = 10; i < 36; i++) {
          children.push(<Option key={i}>{'属性' + i}</Option>);
        }

        return (
            <div className={`${styles.mainWrap} ${styles.goodsDetailWrap}`}>
                <div className={styles.goodsAttribute}>
                    <div className={styles.sku}>
                        <b>SKU: 4578454</b>
                        <Button className={styles.fr}>返回</Button>
                    </div>
                    <div className={styles.clear}>
                        <div className={`${styles.fl} ${styles.image}`}>
                            <img src="http://lorempixel.com/640/480/food" />
                        </div>
                        <div className={`${styles.detailBox}`}>
                            <div className={styles.goodsTitle}>
                                <span className={styles.tips}>在售</span> 
                                <h2>Echahi Love 100 Mini Echahi Love 100 Mini Echahi Love 100 Mini .........................</h2>
                            </div>
                            <div className={styles.clear}>
                                <div className={`${styles.fl} ${styles.attrLeft}`}>
                                    <p className={styles.clear}>
                                        <span className={styles.fl}>品牌：Eachine</span>
                                        <span className={styles.fr}>上架时间：2015-5-5</span>
                                    </p>
                                    <p>分类：Toys > Hong > ....</p>
                                </div>
                                <div className={`${styles.fr} ${styles.attrRight}`}>
                                    <ul>
                                        <li>
                                            <p>当前价格：454</p>
                                            <p>加购数：1542</p>
                                        </li>
                                        <li>
                                            <p>当前价格：45432323</p>
                                            <p>加购数：1542</p>
                                        </li>
                                        <li>
                                            <p>当前价格：454</p>
                                            <p>加购数：1542323232</p>
                                        </li>
                                        <li>
                                            <p>当前价格：454</p>
                                            <p>加购数：1542</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.detailContent}>
                    <div className={styles.detailMenu}>
                        <ul>
                            <li>销售情况</li>
                            <li>运营情况</li>
                            <li>商品特征</li>
                            <li>用户特征</li>
                            <li className={styles.current}>价格对比</li>
                        </ul>
                    </div>
                    <div className={styles.content}>
                        <div>
                            <RangePicker 
                                defaultValue={[
                                    moment(new Date()).subtract(30,"days"),
                                    moment(),
                                ]} 
                                ranges={{ 
                                    '今天': [moment(), moment()],
                                    '本周': [moment(), moment().endOf('week')], 
                                    '本月': [moment(), moment().endOf('month')] 
                                }} 
                                format="YYYY-MM-DD" 
                                style={{ width:210 }}
                                allowClear={false}
                            />
                            <span className={styles.lateDate} >前天</span>
                            <span className={styles.lateDate} >最近7天</span>
                            <span className={styles.lateDate} >最近15天</span>
                            <span className={styles.lateDate} >最近30天</span>
                            <span className={styles.lateDate} >Life Time</span>
                            
                        </div>
                        <div>
                            {/* <span>选择属性：</span> */}
                            <Select
                                mode="multiple"
                                style={{ width: 510, marginTop:15 }}
                                placeholder="Please select"
                                defaultValue={['属性0']}
                                onChange={handleChange}
                            >
                                {children}
                            </Select>
                        </div>


                    </div>
                </div>
            </div>
        );

        function handleChange(value) {
            console.log(`selected ${value}`);
        }
    }


}


export default GoodsDetail;
