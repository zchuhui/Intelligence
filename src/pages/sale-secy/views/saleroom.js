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

	constructor() {
		super();

		this.state = {
			date: moment(),  // 日期
			runChart:null,
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
						<span>你拥有 
							<b>{this.props.productTotal.productTotal ? this.props.productTotal.productTotal : 0}</b> 件  
						</span>
						<span>环比增长 
							<span className={styles.exponentTop}>
								<Icon type="arrow-up" />
								{this.props.productTotal ? this.props.productTotal.yesRadio : 0}
							</span>
						</span>
					</div>

					<div className={styles.clear}>
						<div className={styles.saleroomContent}>
							<ul className={styles.clear}>
								<li onClick={this.onSaleroomItem.bind(this,this.props.salesAmount.runChart)}>
									<h3>销售额</h3>
									<div>
										<label>当天</label>
										<b>{this.props.salesAmount.salesAmount ? this.props.salesAmount.salesAmount : 0}元</b>
									</div>
									<div>
										<label>前天环比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.salesAmount.yesRadio ? this.props.salesAmount.yesRadio : '0%'}
										</span>
									</div>
									<div>
										<label>上周同比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.salesAmount.weekRadio ? this.props.salesAmount.weekRadio : '0%'}
										</span>
									</div>
								</li>
								<li onClick={this.onSaleroomItem.bind(this,this.props.salesSum.runChart)}>
									<h3>销量</h3>
									<div><label>当天</label><b>{this.props.salesSum.salesSum ? this.props.salesSum.salesSum : 0}元</b></div>
									<div><label>前天环比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.salesSum.yesRadio ? this.props.salesSum.yesRadio : '0%'}
										</span>
									</div>
									<div><label>上周同比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.salesSum.weekRadio ? this.props.salesSum.weekRadio : '0%'}
										</span>
									</div>
								</li>
								<li>
									<h3>转化率</h3>
									<div><label>当天</label><b>{this.props.changeRate.changeRate ? this.props.changeRate.changeRate : 0}元</b></div>
									<div><label>前天环比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.changeRate.yesRadio ? this.props.changeRate.yesRadio : '0%'}
										</span>
									</div>
									<div><label>上周同比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.changeRate.weekRadio ? this.props.changeRate.weekRadio : '0%'}
										</span>
									</div>
								</li>
								<li>
									<h3>新品上架数</h3>
									<div><label>当天</label><b>{this.props.productNew.productNew ? this.props.productNew.productNew : 0}元</b></div>
									<div><label>前天环比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.productNew.yesRadio ? this.props.productNew.yesRadio : '0%'}
										</span>
									</div>
									<div><label>上周同比</label>
										<span className={styles.exponentTop}><Icon type="arrow-up" />
											{this.props.productNew.weekRadio ? this.props.productNew.weekRadio : '0%'}
										</span>
									</div>
								</li>
							</ul>
							<div>
								<div ref='saleroomChart' style={{ width: '100%', height: 300 }}></div>
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


	componentDidMount() {

		this.setState({
			runChart:this.getEchartData(this.props.salesAmount.runChart)
		});
		
		this.timeout(3000).then((value) => {
			this.setState({
				runChart:this.getEchartData(this.props.salesAmount.runChart)
			});
		});
	}

	componentDidUpdate() { 

		this.loadChart(this.getEchartData(this.state.runChart));
	}

	// 异步定时器
    timeout = (ms) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }

	// 载入echart图表
	loadChart(data) {
		
		if (this.refs.saleroomChart) {
			// 初始化Echart
			let myChart = echarts.init(this.refs.saleroomChart);

			// 绘制图表
			myChart.setOption({
				title: {
				},
				tooltip: {
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
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.dateArray,
						axisLabel: {
							show: true,
							textStyle: {
								color: '#666'   // x轴字体颜色
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
						type: 'value',
						splitNumber: 2,
						scale: true,
						show: true,
						splitLine: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#666'   // y轴字体颜色
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
						name: '搜索引擎',
						type: 'line',
						stack: '总量',
						itemStyle: {
							normal: {
								color: '#acdaff',
								show: true,
							},
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						areaStyle: { normal: {} },
						data: data.valueArray
					}
				]
			});
		}

	}

	// 获取runChart数据
	getEchartData(runChart) {

		let obj = {
			dateArray:[],
			valueArray:[]
		}

		if(runChart){
			let arr1 = [];
			let arr2 = [];
			for(let i in runChart){
				arr1.push(i);
				arr2.push(runChart[i]);
			}

			obj.dateArray = arr1;
			obj.valueArray = arr2;
		}
		return obj;
	}

	// 切换
	onSaleroomItem(runChart){
		this.setState({
			runChart:runChart,
		})
	}

	// 上一天、下一天
	onPrevOrNextDay(dayId) {

		// 获取当前日期
		let currentDate = this.state.date;

		if (dayId == 0) {
			//上一天
			let provDay = moment(currentDate).subtract("days", 1).format("YYYY-MM-DD");

			this.setState({
				date: provDay
			})
		}
		else {
			//下一天
			let nextDay = moment(currentDate).add(1, "days").format("YYYYMMDD")

			this.setState({
				date: nextDay
			})
		}
	}

}


export default Saleroom;