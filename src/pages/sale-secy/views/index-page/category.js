/**
 * 销售秘书-类目模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon, Spin, Radio, Select } from 'antd';
import echarts from 'echarts';

const Option = Select.Option;
let setChartClickCount = 0; 

class Category extends React.Component {
    constructor() {
        super();
        
        this.state = {
            selectLabel:null,  // 选中的类目名称
            selectVal:null     // 选中的类目值
        }
	}

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    <span className={styles.fl}>你的类目情况</span>
                    {/* {
                        this.props.cateSet.length > 0?
                        <div className={styles.fr}>
                            <Select labelInValue defaultValue={{key: this.state.selectVal?this.state.selectVal:this.props.cateSet[0].cid}} onChange={this.onChangeCategory.bind(this)} style={{ width: 160 }} >
                                {
                                    this.props.cateSet.map((item,index)=>
                                        <Option key={`opt-${index}`} value={item.cid}>{item.name}</Option>
                                    )
                                }
                            </Select>
                        </div>
                        :null
                    } */}
                </div>
                
                <div className={styles.categoryWrap}>
                    {
                        this.props.myProductInCate.map?
                        <ul className={styles.clear}>
                            <li>
                                <div ref='catePieChart' style={{width:'100%',height:600,}}></div>
                            </li>
                            <li>
                                {
                                    this.props.loading?
                                    <div className={styles.loadWrap} style={{minHeight:593}}>
                                        <Spin tip="加载中..." style={{ marginTop: '15%'}} />
                                    </div>
                                    :
                                    <div>
                                        <h3>{this.state.selectLabel?this.state.selectLabel:this.props.cateSet[0].name} | 你的商品排行</h3>
                                        {
                                            this.props.myProductInCate.map((item,index)=>
                                            <div className={styles.itemPanel} key={`shop-${item.pid}`}>
                                                <div className={styles.imgWrap}>
                                                    <a href={item.product_url} target="_blank">
                                                        <img src={item.img_url} />
                                                    </a>
                                                </div>
                                                <div className={styles.itemContent}>
                                                    <div className={styles.itemTitle}>
                                                        <a href={item.product_url} target="_blank">{item.pname}</a>
                                                    </div>
                                                    <div className={styles.itemDetail}>
                                                        <span>{item.price} 美元</span>
                                                        <span className={styles.fr}>
                                                            {
                                                                //this.formatTrendNumber(item.no)
                                                            }
                                                        </span>
                                                        <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.ins}件</b>
                                                    </div>
                                                </div>
                                            </div> 
                                            )
                                        }
                                    </div>
                                }
                            </li>
                            <li>
                            {
                                this.props.loading?
                                <div className={styles.loadWrap} style={{minHeight:593}}>
                                    <Spin tip="加载中..." style={{ marginTop: '15%'}} />
                                </div>
                                :
                                <div>
                                    <h3>{this.state.selectLabel?this.state.selectLabel:this.props.cateSet[0].name} | 商品排行</h3>
                                    {
                                        this.props.productInCate.map((item,index)=>
                                        <div className={styles.itemPanel}  key={`shops-${item.pid}`}>
                                            <div className={styles.imgWrap}>
                                                <a href={item.product_url} target="_blank"><img src={item.img_url}/></a>
                                            </div>
                                            <div className={styles.itemContent}>
                                                <div className={styles.itemTitle}>
                                                    <a href={item.product_url} target="_blank">{item.pname}</a>
                                                </div>
                                                <div className={styles.itemDetail}>
                                                    <span>{item.price} 美元</span>
                                                    <span className={styles.fr}>
                                                        {
                                                            //this.formatTrendNumber(item.no)
                                                        }
                                                    </span>
                                                    <b className={`${styles.fr} ${styles.exponentOrange}`}>{item.ins}件</b>
                                                </div>
                                            </div>
                                        </div> 
                                        )
                                    }
                                </div>
                            }
                            </li>
                        </ul>
                        :
                        <div className={styles.dataNullWrap}>木有数据 &nbsp; <Icon type="frown-o" /></div>
                    }
                </div>

            </div>
        )
    } 

    
    componentDidMount(){

        // 延迟3秒加载Echart图表
        this.timeout(3000).then((value) => {
            if(this.props.cateSet){
                this.loadChart(this.formatDataToEchartPieData(this.props.cateSet));
            }
        });
        
    }

    componentDidUpdate(){
        
    }

    /**
     * 切换类目，根据类目获取数据
     * @param {object} _this 
     */
    onChangeCategory(_this){
        let cid = _this.key,
          label = _this.label;

        this.setState({
            selectVal:cid,
            selectLabel:label,
        });

        this.props.getCategoryByCid(cid);
    }


    /**
     * 载入echart图表
     * @param {Array} cateSet [饼形图数据]
     * @param {Array} prices  [圆柱图数据]
     */
	loadChart(cateSet,prices){
        console.log("load chart");
        const catePieChartId = this.refs.catePieChart;
        if(cateSet && catePieChartId){

            // 初始化Echart
            let catePieChart = echarts.init(catePieChartId);  

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
                legend: {
                    show:false,
                    orient: 'vertical',
                    right: '5%',
                    top:'10%',
                    data: cateSet.cidArray
                },
                series : [
                    {
                        name: '',
                        type: 'pie',
                        radius : '50%',
                        center: ['50%', '50%'],
                        data:cateSet.valueArray
                    }
                ]
            }

            // 绘制饼形图
            catePieChart.setOption(option);

            
            /**
             * Echart图点击的事件
             * @param {object} param 
             * @param {int} i 
             * @param {int} cid 
             */
            let everyClick = (param, i, cid) => {
                if (param.seriesIndex == 0 && param.dataIndex == i) {

                    // 请求数据
                    this.props.getCategoryByCid(cid);

                    // 获取类目信息
                    const cateName = param.data.name;
                    this.setState({
                        selectVal:cid,
                        selectLabel:cateName,
                    });
                }
            }
                
            
            /**
             * 增加监听事件
             * @param {object} param 
             */
            let eConsole = (param)=>{
                if (typeof param.seriesIndex != "undefined") {
                    if (param.type == "click") {
                        var peiLenght = option.legend.data.length;

                        // 获取总共给分隔的扇形数
                        for (var i = 0; i < peiLenght; i++) {
                            everyClick(param, i, option.legend.data[i]);
                        }
                    }
                }
            }

            // Echart 传入点击事件 
            if(setChartClickCount == 0){
                catePieChart.on("click", eConsole);
                setChartClickCount = 0;
            } 
        }
    }
    
    /**
     * 把数据转成EChart饼图数据
     * @param {*} runChart 
     */
	formatDataToEchartPieData(runChart) {
		let obj = {
            cidArray:[],
			labelArray:[],
			valueArray:[],
		}

		if(runChart && runChart.map){

            runChart.map((item,index)=>{
                let obj2 = {};
                for(let i in item){
                    // 存储名称
                    if(i == 'name'){
                        let nameItem = item[i].split('>');
                        let nameVal = nameItem[nameItem.length-1];
                        obj.labelArray.push(nameVal);
                        obj2.name = nameVal;
                    }
                    // 存储占比值
                    if(i == 'per'){
                        obj2.value = item[i].split('%')[0];
                    }
                    // 存储 cid
                    if(i == 'cid'){
                        obj.cidArray.push(item[i]);
                    }
                }
                obj.valueArray.push(obj2);
            })
            
        }
		return obj;
    }
    
    /**
     * 把数据转成EChart数据
     * @param {*} runChart 
     */
    formatDataToEchartData(runChart) {
        let obj = {
            labelArray: [0],
            valueArray: [0]
        }

        if (runChart) {
            let arr1 = [];
            let arr2 = [];
            
            for (let i in runChart) {
                let dateLabel = i;
				arr1.push(dateLabel);
                arr2.push(runChart[i]);
            }

            obj.labelArray = arr1;
            obj.valueArray = arr2;
        }
        return obj;

    }
    
    /**
     * 格式化热度的显示格式
     * @param {*} no 
     */
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

    /**
     * 异步定时器
     */
    timeout = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done');
        });
    }

}

export default Category;