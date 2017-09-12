/**
 * 商品详情模块
 * Date: 2017/8/18
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './rival-new.less'
import moment from 'moment';
import echarts from 'echarts';
import { Button, DatePicker, Spin,} from 'antd';
import { Link } from 'dva/router';
import DateTime from '../../../../utils/date-time'; 

const { MonthPicker, RangePicker } = DatePicker;


class RivalNew extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            startDate: DateTime.getDateOfDays(7),
            endDate: DateTime.getDateOfDays(1),
        }
    }
    
    render() {
        
        return (
            <div className={`${styles.mainWrap} ${styles.rivalWrap}`}>
                <div className={styles.menu}>
                    <ul>
                        <li className={styles.current}>竞品新品</li>
                        <li>竞品热销</li>
                        <li>竞品波动</li>
                        <li>竞品评论</li>
                    </ul>
                </div>
                <div className={styles.content}>
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
                        
                    {/* Gearbest 模块 */}
                    <section>
                        <div className={styles.sectionHead}> 
                            <b>Gearbest</b> &nbsp; 在<span className={styles.colorOrange}>{this.state.startDate}-{this.state.startDate}</span>
                            共上新品<span className={styles.colorOrange}>999件</span>(BG上新 <span className={styles.colorOrange}>999件</span>商品)
                            
                            <Link to='view'><Button type='primary' className={styles.fr}>查看商品</Button></Link>
                        </div>
                        <div>
                            <div ref="greabestChartId" style={{display:'inline-block', width:'60%',height:250}}></div>
                            <div ref="greabestPieChartId" style={{display:'inline-block', width:'40%',height:250}}></div>
                        </div>
                    </section>
                    
                    {/* 兰亭集势 模块 */}
                    <section>
                        <div className={styles.sectionHead}> 
                            <b>兰亭集势</b> &nbsp; 在<span className={styles.colorOrange}>{this.state.startDate}-{this.state.startDate}</span>
                            共上新品<span className={styles.colorOrange}>999件</span>(BG上新 <span className={styles.colorOrange}>999件</span>商品)
                            
                            <Link to='view'><Button type='primary' className={styles.fr}>查看商品</Button></Link>
                        </div>
                        <div>
                            <div ref="ltjsChartId" style={{display:'inline-block', width:'60%',height:250}}></div>
                            <div ref="ltjsPieChartId" style={{display:'inline-block', width:'40%',height:250}}></div>
                        </div>
                    </section>

                    {/* DX 模块 */}
                    <section>
                        <div className={styles.sectionHead}> 
                            <b>DX</b> &nbsp; 在<span className={styles.colorOrange}>{this.state.startDate}-{this.state.startDate}</span>
                            共上新品<span className={styles.colorOrange}>999件</span>(BG上新 <span className={styles.colorOrange}>999件</span>商品)
                            
                            <Link to='view'><Button type='primary' className={styles.fr}>查看商品</Button></Link>
                        </div>
                        <div>
                            <div ref="dxChartId" style={{display:'inline-block', width:'60%',height:250}}></div>
                            <div ref="dxPieChartId" style={{display:'inline-block', width:'40%',height:250}}></div>
                        </div>
                    </section>

                    {/* Tom Top 模块 */}
                    <section>
                        <div className={styles.sectionHead}> 
                            <b>兰亭集势</b> &nbsp; 在<span className={styles.colorOrange}>{this.state.startDate}-{this.state.startDate}</span>
                            共上新品<span className={styles.colorOrange}>999件</span>(BG上新 <span className={styles.colorOrange}>999件</span>商品)
                            
                            <Link to='view'><Button type='primary' className={styles.fr}>查看商品</Button></Link>
                        </div>
                        <div>
                            <div ref="tomtopChartId" style={{display:'inline-block', width:'60%',height:250}}></div>
                            <div ref="tomtopPieChartId" style={{display:'inline-block', width:'40%',height:250}}></div>
                        </div>
                    </section>

                </div>
            </div>
        );
        
    }


    /**
     * 载入折线图表
     * @param {object} chartData 
     */
    loadChart(chartData,id) {

        const chartBG = echarts.init(id);
        
        const option = {
            title: {
            },
            tooltip: {
                trigger: 'axis',
                /* formatter:function(params,ticket,callback){
                    let dataIndex = params[0].dataIndex;
                    return `<div>${chartData.nameArray[dataIndex]}</div>`;
                } */
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
                right: '6%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data : chartData.data,
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
                    data:chartData.value,
                }
            ]
        }

        chartBG.setOption(option);
    }


    /**
     * 载入饼状图
     * @param {object} chartData 
     */
    loadPieChart(chartData,id){
        
        const chartId = echarts.init(id);
        let data = [];

        chartData.data.map((item,index)=>{
            let obj = {'name':item,'value':chartData.value[index]};
            data.push(obj);
        })

        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "占比：{d}%"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: false,
            },
            color:['#baebe1','#f8a942','#42a6f8','#ffe990','#ff7082'],
            /* legend: {
                show:true,
                orient: 'vertical',
                right: '3%',
                top:'3%',
                data: chartData.data
            }, */
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '50%'],
                    data:data
                }
            ]
        }

        chartId.setOption(option);
    }


    /**
     * 获取多少天前的数据
     * @param {number} days 
     */
    onLatelyDate(days){
        
        // 获取时间范围
        let yesterday = DateTime.getDateOfDays(1),                // 昨天
            latelyDay = DateTime.getDateOfDays(days);           // days天前的日期

        // 前天
        if(days == 1){
            yesterday = DateTime.getDateOfDays(2);
            latelyDay = DateTime.getDateOfDays(2);
        }
        
        // 赋值
        this.setState({
            startDate:latelyDay,
            endDate:yesterday
        });
        
         
        this.getPriceDataByDate(latelyDay,yesterday);
    }

    /**
     * 日期控件操作
     * @param {*} date 
     * @param {*} dateString 
     */
    onGetDateRange(date,dateString){
        // 获取日期并赋值到state
        let startDate = dateString[0],
            endDate   = dateString[1];
        // 赋值
        this.setState({startDate:startDate,endDate:endDate});

        
        this.getPriceDataByDate(startDate,endDate);

    }

    /**
     * 根据时间获取BG、竞品的数据
     */
    getPriceDataByDate(startDate,endDate){

        // Bg
        let paramsBg =  {  
            pid:this.props.goods.products_id,
            site:'banggood',
            startDate:startDate,
            endDate:endDate,
            optionValues:this.state.optionValuesByBg.join(',')
        },
        // 竞品
        paramsCompete =  {
            pid:this.props.goods.products_id,
            site:this.state.competeSite,
            startDate:startDate,
            endDate:endDate,
            optionValues:this.state.optionValuesByOther.join(',')
        }

        
        // 请求数据
        this.props.onGoodsOtherRunChart(paramsBg);
        this.props.onGoodsOtherRunChart(paramsCompete);

        // 载入竞品图表
        this.timeout(2000).then((value) => {
            let relateInfoNewChart = this.props.relateInfoNewChart;
            if(relateInfoNewChart !== null)
            {
                this.loadCompeteChart(this.formatChartData(relateInfoNewChart.runChart));
            }
        });

    }

    /**
     * 限制日期控件只能选今天或今天前的日期
     * @param {*} current 
     */
    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }


    /**
     * 异步定时器
     * @param {时间} ms 
     */
    timeout(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done');
        });
    }



    componentDidMount(){
        const data = {
            data:['2015-02-05','2015-02-05','2015-02-05','2015-02-05','2015-02-05','2015-02-05'],
            value:[32,12,44,33,22,2]
        }
        const pieData = {
            data:['class1','class2','class3','class4','class5'],
            value:[32,12,44,33,22]
        }


        this.loadChart(data,this.refs.greabestChartId);
        this.loadPieChart(pieData,this.refs.greabestPieChartId);

        this.loadChart(data,this.refs.ltjsChartId);
        this.loadPieChart(pieData,this.refs.ltjsPieChartId);

        this.loadChart(data,this.refs.dxChartId);
        this.loadPieChart(pieData,this.refs.dxPieChartId);

        this.loadChart(data,this.refs.tomtopChartId);
        this.loadPieChart(pieData,this.refs.tomtopPieChartId);


       
    }


    componentDidUpdate(){
        
    }



}

export default RivalNew;
