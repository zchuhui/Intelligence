/**
 * 商品详情模块
 * Date: 2017/8/18
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './goods-detail.less'
import moment from 'moment';
import echarts from 'echarts';
import { Button, Icon, DatePicker, Select, Tag, Cascader, Table} from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;


class GoodsDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }
    
    render() {

        const columns = [
            { title: '平台', dataIndex: 'name', key: 'name' },
            { title: '价格', dataIndex: 'age', key: 'age' },
            { title: '销量', dataIndex: 'address', key: 'address' },
            { title: '关注数', dataIndex: 'fanCount', key: 'fanCount' },
            { title: '提问数', dataIndex: 'questionCount', key: 'questionCount' },
        ];

        const columnsPrice = [
            { title: '', dataIndex: 'name', key: 'name' },
            { title: '有效时间', dataIndex: 'age', key: 'Time' },
            { title: '优先级', dataIndex: 'address', key: 'priority' },
            { title: '中仓', dataIndex: 'fanCount', key: 'chinaStoreHouse' },
            { title: 'HK仓', dataIndex: 'fanCount', key: 'HKStoreHouse' },
            { title: '美仓', dataIndex: 'fanCount', key: 'AmericaStoreHouse' },
            { title: '英仓', dataIndex: 'fanCount', key: 'EnglishStoreHouse' },
            { title: '欧仓', dataIndex: 'fanCount', key: 'EuropeStoreHouse' },
        ];
        
        const data = [
            { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',fanCount:332,questionCount:10, description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
            { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',fanCount:3332,questionCount:10, description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
            { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park',fanCount:32,questionCount:100, description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
        ];

        return (
            <div className={`${styles.mainWrap} ${styles.goodsDetailWrap}`}>
                <div className={styles.goodsAttribute}>
                    <div className={styles.sku}>
                        <b>SKU: {this.props.sku}</b>
                        <Button className={styles.fr}>返回</Button>
                    </div>
                    {
                        this.props.goods?
                        <div className={styles.clear}>
                            <div className={`${styles.fl} ${styles.image}`}>
                                <img src={this.props.goods.products_image} />
                            </div>
                            <div className={`${styles.detailBox}`}>
                                <div className={styles.goodsTitle}>
                                    <span className={styles.tips}>{ this.getProductsStatus(this.props.goods.products_status) }</span> 
                                    <h2>{this.props.goods.products_name}</h2>
                                </div>
                                <div className={styles.clear}>
                                    <div className={`${styles.fl} ${styles.attrLeft}`}>
                                        <p className={styles.clear}>
                                            <span className={styles.fl}>品牌：{this.props.goods.brand}</span>
                                            <span className={styles.fr}>上架时间：{this.props.goods.products_date_added}</span>
                                        </p>
                                        <p>分类：{this.props.goods.cateName }</p>
                                    </div>
                                    <div className={`${styles.fr} ${styles.attrRight}`}>
                                        <ul>
                                            <li>
                                                <p>当前价格：{this.props.goods.finalPrice }</p>
                                                <p>加购数：{this.props.goods.basket }</p>
                                            </li>
                                            <li>
                                                <p>平均转化率：{this.props.goods.changeRate }</p>
                                                <p>关注数：{this.props.goods.favorites }</p>
                                            </li>
                                            <li>
                                                <p>毛利率：{this.props.goods.maoriRate }</p>
                                                <p>评论数：{this.props.goods.reviews }</p>
                                            </li>
                                            <li>
                                                <p>库存：{this.props.goods.stocks }</p>
                                                <p>提问数：{this.props.goods.questions }</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div> not data </div>
                    }
                    
                </div>

                <div className={styles.detailContent}>
                    {/* 菜单 star */}
                    <div className={styles.detailMenu}>
                        <ul>
                            <li>销售情况</li>
                            <li>运营情况</li>
                            <li>商品特征</li>
                            <li>用户特征</li>
                            <li className={styles.current}>价格对比</li>
                        </ul>
                    </div>
                    {/* 菜单 end */}
                    

                    <div className={styles.content}>

                        {/* 图表对比 start */}
                        <section>
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
                        </section>
                        {/* 图表对比 end */}

                        {/* 竞品对比 start */}
                        <section className={styles.sectionTable}>
                            <div className={styles.title}>竞品对比</div>
                            <div className={styles.tableWrap}>
                                <Table
                                    columns={columns}
                                    expandedRowRender={record => <p>{record.description}</p>}
                                    dataSource={data}
                                />
                            </div>
                        </section>
                        {/* 竞品对比 end */}

                        {/* 价格汇总 start */}
                        <section className={styles.sectionTable}>
                            <div className={styles.title}>价格汇总</div>
                            <div className={styles.tableWrap}>
                                <Table
                                    columns={columnsPrice}
                                    expandedRowRender={record => <p>{record.description}</p>}
                                    dataSource={data}
                                />
                            </div>
                        </section>
                        {/* 价格汇总 end */}

                    </div>
                </div>
            </div>
        );
        
    }

    /**
     * 格式化商品出售状态
     * @param {number} status 
     */
    getProductsStatus(status){
        switch(status){
            case "0" :
                return '停售';
                break;
            case "1" :
                return '在售';
                break;
            case "2" :
                return '下架';
                break;
            default:
                return '未知'
        }
    }


    handleChange(value) {
        console.log(`selected ${value}`);
    }

    
    loadChart(chartData) {

        const chartBG = echarts.init(this.refs.chartBG),
              chartCompete = echarts.init(this.refs.chartCompete);
        
        const option = {
            title: {
            },
            tooltip: {
                trigger: 'axis',
                formatter:function(params,ticket,callback){
                    let dataIndex = params[0].dataIndex;
                    return `<div>${chartData.nameArray[dataIndex]}</div>`;
                }
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
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data : chartData.dateArray,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#666'   // 字体颜色
                        }
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
                        textStyle: {
                            color: '#666'       // 字体颜色
                        }
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
                    data:chartData.priceArray,
                }
            ]
        }

        chartBG.setOption(option);
        chartCompete.setOption(option);
    }


    formatChartData(chartData){
        let dateArray  = [],
            priceArray = [],
            nameArray  = [];

        if(chartData.priceSet){
            for(let i in chartData.priceSet){
                for(let item in chartData.priceSet[i]){
                   switch(item){
                        case 'price':
                            priceArray.push(chartData.priceSet[i][item]);
                            break;
                        case 'name':
                            nameArray.push(chartData.priceSet[i][item]);
                            break;
                        case 'date':
                            dateArray.push(chartData.priceSet[i][item]);
                            break;
                    }

                }

            }
        }

        return {
            dateArray: dateArray,
            priceArray: priceArray,
            nameArray: nameArray
        }
    }


    componentDidMount(){
        
    }


    componentDidUpdate(){
        if(this.props.goods.runChart){
            this.loadChart(this.formatChartData(this.props.goods.runChart));
        }
    }

}


export default GoodsDetail;
