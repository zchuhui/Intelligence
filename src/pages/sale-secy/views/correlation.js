/**
 * 销售秘书-对比关系模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon, Spin } from 'antd';
import echarts from 'echarts';


class Correlation extends React.Component {

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    对比关系
                </div>
				{
					this.props.loading?
                    <div className={styles.loadWrap}>
                        <Spin tip="加载中..." style={{ marginTop: 20 }} />
                    </div>
                    :
					<div>
						{
							this.props.goodsComparisonList? 
							<div className={styles.correlationWrap}>
								<ul>
									<li className={styles.clear}>
										<div className={styles.itemLeft}><h3>——— &nbsp;&nbsp; banggood 的商品 &nbsp;&nbsp; ———</h3></div>
										<div className={styles.itemCenter}></div>
										<div className={styles.itemRight}><h3>——— &nbsp;&nbsp; 竞品 &nbsp;&nbsp; ———</h3></div>
									</li>

									{
										this.props.goodsComparisonList.map?
										this.props.goodsComparisonList.map((item,index) => 
											<li className={styles.clear} key={item.pid}>
												{/* BG商品 */}
												<div className={styles.itemLeft}>
													<div className={`${styles.itemPanel} ${styles.fl}`}>
														<div className={styles.imgWrap}><img src={item.img_url} /></div>
														<div className={styles.itemContent}>
															<div className={styles.itemTitle}>{item.pname}</div>
															<div className={styles.itemDetail}>
																<span>US$ {item.price}</span>
																<b className={`${styles.fr} ${styles.exponentOrange}`}>{item.sales_ins}件</b>
															</div>
														</div>
													</div> 
													<div ref={`bgChart${(index+1)}`} className={styles.fr} style={{width:'35%',height:120,border:'1px solid #eee'}}></div>
												</div>

												<div className={styles.itemCenter}>
													<b> VS </b>
												</div>

												{/* 竞品 */}
												<div className={styles.itemRight}>
													<div className={styles.echart} ref={`competeChart${(index+1)}`} style={{width:'70%',height:120,border:'1px solid #eee'}}></div>
													<div className={styles.relateInfo}> 
														{
															this.formatRelateInfo(item.relate_info).goodsNameArray.map?
															this.formatRelateInfo(item.relate_info).goodsNameArray.map((item2,idx2) =>
															<p style={{color:this.formatRelateInfo(item.relate_info).goodsColorArray[idx2]}} key={`${item2}${idx2}`}>
																{item2}  US  {this.formatRelateInfo(item.relate_info).goodsInfoArray[idx2].price}
															</p>)
															:null
														} 
													</div>
												</div>
											</li>
										)
										:null
									}
								</ul>
							</div>
							:
							<div className={styles.dataNullWrap}>木有数据 &nbsp; <Icon type="frown-o" /></div>
						}
						
					</div>
				}
                
            </div>
        )
    }

    
    componentDidMount(){}
	
	componentDidUpdate(){

		if(this.props.goodsComparisonList){
			// 载入BG Echart图表
			this.loadBGChart(this.refs.bgChart1,this.props.goodsComparisonList[0].run_chart);
			this.loadBGChart(this.refs.bgChart2,this.props.goodsComparisonList[1].run_chart);
			this.loadBGChart(this.refs.bgChart3,this.props.goodsComparisonList[2].run_chart);

			
			// 载入竞品 Echart图表
			this.loadLineChart(
					this.refs.competeChart1,
					this.formatRelateInfo(this.props.goodsComparisonList[0].relate_info)
			);
			this.loadLineChart(
				this.refs.competeChart2,
				this.formatRelateInfo(this.props.goodsComparisonList[1].relate_info)
			);
			this.loadLineChart(
				this.refs.competeChart3,
				this.formatRelateInfo(this.props.goodsComparisonList[2].relate_info)
			);
		}
		
	}

	// 载入BG商品echart图表
	loadBGChart(chartId,data) {

		data = this.formatDataToEchartData(data);

		if (chartId) {

			// 初始化Echart
			let myChart = echarts.init(chartId);

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
					containLabel: false,
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.labelArray,
						show: false,
						axisLabel: {
							show: false,
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
						show: false,
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false,
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
						data:data.priceSet,
					}
				]
			});

		}

	}

	// 载入竞品echart图表
	loadLineChart(chartId,data) {
		
		if (chartId) {

			// 遍历获取每个竞品的图表信息
			var goodsInfo = [];
			data.goodsInfoArray.map((item,index) => {
				goodsInfo.push(this.formatDataToEchartData(item.run_chart));
			});

			// 遍历获取每个图表信息中的价格参数
			var seriesData = [];
			goodsInfo.map((item,index) => {
				let obj = {
					name: data.goodsNameArray[index],
					type: 'line',
					stack: '总量',
					itemStyle : {  
						normal : {  
							color:data.goodsColorArray[index],  // 节点的颜色
							lineStyle:{                         // 线的颜色
								color:data.goodsColorArray[index],  
							}  
						}  
					},  
					data:item.priceSet,
				};

				seriesData.push(obj);
			});


			// 初始化Echart
			let myChart = echarts.init(chartId);

			// 绘制图表
			myChart.setOption({
				title: {
				},
				tooltip: {
					trigger: 'axis'
				},
				/* legend: {
					data: data.goodsNameArray
				}, */
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
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: ['6.20', '6.21', '6.22', '6.23', '6.24', '6.25'],
						show: false,
						axisLabel: {
							show: false,
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
						scale: true,
						show: false,
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false,
						},
						axisLine: {
							lineStyle: {
								color: '#acdaff'    // y轴颜色
							}
						}
					}
				],
				series: seriesData,
			});
		}

	}

	// 把数据转成EChart数据
	formatDataToEchartData(runChart) {
		
		let obj = {
			labelArray:[],
			priceSet:[],
			reviewSet:[],
			salesSet:[]
		}

		if(runChart){
			for(let idx1 in runChart){
				let arr1 = [];
				let arr2 = [];
				for(let idx2 in runChart[idx1]){
					arr1.push(idx2);
					arr2.push(runChart[idx1][idx2]);
				}

				switch(idx1){
					case 'priceSet':
						obj.priceSet = arr2;
						break;
					case 'reviewSet':
						obj.reviewSet = arr2;
						break;
					case 'salesSet':
						obj.salesSet = arr2;
						break;
				}
				obj.labelArray = arr1;
			}

			
		}

		return obj;
	}
	
	// 竞品格式
	formatRelateInfo(relateInfo){

		let goodsNameArray = [];
		let goodsInfoArray = [];
		let goodsColorArray = ['#e5004f','#43a047','#43a6f8','#e359ef'];

		if(relateInfo){
			for(let idx in relateInfo){
				goodsNameArray.push(idx);
				goodsInfoArray.push(relateInfo[idx]);
			}
		}
		//console.log(goodsNameArray,goodsInfoArray);
		return {
			goodsNameArray:goodsNameArray,
			goodsInfoArray:goodsInfoArray,
			goodsColorArray:goodsColorArray
		}
	}



}

export default Correlation;