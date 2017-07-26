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
			date: moment().format('YYYY-MM-DD'),  // 日期
			runChart:null,   // 图表数据

			item1:1,         // 模块1
			item2:0,         // 模块2
			item3:0,         // 模块3
			item4:0,		 // 模块4
		}

	}

	render() {
		return (
			<div className={styles.panel} ref='saleroomId'>
				{
					this.props.salesAmount.salesAmount?
					<div className={styles.saleroomWrap}>
						<div className={styles.dateWrap}>
							<DatePicker value={moment(this.state.date)} onChange={ this.onChangeDate.bind(this) } disabledDate={this.disabledDate.bind(this)} />
							<Button size="small" className={styles.toDay} onClick={this.onPrevOrNextDay.bind(this, 0)}>上一天</Button>
							<Button size="small" className={styles.toDay} onClick={this.onPrevOrNextDay.bind(this, 1)}>下一天</Button>
						</div>

						<div className={styles.head}>
							<span>你拥有 
								<b>{this.props.productTotal ? this.props.productTotal.productTotal : 0}</b> 件  
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
									<li className={this.state.item1?styles.borderBottomNone:null} 
										onClick={this.onSaleroomItem.bind(this,this.props.salesAmount.runChart,1)}>
										<h3>销售额</h3>
										<div>
											<label>当天</label>
											<b>{this.props.salesAmount.salesAmount ? this.props.salesAmount.salesAmount : 0} 元</b>
										</div>
										<div>
											<label>前天环比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.salesAmount.yesRadio)}
											</span>
										</div>
										<div>
											<label>上周同比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.salesAmount.weekRadio)}
											</span>
										</div>
									</li>
									<li className={this.state.item2?styles.borderBottomNone:null}
										onClick={this.onSaleroomItem.bind(this,this.props.salesSum.runChart,2)}>
										<h3>销量</h3>
										<div><label>当天</label><b>{this.props.salesSum.salesSum ? this.props.salesSum.salesSum : 0} 件</b></div>
										<div><label>前天环比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.salesSum.yesRadio)}
											</span>
										</div>
										<div><label>上周同比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.salesSum.weekRadio)}
											</span>
										</div>
									</li>
									<li className={this.state.item3?styles.borderBottomNone:null}
										onClick={this.onSaleroomItem.bind(this,this.props.changeRate.runChart,3)}>
										<h3>转化率</h3>
										<div><label>当天</label><b>{this.props.changeRate.changeRate ? this.props.changeRate.changeRate : 0} %</b></div>
										<div><label>前天环比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.changeRate.yesRadio)}
											</span>
										</div>
										<div><label>上周同比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.changeRate.weekRadio)}
											</span>
										</div>
									</li>
									<li className={this.state.item4?styles.borderBottomNone:null}
										onClick={this.onSaleroomItem.bind(this,this.props.productNew.runChart,4)}>
										<h3>新品上架数</h3>
										<div><label>当天</label><b>{this.props.productNew.productNew ? this.props.productNew.productNew : 0} 件</b></div>
										<div><label>前天环比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.productNew.yesRadio)}
											</span>
										</div>
										<div><label>上周同比</label>
											<span className={styles.exponentTop}>
												{this.formatTrendPercentage(this.props.productNew.weekRadio)}
											</span>
										</div>
									</li>
								</ul>
								<div>
									<div ref='saleroomChart' style={{ width: '100%', height: 300 }}></div>
								</div>
							</div>
							{/* <div className={styles.saleroomScore}>
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
							</div> */}
						</div>
					</div>
					:
					<div className={styles.dataNullWrap}>木有数据 &nbsp; <Icon type="frown-o" /></div>
				}
				

			</div>
		)
	}


	componentDidMount() { 

		// 载入图表数据
		this.timeout(5000).then((value) => {
			this.setState({
				runChart:this.props.salesAmount.runChart
			}); 
		});
		
		this.timeout(2000).then((value) => {
			this.setState({
				runChart:this.props.salesAmount.runChart
			}); 
		});
		
	}

	componentDidUpdate() { 
		// 每次更新数据，都重载图表
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
					trigger: 'axis',
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
						name: '',
						type: 'line',
						stack: '',
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
				if(i !== 'dateArray' && i !== 'valueArray'){
					arr1.push(i);
					arr2.push(runChart[i]);
				}
			}

			obj.dateArray = arr1;
			obj.valueArray = arr2;
		}
		return obj;
	}

	// 点击切换模块：包括下边框、Echart数据
	onSaleroomItem(runChart,index){
		
		switch(index){
			case 1:
				this.setState({
					item1:1,
					item2:0,
					item3:0,
					item4:0,
					runChart:runChart,
				});
				break;
			case 2:
				this.setState({
					item1:0,
					item2:1,
					item3:0,
					item4:0,
					runChart:runChart,
				});
				break;
			case 3:
				this.setState({
					item1:0,
					item2:0,
					item3:1,
					item4:0,
					runChart:runChart,
				});
				break;
			case 4:
				this.setState({
					item1:0,
					item2:0,
					item3:0,
					item4:1,
					runChart:runChart,
				});
				break;
		}
	}

	// 上一天、下一天
	onPrevOrNextDay(dayId) {

		// 获取当前日期
		let currentDate = this.state.date;

		if (dayId == 0) {
			//上一天
			let provDay = moment(currentDate).subtract("days", 1).format("YYYY-MM-DD");

			// 更新到state
			this.setState({date: provDay});
			
			// 请求数据
			this.props.getsaleSecyInfoToDate(provDay); 
			this.props.getDate(provDay); 
		}
		else {
			//下一天
			let nextDay = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
			
			// 更新到state
			this.setState({
				date: nextDay
			});

			// 请求数据
			this.props.getsaleSecyInfoToDate(nextDay); 
			this.props.getDate(nextDay); 
		}
		/* console.log(this.state.date);
		console.log(this.state.date1); */
	}

	// 选择日期
	onChangeDate(date, dateString){
		this.setState({date:dateString});

		// 请求数据
		this.props.getsaleSecyInfoToDate(dateString); 
		this.props.getDate(dateString); 
	}

	/**
	 * 日历控件限制时间范围的函数
	 * @param {Date} current 
	 */
	disabledDate(current) {
		// Can not select days before today and today
		return current && current.valueOf() > Date.now();  
	}


	// 格式化热度的显示格式
	formatTrendPercentage(no) {
		if (no) {
			no = no.split('%')[0];
			if (no > 0) {
				return (<span className={styles.exponentTop}><Icon type="arrow-up" /> {no}%</span>)
			}
			else if (no < 0) {
				return (<span className={styles.exponentDown}><Icon type="arrow-down" /> {no}%</span>)
			}
			else if (no == 0) {
				return (<span className={styles.exponentZero}> {no}%</span>)
			}
		}
	}

}


export default Saleroom;