/**
 * 商品详情模块
 * Date: 2017/8/18
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './goods-detail.less'
import moment from 'moment';
import echarts from 'echarts';
import { Button, Icon, DatePicker, Select, Tag, Cascader } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;


class GoodsDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    
    render() {

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
                        <div className={styles.clear}>
                            <div className={styles.echartBox} >
                                <div className={styles.changeAttr}>
                                    <Select className={styles.select} defaultValue="属性1" onChange={this.handleChange}>
                                        <Option value="1">属性1</Option>
                                        <Option value="2">属性2</Option>
                                        <Option value="3">属性3</Option>
                                    </Select>
                                    <Select className={styles.select} defaultValue="属性1" onChange={this.handleChange}>
                                        <Option value="1">属性1</Option>
                                        <Option value="2">属性2</Option>
                                        <Option value="3">属性3</Option>
                                    </Select>
                                    <Select className={styles.select} defaultValue="属性1" onChange={this.handleChange}>
                                        <Option value="1">属性1</Option>
                                        <Option value="2">属性2</Option>
                                        <Option value="3">属性3</Option>
                                    </Select>
                                </div>
                                <div ref="chartBG" style={{width:'100%',height:250}}></div>
                            </div>
                            <div className={styles.echartBox} >
                                <div className={styles.changeAttr}>
                                    <Select className={styles.select} defaultValue="属性1" onChange={this.handleChange}>
                                        <Option value="1">属性1</Option>
                                        <Option value="2">属性2</Option>
                                        <Option value="3">属性3</Option>
                                    </Select>
                                    <Select className={styles.select} defaultValue="属性1" onChange={this.handleChange}>
                                        <Option value="1">属性1</Option>
                                        <Option value="2">属性2</Option>
                                        <Option value="3">属性3</Option>
                                    </Select>
                                    <Select className={styles.select} defaultValue="属性1" onChange={this.handleChange}>
                                        <Option value="1">属性1</Option>
                                        <Option value="2">属性2</Option>
                                        <Option value="3">属性3</Option>
                                    </Select>
                                </div>
                                <div ref="chartCompete" style={{width:'100%',height:250}}></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
        
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    loadChart() {
        
        const chartBG = echarts.init(this.refs.chartBG),
              chartCompete = echarts.init(this.refs.chartCompete);
        
        const option = {
            title: {
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
            },
            toolbox: {
                feature: {
                }
            },
            grid: {
                top: '3%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: false,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data : ['周一','周二','周三','周四','周五','周六','周日'],
                    show: true,
                    axisLabel: {
                        show: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#acdaff'    // x轴颜色
                        }
                    }
                }
            ],
            yAxis: [
                {
                    show: true,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#acdaff'    // y轴颜色
                        }
                    }
                }
            ],
            series: [
                {
                    name: '价格',
                    type: 'line',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#acdaff',
                            show: true,
                        },
                    },
                    areaStyle: { normal: {} },
                    data:[120, 132, 101, 134, 90, 230, 210]
                }
            ]
        }

        chartBG.setOption(option);
        chartCompete.setOption(option);
    }

    componentDidMount(){
        this.loadChart();
    }

}


export default GoodsDetail;
