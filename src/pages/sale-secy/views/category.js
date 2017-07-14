/**
 * 销售秘书-类目模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon,Spin } from 'antd';
import echarts from 'echarts';


class Category extends React.Component {

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    你的类目情况
                </div>
                {
                    this.props.loading?
                    <div className={styles.loadWrap}>
                        <Spin tip="加载中..." style={{ marginTop: 20 }} />
                    </div>
                    :
                    <div className={styles.categoryWrap}>
                        <ul className={styles.clear}>
                            <li>
                                {
                                    this.props.cateSet?
                                    <div ref='catePieChart' style={{width:'100%',height:310}}></div>
                                    :null
                                }
                                {
                                    this.props.myCateSalesFromPrice?
                                    <div ref='catePillarChart' style={{width:'100%',height:310}}></div>
                                    :null
                                }
                                
                            </li>
                            <li>
                                <h3>你的商品排行</h3>
                                {
                                    this.props.myProductInCate.map?this.props.myProductInCate.map((item,index)=>
                                    <div className={styles.itemPanel} key={item.pid}>
                                        <div className={styles.imgWrap}><img src={item.img_url}/></div>
                                        <div className={styles.itemContent}>
                                            <div className={styles.itemTitle}>{item.pname}</div>
                                            <div className={styles.itemDetail}>
                                                <span>US$ {item.price}</span>
                                                <span className={styles.fr}>
                                                    {
                                                        this.formatTrendNumber(item.no)
                                                    }
                                                </span>
                                                <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.ins}件</b>
                                            </div>
                                        </div>
                                    </div> 
                                    )
                                    :null
                                }
                                
                            </li>
                            <li>
                                <h3>商品排行</h3>
                                {
                                    this.props.productInCate.map?this.props.productInCate.map((item,index)=>
                                    <div className={styles.itemPanel}  key={item.pid}>
                                        <div className={styles.imgWrap}><img src={item.img_url}/></div>
                                        <div className={styles.itemContent}>
                                            <div className={styles.itemTitle}>{item.pname}</div>
                                            <div className={styles.itemDetail}>
                                                <span>US$ {item.price}</span>
                                                <span className={styles.fr}>
                                                    {
                                                        this.formatTrendNumber(item.no)
                                                    }
                                                </span>
                                                <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.ins}件</b>
                                            </div>
                                        </div>
                                    </div> 
                                    )
                                    :null
                                }
                            </li>
                        </ul>
                    </div>
                }
                
            </div>
        )
    } 

    
    componentDidMount(){
        //this.loadChart(this.formatDataToEchartData(this.props.cateSet));
    }

    componentDidUpdate(){

        // 载入两个图表
        this.loadChart(
            this.formatDataToEchartPieData(this.props.cateSet),
            this.formatDataToEchartData(this.props.myCateSalesFromPrice)
        );
    }

    // 载入echart图表
	loadChart(cateSet,prices){

        if(cateSet && prices){
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
                            right: '5%',
                            top:'10%',
                            data: cateSet.labelArray
                        },
                        series : [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius : '60%',
                                center: ['30%', '50%'],
                                data:cateSet.valueArray
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
                                show : false,
                                data : prices.labelArray,
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
                                name:'',
                                type:'bar',
                                stack: '',
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
                                data:prices.valueArray,
                            }
                        ]
                });
            }
        }
        
	
    }
    
    // 把数据转成EChart饼图数据
	formatDataToEchartPieData(runChart) {
		let obj = {
			labelArray:[],
			valueArray:[]
		}

		if(runChart && runChart.map){

            runChart.map((item,index)=>{
                let obj2 = {};
                for(let i in item){
                    if(i == 'name'){
                        let nameItem = item[i].split('>');
                        let nameVal = nameItem[nameItem.length-1];
                        obj.labelArray.push(nameVal);
                        obj2.name = nameVal;
                    }
                    if(i == 'per'){
                        obj2.value = item[i].split('%')[0];
                    }
                }
                obj.valueArray.push(obj2);
            })
            
        }

		return obj;
    }
    
    // 把数据转成EChart数据
	formatDataToEchartData(runChart) {

		let obj = {
			labelArray:[],
			valueArray:[]
		}

		if(runChart){
			let arr1 = [];
			let arr2 = [];
			for(let i in runChart){
				arr1.push(i);
				arr2.push(runChart[i]);
			}

			obj.labelArray = arr1;
			obj.valueArray = arr2;
		}
		return obj;
    }
    
    // 格式化热度的显示格式
    formatTrendNumber(no){
        //if(no){
            if(no == 'hot'){
                return (<span className={styles.exponentDown}>{no}</span>)
            }
            else if(no > 0){
                return (<span className={styles.exponentTop}><Icon type="arrow-up" />{no}</span>)
            }
            else if(no < 0){
                return (<span className={styles.exponentDown}><Icon type="arrow-down" />{no}</span>)
            }
            else if(no == 0){
                return (<span className={styles.exponentZero}>{no}</span>)
            }
        //}
    }

}

export default Category;