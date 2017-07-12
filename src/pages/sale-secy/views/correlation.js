/**
 * 销售秘书-对比关系模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon } from 'antd';
import echarts from 'echarts';


class Correlation extends React.Component {

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    对比关系
                </div>
                <div className={styles.correlationWrap}>
                    <ul>
                        <li className={styles.clear}>
                            <div className={styles.itemLeft}><h3>——— &nbsp;&nbsp; banggood 的商品 &nbsp;&nbsp; ———</h3></div>
                            <div className={styles.itemCenter}></div>
                            <div className={styles.itemRight}><h3>——— &nbsp;&nbsp; 竞品 &nbsp;&nbsp; ———</h3></div>
                        </li>
                        <li className={styles.clear}>
                            <div className={styles.itemLeft}>
                                <div className={`${styles.itemPanel} ${styles.fl}`}>
                                    <div className={styles.imgWrap}><img src=''/></div>
                                    <div className={styles.itemContent}>
                                        <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB </div>
                                        <div className={styles.itemDetail}>
                                            <span>US$ 138.99</span>
                                            <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                            <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                        </div>
                                    </div>
                                </div> 
                                <div ref='bgChart1' className={styles.fr} style={{width:'35%',height:120,border:'1px solid #eee'}}></div>
                            </div>
                            <div className={styles.itemCenter}>
                                <b> VS </b>
                            </div>
                            <div className={styles.itemRight}>
                                <div ref='competeChart1' style={{width:'90%',height:120,border:'1px solid #eee'}}></div>
                            </div>
                        </li>
                        <li className={styles.clear}>
                            <div className={styles.itemLeft}>
                                <div className={`${styles.itemPanel} ${styles.fl}`}>
                                    <div className={styles.imgWrap}><img src=''/></div>
                                    <div className={styles.itemContent}>
                                        <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB </div>
                                        <div className={styles.itemDetail}>
                                            <span>US$ 138.99</span>
                                            <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                            <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                        </div>
                                    </div>
                                </div> 
                                <div ref='bgChart2' className={styles.fr} style={{width:'35%',height:120,border:'1px solid #eee'}}></div>
                            </div>
                            <div className={styles.itemCenter}>
                                <b> VS </b>
                            </div>
                            <div className={styles.itemRight}>
                                <div ref='competeChart2' style={{width:'90%',height:120,border:'1px solid #eee'}}></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    
    componentDidMount(){
        this.loadBGChart(this.refs.bgChart1);
        this.loadLineChart(this.refs.competeChart1);
        this.loadBGChart(this.refs.bgChart2);
        this.loadLineChart(this.refs.competeChart2);
    }

	// 载入BG商品echart图表
	loadBGChart(chartId){

		if(chartId){

			// 初始化Echart
			let myChart = echarts.init(chartId);  

			// 绘制图表
			myChart.setOption({
					title: {
					},
					tooltip : {
					},
					legend: {
					},
					toolbox: {
						feature: {
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: false,
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['6.20','6.21','6.22','6.23','6.24'],
                            show:false,
							axisLabel: {
								show: false,
							},
							axisLine: {
								lineStyle:{
									color:'#acdaff'    // x轴颜色
								}
							}
						}
					],
					yAxis : [
						{
							type : 'value',  
							splitNumber: 2,  
							scale: true,  
							show:false,  
							splitLine:{  
						　　　　show:false  
					　　 	   },
							axisLabel: {
								show: false,
							},
							axisLine: {
								lineStyle:{
									color:'#acdaff'    // y轴颜色
								}
							}
						}
					],
					series : [
						{
							name:'搜索引擎',
							type:'line',
							stack: '总量',
							 itemStyle:{
								normal:{
									color:'#acdaff',
									show:true,
								},
							},
							areaStyle: {normal: {}},
							data:[ 192, 234, 190, 230, 220]
						}
					]
			});
		}
	
	}

    // 载入竞品echart图表
	loadLineChart(chartId){

		if(chartId){

			// 初始化Echart
			let myChart = echarts.init(chartId);  

			// 绘制图表
			myChart.setOption({
					title: {
					},
					tooltip : {
                        trigger: 'axis'
					},
					legend: {
                        
                        data:['环球 us 289.9','DX us 289.9','兰亭集势力 us 289.9','TOMTOP us 289.9']
					},
					toolbox: {
						feature: {
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: false,
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['6.20','6.21','6.22','6.23','6.24','6.25'],
                            show:false,
							axisLabel: {
								show: false,
							},
							axisLine: {
								lineStyle:{
									color:'#acdaff'    // x轴颜色
								}
							}
						}
					],
					yAxis : [
						{
							type : 'value',  
							scale: true,  
							show:false,  
							splitLine:{  
						　　　　show:false  
					　　 	   },
							axisLabel: {
								show: false,
							},
							axisLine: {
								lineStyle:{
									color:'#acdaff'    // y轴颜色
								}
							}
						}
					],
					series : [
						{
                            name:'环球 us 289.9',
                            type:'line',
                            stack: '总量',
                            data:[320, 312, 201, 434, 190, 230, 110]
                        },
                        {
                            name:'DX us 289.9',
                            type:'line',
                            stack: '总量',
                            data:[120, 102, 191, 134, 190, 130, 110]
                        },
                        {
                            name:'兰亭集势力 us 289.9',
                            type:'line',
                            stack: '总量',
                            data:[150, 23, 201, 2, 190, 330, 410]
                        },
                        {
                            name:'TOMTOP us 289.9',
                            type:'line',
                            stack: '总量',
                            data:[420, 332, 421, 311, 390, 430, 320]
                        }
					]
			});
		}
	
	}

}

export default Correlation;