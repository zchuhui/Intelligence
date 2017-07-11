/**
 * 销售秘书-销售额模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { DatePicker, Icon } from 'antd';
import moment from 'moment';
import echarts from 'echarts';

class Saleroom extends React.Component {

	render() {
		return (
			<div className={styles.panel}>
				<div className={styles.saleroomWrap}>
					<div className={styles.dateWrap}>
						<DatePicker defaultValue={moment('2015/01/01', 'YYYY-MM-DD')} format={'YYYY-MM-DD'} />
						<span className={styles.toDay}>上一天</span>
						<span className={styles.toDay}>下一天</span>
					</div>
					<div className={styles.head}>
						<span>你拥有 <b>9999</b> 件 &nbsp; &nbsp; &nbsp; &nbsp; </span> 
						<span>环比增长 <span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></span>
					</div>
					<div className={styles.clear}>
						<div className={styles.saleroomContent}>
							<ul className={styles.clear}>
								<li>
									<h3>销售额</h3>
									<div><label>当天</label><b>100元</b><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>前天环比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>上周同比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
								</li>
								<li>
									<h3>销量</h3>
									<div><label>当天</label><b>100元</b><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>前天环比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>上周同比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
								</li>
								<li>
									<h3>转化率</h3>
									<div><label>当天</label><b>100元</b><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>前天环比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>上周同比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
								</li>
								<li>
									<h3>新品上架数</h3>
									<div><label>当天</label><b>100元</b><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>前天环比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
									<div><label>上周同比</label><span className={styles.exponentTop}><Icon type="arrow-up" />11%</span></div>
								</li>
							</ul>
							<div>
								<div ref='saleroomChart' style={{ width: '100%', height: 300}}></div>
							</div>
						</div>
						<div className={styles.saleroomScore}>
							888fen
						</div>
					</div>
				</div>
				
			</div>
		)
	}


	componentDidMount(){

		this.loadChart();
    }

	componentDidUpdate(){
	}

	// 载入echart图表
	loadChart(){

		if(this.refs.saleroomChart){
			// 初始化Echart
			let myChart = echarts.init(this.refs.saleroomChart); 

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
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['周一','周二','周三','周四','周五','周六','周日'],
							axisLabel: {
								show: true,
								textStyle: {
									color: '#666'   // x轴字体颜色
								}
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
							show:true,  
							splitLine:{  
						　　　　show:false  
					　　 	   },
							axisLabel: {
								show: true,
								textStyle: {
									color: '#666'   // y轴字体颜色
								}
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
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {normal: {}},
							data:[520, 92, 201, 134, 290, 130, 120]
						}
					]
			});
		}
	
	}
	

}


export default Saleroom;