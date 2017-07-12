/**
 * 销售秘书-销售额模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { DatePicker, Icon, Button } from 'antd';
import moment from 'moment';
import echarts from 'echarts';

class Saleroom extends React.Component {

	constructor(){
		super();

		this.state = {
			date:moment(),
		}
	}

	render() {
		return (
			<div className={styles.panel}>
				<div className={styles.saleroomWrap}>
					<div className={styles.dateWrap}>
						<DatePicker value={moment(this.state.date)} format="YYYY-MM-DD" />
						<Button size="small" className={styles.toDay} onClick={this.onPrevOrNextDay.bind(this, 0)}>上一天</Button>
						<Button size="small" className={styles.toDay} onClick={this.onPrevOrNextDay.bind(this, 1)}>下一天</Button>
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
							<h3><b>88</b>分</h3>
							<p>优秀，超越58%的伙伴</p>
							<div className={styles.scoreContent}>
								<ul>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错不错不错不错不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错，要不尝试一下？</li>
									<li>【推荐建议】这个商品环球卖的不错，要不尝试一下？</li>
								</ul>
							</div>
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

	// 上一天、下一天
	onPrevOrNextDay(dayId){

		// 获取当前日期
		let currentDate = this.state.date;

		if(dayId == 0){
			//上一天
			let provDay = moment(currentDate).subtract("days",1).format("YYYY-MM-DD");

			this.setState({
				date:provDay
			})
		}
		else{
			//下一天
			let nextDay = moment(currentDate).add(1,"days").format("YYYYMMDD")

			this.setState({
				date:nextDay
			}) 
		}
	}

}


export default Saleroom;