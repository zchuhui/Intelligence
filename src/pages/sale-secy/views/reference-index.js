/**
 * 销售秘书-参考指标模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon } from 'antd';
import echarts from 'echarts';

class ReferenceIndex extends React.Component {

    render() {

        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    参考指标
                </div>
                <div className={styles.referenceIndexWrap}>
                    <ul className={styles.clear}>
						<li>
							<h3>加购量</h3>
							<div><label>当天</label><b>{this.props.basket.basket ? this.props.basket.basket : 0} 件</b></div>
							<div><label>前天环比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{
										this.props.basket.yesRadio ? this.props.basket.yesRadio : '0%'
									}
								</span>
							</div>
							<div><label>上周同比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{
										this.props.basket.weekRadio ? this.props.basket.weekRadio : '0%'
									}
								</span>
							</div>
							<div className={styles.chartWrap}>
								<div ref="refChart1" style={{ width: '100%', height: 110 }}></div>
							</div>
						</li>
                         <li>
                            <h3>收藏量</h3>
							<div><label>当天</label><b>{this.props.favorites.favorites?this.props.favorites.favorites:0}件</b></div>
							<div><label>前天环比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{this.props.favorites.yesRadio?this.props.favorites.yesRadio:'0%'}
								</span>
							</div>
							<div><label>上周同比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{this.props.favorites.weekRadio?this.props.favorites.weekRadio:'0%'}
								</span>
							</div>
							<div className={styles.chartWrap}>
								<div ref="refChart2" style={{ width: '100%', height: 110 }}></div>
							</div>
                        </li>
                         <li>
                            <h3>访客量</h3>
                            <div><label>当天</label><b>{this.props.visitor.visitor?this.props.visitor.visitor:0}位</b></div>
                            <div><label>前天环比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{this.props.visitor.yesRadio?this.props.visitor.yesRadio:'0%'}
								</span>
							</div>
                            <div><label>上周同比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{this.props.visitor.weekRadio?this.props.visitor.weekRadio:'0%'}
								</span>
							</div>
                            <div className={styles.chartWrap}>
                                <div ref="refChart3" style={{width:'100%',height:110}}></div>
                            </div>
                        </li>
                         <li>
                            <h3>浏览量</h3>
                            <div><label>当天</label><b>{this.props.pageView.pageView?this.props.pageView.pageView:0}次</b></div>
                            <div><label>前天环比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{this.props.pageView.yesRadio?this.props.pageView.yesRadio:'0%'}
								</span>
							</div>
                            <div><label>上周同比</label>
								<span className={styles.exponentTop}><Icon type="arrow-up" />
									{this.props.pageView.weekRadio?this.props.pageView.weekRadio:'0%'}
								</span>
							</div>
                            <div className={styles.chartWrap}>
                                <div ref="refChart4" style={{width:'100%',height:110}}></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount(){
		this.loadChart(this.refs.refChart1);
        this.loadChart(this.refs.refChart2);
        this.loadChart(this.refs.refChart3);
        this.loadChart(this.refs.refChart4);
    }

	componentDidUpdate(){
	}

	// 载入echart图表
	loadChart(chartId){

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
							show:true,  
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
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {normal: {}},
							data:[ 92, 234, 190, 230, 120]
						}
					]
			});
		}
	
	}

}

export default ReferenceIndex;