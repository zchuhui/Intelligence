/**
 * 销售秘书-类目模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon } from 'antd';
import echarts from 'echarts';


class Category extends React.Component {

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    你的类目情况
                </div>
                <div className={styles.categoryWrap}>
                    <ul className={styles.clear}>
                        <li>
                            <div ref='catePieChart' style={{width:'100%',height:310}}></div>
                            <div ref='catePillarChart' style={{width:'100%',height:310}}></div>
                        </li>
                        <li>
                            <h3>销量排行榜</h3>
                            <div className={styles.itemPanel}>
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
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-....RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            
                        </li>
                        <li>
                            <h3>销量排行榜</h3>
                            <div className={styles.itemPanel}>
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
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-....RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-....RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.itemPanel}>
                                <div className={styles.imgWrap}><img src=''/></div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-DOOGEE MIX 5.5 Inch Android 7.0 6GB RAM 64GB ROM Helio P25 Octa-</div>
                                    <div className={styles.itemDetail}>
                                        <span>US$ 138.99</span>
                                        <span className={styles.fr}><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>99999件</b>
                                    </div>
                                </div>
                            </div> 
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    
    componentDidMount(){
        this.loadChart();
    }

    // 载入echart图表
	loadChart(){

        let catePieChartId = this.refs.catePieChart;
        let catePillarChartId = this.refs.catePillarChart;

		if(catePieChartId && catePillarChartId){

			// 初始化Echart
			let catePieChart = echarts.init(catePieChartId);  
			let catePillarChart = echarts.init(catePillarChartId);  

			// 绘制饼形图
			catePieChart.setOption({
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: false,
					},
                    color:['#baebe1','#f8a942','#42a6f8','#ffe990','#ff7082'],
                    legend: {
                        orient: 'vertical',
                        left: '80%',
                        top:'10%',
                        data: ['toy & hobby1 ','toy & hobby2 ','toy & hobby3 ','toy & hobby4 ','toy & hobby5 ']
                    },
					series : [
						 {
                            name: '访问来源',
                            type: 'pie',
                            radius : '70%',
                            center: ['30%', '50%'],
                            data:[
                                {value:335, name:'toy & hobby1 '},
                                {value:310, name:'toy & hobby2 '},
                                {value:234, name:'toy & hobby3 '},
                                {value:135, name:'toy & hobby4 '},
                                {value:1548, name:'toy & hobby5 '}
                            ],
                            itemStyle: {
                                
                            }
                        }
					]
			});

            // 绘制柱状图
            catePillarChart.setOption({
                    color:'#acdaff',
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true,
					},
					xAxis : [
						{
							type : 'category',
							data : ['6.20','6.21','6.22','6.23','6.24','6.25','6.26','6.27','6.28','6.29','6.30'],
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
							type:'bar',
							stack: '总量',
							 itemStyle:{
								normal:{
									color:'#acdaff',
									show:false,
								},
							},
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {normal: {}},
							data:[ 92, 234, 190, 230, 120,322,33,223,332,22,22]
						}
					]
			});
		}
	
	}

}

export default Category;