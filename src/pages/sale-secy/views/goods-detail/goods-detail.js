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
import { Link } from 'dva/router';
import DateTime from '../../../../utils/date-time'; 

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;


class GoodsDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            startDate: DateTime.getDateOfDays(30),
            endDate: DateTime.getDateOfDays(1),
            competeSite: 'banggood',
            optionValuesByBg:[],
            optionValuesByOther:[],
        }
    }
    
    render() {
        
        const columns = [
            { title: '平台', dataIndex: 'name', key: 'name',width:'20%'},
            { title: '价格', dataIndex: 'price', key: 'price' },
            { title: '销量', dataIndex: 'sales', key: 'sales' },
            { title: '关注数', dataIndex: 'favorites', key: 'favorites' },
            { title: '提问数', dataIndex: 'questions', key: 'questions' },
        ];

        const columnsPrice = [
            { title: '', dataIndex: 'name', key: 'name' },
            { title: '有效时间', dataIndex: 'valid', key: 'valid' },
            { title: '优先级', dataIndex: 'level', key: 'level' },
            { title: '中仓', dataIndex: 'price', key: 'price' },
            { title: 'HK仓', dataIndex: 'hk_price', key: 'hk' },
            { title: '美仓', dataIndex: 'usa_price', key: 'usa_price' },
            { title: '英仓', dataIndex: 'uk_price', key: 'uk' },
            { title: '欧仓', dataIndex: 'au_price', key: 'au' },
            { title: '法仓', dataIndex: 'fr_price', key: 'fr' },
            { title: '德仓', dataIndex: 'de_price', key: 'de' },
        ];
        
        return (
            <div className={`${styles.mainWrap} ${styles.goodsDetailWrap}`}>
                <div className={styles.goodsAttribute}>
                    <div className={styles.sku}>
                        <b>SKU: {this.props.sku}</b>
                        <Link to='/goods'><Button className={styles.fr}>返回</Button></Link>
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
                        :null
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
                                    value={[
                                        moment(this.state.startDate),
                                        moment(this.state.endDate)
                                    ]}
                                    ranges={{ 
                                        '今天': [moment(), moment()],
                                        '本周': [moment(), moment().endOf('week')], 
                                        '本月': [moment(), moment().endOf('month')] 
                                    }} 
                                    format="YYYY-MM-DD" 
                                    style={{ width:210 }}
                                    allowClear={false}
                                    disabledDate = {this.disabledDate}
                                    onChange={ this.onGetDateRange.bind(this) }
                                />
                                <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,1)}>前天</span>
                                <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,7)}>最近7天</span>
                                <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,15)}>最近15天</span>
                                <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,30)}>最近30天</span>
                                
                            </div>
                            <div className={styles.clear}>
                                <div className={styles.echartBox} >
                                    <div className={styles.changeAttr}>
                                        {
                                            this.props.attrInfo?
                                            this.props.attrInfo.map((item,index)=>{
                                                return <Select className={styles.select} key={item.option_id} defaultValue={item.name}  onChange={this.handleChangeByBG.bind(this)}>
                                                    {
                                                        item.children.map((item2,index2)=>{
                                                            return <Option value={item2.options_values_id}>{item2.value_name}</Option>
                                                        })
                                                    }
                                                </Select>
                                            })
                                            :null
                                        }

                                        {
                                            this.props.goods?
                                            <Button onClick={
                                                this.onGoodsOtherRunChart.bind(this,
                                                {
                                                    pid:this.props.goods.products_id,
                                                    site:'banggood',
                                                    startDate:this.state.startDate,
                                                    endDate:this.state.endDate,
                                                    optionValues:this.state.optionValuesByBg.join(',')
                                                    
                                                })}>确定</Button>
                                            :null
                                        }
                                        
                                    </div>
                                    <div ref="chartBG" style={{width:'100%',height:250}}></div>
                                </div>
                                <div className={styles.echartBox} >
                                    <div className={styles.changeAttr}>
                                       {
                                            this.props.relateInfo?
                                            <div>
                                                <Select className={styles.select} style={{width:100}}  defaultValue={this.props.relateInfo.relateInfoByMenu[0]} onChange={this.onChangeRelateInfo.bind(this)}>
                                                    {
                                                        this.props.relateInfo.relateInfoByMenu.map((item,index)=>{
                                                            return <Option value={index} key={`relate_${index}`}>{item}</Option>
                                                        })
                                                    }
                                                </Select>

                                               {
                                                 this.loadAttrInfo(this.props.relateInfo.relateInfoAttrInfo[0])
                                               }
                                               
                                               {
                                                this.props.goods?
                                                <Button onClick={
                                                    this.onGoodsOtherRunChart.bind(this,{
                                                    pid:this.props.goods.products_id,
                                                    site:this.state.competeSite,
                                                    startDate:this.state.startDate,
                                                    endDate:this.state.endDate,
                                                    optionValues:this.state.optionValuesByOther.join(',')
                                                })}>确定</Button>
                                                :null
                                               }
                                            </div>
                                            :null
                                        }
                                        
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
                                    dataSource={this.props.compareInfoList}
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
                                    dataSource={this.props.priceList} 
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

    /**
     * 载入图表
     * @param {object} chartData 
     */
    loadChart(chartData) {

        const chartBG = echarts.init(this.refs.chartBG);
        
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
    }

    /**
     * 载入图表
     * @param {object} chartData 
     */
    loadCompeteChart(chartData) {
        
        const chartCompete = echarts.init(this.refs.chartCompete);
        
        const optionCompete = {
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

        chartCompete.setOption(optionCompete);
    }

    /**
     * 关联商品切换
     * @param {number} value 
     */
    onChangeRelateInfo(value){
        // 图表
        this.loadCompeteChart(this.formatChartData(this.props.relateInfo.relateInfoRunChart[value].runChart));
        
        // 属性
        this.loadAttrInfo(this.props.relateInfo.relateInfoAttrInfo[value]);
        
        this.setState({
            competeSite:this.props.relateInfo.relateInfoByMenu[value],
        })
    }

    /**
     * 格式化图表数据
     * @param {object} chartData 
     */
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

    /**
     * 获取多少天前的数据
     * @param {number} days 
     */
    onLatelyDate(days){

        // 获取时间范围
        let yesterday = DateTime.getDateOfDays(1),                // 昨天
            latelyDay = DateTime.getDateOfDays(days+1);           // days天前的日期

        // 前天
        if(days == 1){
            yesterday = DateTime.getDateOfDays(2);
            latelyDay = DateTime.getDateOfDays(2);
        }
        
        // 赋值
        this.setState({
            startDate:latelyDay,
            endDate:yesterday
        })
    }

    /**
     * 日期控件操作
     * @param {*} date 
     * @param {*} dateString 
     */
    onGetDateRange(date,dateString){
        let startDate = dateString[0],
            endDate   = dateString[1];
        
        // 赋值
        this.setState({
            startDate:startDate,
            endDate:endDate
        })
    }

    /**
     * 限制日期控件只能选今天或今天前的日期
     * @param {*} current 
     */
    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }

    /**
     * 在数关联商品的属性
     * @param {object} attrInfo 
     */
    loadAttrInfo(attrInfo){
        return (
                <span>
                {
                    attrInfo.values?
                    <Select className={styles.select} key={attrInfo.option_id} defaultValue={attrInfo.name} onChange={this.handleChangeByOther.bind(this)}>
                        {
                            attrInfo.values.map((item2,index2)=>{
                                return <Option value={item2.options_values_id} key={`ky_${index2}`}>{item2.value_name}</Option>
                            })
                        }
                    </Select>
                    :null
                }
                </span>
        )
    }

    
    handleChangeByBG(value) {
        
        let optionValues = this.state.optionValuesByBg;

        if(!optionValues.contains(value)){
            optionValues.push(value);
            this.setState({
                optionValuesByBg:optionValues,
            });
            console.log(optionValues);
        }
    }
    
    handleChangeByOther(value) {
        let optionValues = this.state.optionValuesByOther;
        
        if(!optionValues.contains(value)){
            optionValues.push(value);
            this.setState({
                optionValuesByOther:optionValues,
            });
            console.log(optionValues);
        }
    }

    /**
     * 根据参数请求最新数据
     * @param {object} params 
     */
    onGoodsOtherRunChart(params){
        this.props.onGoodsOtherRunChart(params);
    }

    componentDidMount(){
        //console.log('compareInfoList',this.props.compareInfoList);
    }


    componentDidUpdate(){
        console.log(this.props.runChart);
        if(this.props.runChart){
            this.loadChart(this.formatChartData(this.props.runChart));
            this.loadCompeteChart(this.formatChartData(this.props.relateInfo.relateInfoRunChart[0].runChart));
        }
    }

}


export default GoodsDetail;
