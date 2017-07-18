/**
 * BG关联表
 * Date: 2017-06-19
 * Author: zhuangchuhui
 */

import React from 'react';
import { Link } from 'dva/router';
import styles from './goods-list.less';
import moment from 'moment';
import echarts from 'echarts';
import {
    Table, Pagination, Icon, Menu, Dropdown, Button, message, Modal, DatePicker,
    Checkbox, Select, Radio, Spin, Row, Col
} from 'antd';


const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 本月时间
const startTime = moment().startOf('month').format('YYYY-MM-DD');
const endTime = moment().endOf('month').format('YYYY-MM-DD');


// 自定义竞品选项
const plainOptions = ['环球', '速卖通', '兰亭集势', 'DX', '亚马逊', 'Tom Top'];
const defaultCheckedList = [];



class GoodsList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            customRowVisible: false, // 自定列

            // 自定义竞品
            customGoods: {
                visible: false,
                checkedList: defaultCheckedList,
                indeterminate: true,
                checkAll: false,
            },

            //主商品趋势图
            goodsEchartVisible:false,
            goodsEchartPid:0,
            goodsEchartRadioValue:1,
            defaultStartDate:moment().startOf('week').format('YYYY-MM-DD'),  //本周第一天
            defaultEndDate:moment().endOf('week').format('YYYY-MM-DD'),      //本周最后一天

            //对比
            goodsContrastVisible:false,
            goodsContrastSku:null,
            goodContrastData:[],

            
        }

    }

    render() {
        
        // 主表Columns
        const tableColumns = [
            {
                title: "主图",
                key: "img_url",
                render: (text, record) => (
                    <span>
                        {   // 子表不显示该项
                            !record.isChildren?
                            <img src={ record.img_url} className={ styles.img } />
                            :<span> <Icon type="arrow-right" style={{ color:'#e9e9e9',fontSize:'30px' }}/></span>
                        }
                       
                   </span>
                    
                ),
            }, {
                title: "编码",
                dataIndex: "sku",
                key: "sku",
                render:(text,record) => (
                    <div >
                        {
                            !record.isChildren?
                            <div>
                                {record.sku}
                                <p style={{ marginTop:5}}>
                                    {   
                                        // 是否关联，如果为关联，则显示关联连接
                                        record.relate_sku==0?
                                        <Link  to={"/create/"+record.sku}><Icon type="exclamation-circle-o" style={{ color:'red',fontSize:14 }}/> &nbsp;未关联</Link>
                                        :
                                        <Link  to={"/create/"+record.sku}><Icon type="check-circle-o" style={{ color:'#79bb51',fontSize:14 }}/>&nbsp;已关联</Link>
                                    }
                                </p>
                            </div>
                            :null
                        }
                        
                   </div>
                )
            }, {
                title: "操作",
                dataIndex: "pid",
                render: (text, record) => (
                   <span>
                        {
                            !record.isChildren?
                            <Dropdown overlay={this.tableColumnsMenu(record)}>
                                <Button>
                                  操作 <Icon type="down" />
                                </Button>
                          </Dropdown>
                          :null
                        }
                       
                   </span>
                ),
            }, {
                title: "站点",
                dataIndex: "site",
                key: "site",
            }, {
                title: "标题",
                dataIndex: "pname",
                key: "pname",
                className: styles.columnTitle
            }, {
                title: "价格",
                dataIndex: "price",
                sorter: true
            }, {
                title: "销量",
                dataIndex: "sales",
                key: "sales",
                sorter: (a, b) => a.sales - b.sales,
            }, {
                title: "评分",
                dataIndex: "score",
                sorter: true
            }, {
                title: "评论数",
                dataIndex: "reviews",
                sorter: true
            }, {
                title: "关注数",
                dataIndex: "favorites",
                sorter: true
            }, {
                title: "提问数",
                dataIndex: "questions",
                 sorter: true
            }, {
                title: "类目树",
                dataIndex: "cateName",
                key: "cateName",
                className: styles.columnCate,
                render:(text,record) => (
                    <span>
                    {
                        record.cateName?
                        record.cateName.split('>').map((item,index) => <p>{item}</p>)
                        :
                        record.cateName
                    }
                    </span>
                )
            },
        ]

        return (
            <div className={ styles.main }>

				{ /* 操作栏 start*/ }
            	<div className={ styles.clear } style={{ paddingBottom:20 }}>

				    {/*<Button className={styles.fr} onClick={ this.showCustomRowModal }>自定义列</Button>*/}
            		{/*<Button className={styles.fr} onClick={ this.showCustomGoodsModal } style={{marginRight:10}}>自定竞品</Button>*/}
            		<Button className={styles.fr} style={{marginRight:10}}><Link to='/create'>创建关系</Link></Button>
                    
            	</div>
            	{ /* 操作栏 end*/ }

            	<div className={ styles.tableWrap }>
					{ /* 数据列表 start */ }
					<Table 
						dataSource={ this.props.data.list }
						loading={ this.props.loading } 
						pagination={false} 
						columns={tableColumns}
                        rowKey={record => record.sku }
                        onChange={this.handleTableChange}
						>
						
					  </Table>
					{ /* 数据列表 end */ }

					{/* 分页 start*/}
					<div className={styles.piginationWrap}>
						<Pagination
				          className="ant-table-pagination"
				          showQuickJumper 
				          total={parseInt(this.props.data.page.count)} 
				          current={this.props.data.page.page}
				          pageSize={this.props.data.page.pageSize}
				          onChange={this.props.changePagination.bind(this)}
				        />
					</div>
					{/* 分页 end */}

				</div>


                {/*自定义列弹框 star*/}
                {/*<Modal
                    title="自定义列"
                    visible={this.state.customRowVisible}  
                    onCancel={this.hideCustomRowModal} 
                    okText="确认"
                    cancelText="取消"
                    footer={null}
                    >
                    <div>
                        开发中...
                    </div>
                </Modal>*/}
                {/*自定义列弹框 end*/}


                {/*自定义竞品弹框 star*/}
                {/*<Modal
                    title="自定义竞品"
                    visible={this.state.customGoods.visible}  
                    onCancel={this.hideCustomGoodsModal} 
                    okText="确认"
                    cancelText="取消"
                    footer={null}
                    >
                    <div>
                        <div>
                          <Checkbox
                            indeterminate={this.state.customGoods.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.customGoods.checkAll}>
                            全选
                          </Checkbox>
                        </div>
                        <div style={{ maxWidth:400,margin:'20px 0' }}>
                            <CheckboxGroup 
                                options={plainOptions} 
                                value={this.state.customGoods.checkedList} 
                                onChange={this.onCustomChange} />
                        </div>
                        <div style={{ textAlign:'center'}}><Button type='primary' onClick={this.onCustomOK.bind(this)}>确定</Button></div>
                    </div>
                </Modal>*/}
                {/*自定义竞品弹框 end*/}


                {/*主商品趋势图弹框 star*/}
                <Modal
                    title="主体商品的趋势图"
                    key="modal1"
                    visible={this.state.goodsEchartVisible}  
                    onCancel={this.hideGoodsEchartModal} 
                    okText="确认"
                    cancelText="取消"
                    footer={null}
                    width={800}
                    >
                    <div style={{ }}>
                        <div>
                            <div style={{display:'inline-block',
                                height:40,}}>
                                <RangePicker onChange={ this.getGoodsEcharData }
                                    value={[
                                        moment(this.state.defaultStartDate),
                                        moment(this.state.defaultEndDate)
                                    ]}
                                    format="YYYY-MM-DD"
                                    style={{width:240, margin:'0 auto'}}
                                    ref='echartTime'
                                    disabledDate = {this.disabledDate}
                                />
                                <span>
                                    <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,6)}>最近7天</span>
                                    <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,14)}>最近15天</span>
                                    <span className={styles.lateDate} onClick={this.onLatelyDate.bind(this,29)}>最近30天</span>
                                </span>
                            </div>
                        </div>
                        <div style={{width:768,height:550,position:'relative'}}>
                            {
                                this.props.goodsEchartDataLoading==false?
                                <div style={{width:768,height:550,textAlign:'center',position:'absolute',background:'rgba(255,255,255,0.7)',zIndex:1000}}>
                                    <Spin tip="Loading..." style={{ marginTop:250 }}/>
                                </div>
                                :null
                            }
                            <div ref='echartId' style={{width:768,height:500,margin:'0 auto'}}></div>
                            
                        </div>
                    </div>
                </Modal>
                {/*主商品趋势图弹框 end*/}


                {/* 商品对比弹框 star*/}
                <Modal
                    title="对比（多个商品对比模式）"
                    key="modal2"
                    visible={this.state.goodsContrastVisible}
                    onCancel={this.hideGoodsContrastTable}
                    footer={null}
                    width={900}
                    >
                    {
                        this.goodsContrastTable()
                    }
                </Modal>
                {/* 商品对比弹框 end*/}
			</div>
        )
    }

    // 数据变动，渲染完成后，执行
    componentDidUpdate(prevProps, prevState) {

        // 主商品趋势图载入
        if (this.props.goodsEchartDataLoading) {
            this.loadEchart();
        }
        
        // 对比商品趋势图载入
        if (this.props.goodContrastDataLoading) {

            this.timeout(1000).then((value) => {
                  this.eachEcharts();
            });
        }
    }



    // 异步定时器
    timeout = (ms) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }

    // 获取表格的排序、筛选信息，并进行排序
    handleTableChange = (pagination, filters, sorter) =>{
        if(sorter.order == 'ascend'){
            this.props.changeTableSort(`${sorter.field}-asc`);
        }else if(sorter.order == 'descend'){
            this.props.changeTableSort(`${sorter.field}-desc`);
        }
    }


    // 主表操作菜单
    tableColumnsMenu = (record) => {
        return (
            <Menu onClick={this.onClickSelct.bind(this,record)}>
                <Menu.Item key="0">
                  <a key="cd_1" href="javascript:;">对比</a>
                </Menu.Item>
                <Menu.Item key="1">
                  <a key="cd_2" href="javascript:;">趋势图</a>
                </Menu.Item>
            </Menu>
        )
    }
    
    // 对比商品模块
    goodsContrastTable = () => {
        return(
            <div className={styles.contrastTableWrap}>
                {    
                    this.props.goodContrastDataLoading == false?
                    <div style={{width:900,height:500,textAlign:'center',background:'rgba(255,255,255,0.5)'}}>
                        <Spin tip="Loading..." style={{ marginTop:250 }}/>
                    </div>
                    :
                    <div>
                        {
                            this.props.goodContrastData.info?
                            <Row>
                                <Col span={4}>
                                    <ul className={styles.tableColTitle}>
                                        <li>商品首图</li>
                                        <li>站点名称</li>
                                        <li>类目树</li>
                                        <li>属性</li>
                                        <li>当前价格</li>
                                        <li>30天均价</li>
                                        <li>总销量</li>
                                        <li>30天销量</li>
                                        <li>关注量（收藏量）</li>
                                        <li>评论数</li>

                                        <li className={ styles.chartWrap}>价格7天趋势图</li>
                                        <li className={ styles.chartWrap}>销量7天趋势图</li>
                                        <li className={ styles.chartWrap}>评论7天趋势图</li>
                                    </ul>
                                </Col>
                                {/*BG 商品*/}
                                <Col span={10}>
                                        <ul className={styles.tableCol}>
                                            <li><img src={this.props.goodContrastData.info.img_url}/></li>
                                            <li>{this.props.goodContrastData.info.site}</li>
                                            <li>{this.props.goodContrastData.info.cateName}</li>
                                            <li>{this.props.goodContrastData.info.attrName}</li>
                                            <li>{this.props.goodContrastData.info.price}</li>
                                            <li>{this.props.goodContrastData.info.thirtyPrice}</li>
                                            <li>{this.props.goodContrastData.info.sales}</li>
                                            <li>{this.props.goodContrastData.info.thirtySales}</li>
                                            <li>{this.props.goodContrastData.info.favorites}</li>
                                            <li>{this.props.goodContrastData.info.reviews}</li>

                                            <li className={ styles.chartWrap}><div ref='priceSet' style={{width:200,height:100,margin:'0 auto'}}></div></li>
                                            <li className={ styles.chartWrap}><div ref='salesSet' style={{width:200,height:100,margin:'0 auto'}}></div></li>
                                            <li className={ styles.chartWrap}><div ref='reviewSet' style={{width:200,height:100,margin:'0 auto'}}></div></li>

                                        </ul>
                                </Col>
                                {/*关联的商品*/}
                                {
                                    this.props.goodContrastData.relateInfo.map((item,index) => {
                                        let sets = [];
                                        if (index == 0) {
                                            sets = ['priceSet1','salesSet1','reviewSet1']
                                        }
                                        else if (index == 1) {
                                            sets = ['priceSet2','salesSet2','reviewSet2']
                                        }

                                        return(
                                            <ul className={styles.tableCol}>
                                                <li><img src={item.img_url}/></li>
                                                <li>{item.site}</li>
                                                <li>{item.cateName}</li>
                                                <li>{item.attrName}</li>
                                                <li>{item.price}</li>
                                                <li>{item.thirtyPrice}</li>
                                                <li>{item.sales}</li>
                                                <li>{item.thirtySales}</li>
                                                <li>{item.favorites}</li>
                                                <li>{item.reviews}</li>

                                                <li className={ styles.chartWrap}>
                                                    <div ref={ sets[0] } style={{width:200,height:100,margin:'0 auto'}}></div>
                                                </li>
                                                <li className={ styles.chartWrap}>
                                                     <div ref={sets[1]} style={{width:200,height:100,margin:'0 auto'}}></div>
                                                </li>
                                                <li className={ styles.chartWrap}>
                                                     <div ref={sets[2]} style={{width:200,height:100,margin:'0 auto'}}></div>
                                                </li>
                                            </ul>
                                        )
                                    })  
                                }
                            </Row>
                            :
                            <div style={{textAlign:'center',paddingTop:250}}>
                                <p>你要对比的商品还在天涯海角，试试把TA寻回呗。</p>
                                <Link  to={"/create/"+this.state.goodsContrastSku}>点击试试</Link>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

    // 显示对比数据弹框
    showGoodsContrastTable = (pid,sku) => {

        this.setState({
            goodsContrastVisible: true,
            goodsContrastSku:sku
        });

        // 请求数据
        this.props.getGoodsContrastDataByPid(pid);


        this.timeout(3000).then((value) => {
              this.eachEcharts();
        });

    }

    // 隐藏对比数据弹框
    hideGoodsContrastTable = () => {
        
        this.props.clearGoodsContrastData();

        this.setState({
            goodsContrastVisible: false,
        })
    }

    // 对比商品Echart图载入
    eachEcharts = () => {

        // BG 趋势图
        if (this.refs.priceSet) {
            this.loadGoodContrastEchart(this.refs.priceSet,this.props.goodContrastData.info.priceSet);
            this.loadGoodContrastEchart(this.refs.salesSet,this.props.goodContrastData.info.salesSet);
            this.loadGoodContrastEchart(this.refs.reviewSet,this.props.goodContrastData.info.reviewSet);
        }

        // 关联商品Echart图，目前最多只显示两个关联
        if (this.props.goodContrastData.relateInfo) {
            this.props.goodContrastData.relateInfo.map((item,index) => {
                if (index == 0) {
                    this.loadGoodContrastEchart(this.refs.priceSet1,this.props.goodContrastData.info.priceSet);
                    this.loadGoodContrastEchart(this.refs.salesSet1,this.props.goodContrastData.info.salesSet);
                    this.loadGoodContrastEchart(this.refs.reviewSet1,this.props.goodContrastData.info.reviewSet);
                }
                if (index == 1) {
                    this.loadGoodContrastEchart(this.refs.priceSet2,this.props.goodContrastData.info.priceSet);
                    this.loadGoodContrastEchart(this.refs.salesSet2,this.props.goodContrastData.info.salesSet);
                    this.loadGoodContrastEchart(this.refs.reviewSet2,this.props.goodContrastData.info.reviewSet);
                }
            })
        }
    }

    // 载入对比商品数据
    loadGoodContrastEchart = (id,seriesData) => {

        if (id) {
            // 初始化Echart
            let myChart = echarts.init(id);
            // 获取日期表
            let sevenDays = this.props.goodContrastData.info.sevenDays

            // 绘制图表
            myChart.setOption({
                    tooltip: {},
                    legend: {
                    },
                    xAxis: {
                        splitNumber: 2,  
                        scale: true,  
                        show:false,  
                        axisLabel:{
                            interval:0
                        },
                        splitLine:{  
                    　　　　show:false  
                    　　} ,
                        data: sevenDays
                    },
                    yAxis: {
                        type : 'value',  
                        splitNumber: 2,  
                        scale: true,  
                        show:false,  
                        splitLine:{  
                    　　　　show:false  
                    　　 } 
                    },
                    series: [{
                        name: '销量',
                        type: 'line',
                        itemStyle : {  
                                normal : {  
                                    color:'#29a5fe',
                                    lineStyle:{  
                                        color:'#29a5fe'  
                                    }
                                }  
                            },  
                        data: seriesData
                    }]
            });
        }
        else{
            //console.log('not id')
        }
    }


    // 隐藏自定义列弹框
    showCustomRowModal = () => {
        this.setState({
            customRowVisible: true
        })
    }

    // 显示自定义列弹框
    hideCustomRowModal = () => {
        this.setState({
            customRowVisible: false
        })
    }


    // 显示竞品列弹框
    showCustomGoodsModal = () => {
        this.setState({
            customGoods: {
                visible: true
            }
        })
    }

    // 隐藏竞品列弹框
    hideCustomGoodsModal = () => {
        this.setState({
            customGoods: {
                visible: false
            }
        })
    }

    // 选择操作:对比 or 趋势图
    onClickSelct = (obj,item) => {
        // 趋势图
        if (item.key == 1) {
            this.showGoodsEchartModal(obj.pid)
        }
        else if(item.key == 0) {
            this.showGoodsContrastTable(obj.pid,obj.sku);
        }
    }


    // 显示主体商品趋势图
    showGoodsEchartModal = (pid) => {

        // 显示弹框
        this.setState({
            goodsEchartVisible: true,
            goodsEchartPid: pid
        });

        // 参数
        let args = {
            pid:pid,
            startTime:startTime,
            endTime:endTime
        }

        // 请求数据
        this.props.getGoodsEcharData(args); 
        
    }
    // 隐藏主体商品趋势图
    hideGoodsEchartModal = () => {
        this.setState({
            goodsEchartVisible: false 
        })
    }

    // 载入Echart图
    loadEchart = () => {
        if (this.refs.echartId) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.refs.echartId);

            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:this.props.goodsEchartData.legendData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.props.goodsEchartData.xAxisData,
                },
                yAxis: {
                    type: 'value'
                },
                series: this.props.goodsEchartData.seriesData,
            });
        }   
    }

    // 选择控件日期，获取趋势图数据
    getGoodsEcharData = (date, dateString) => {
        // 参数
        let args = {
            pid:this.state.goodsEchartPid,
            startTime:dateString[0],
            endTime:dateString[1]
        }

        // 请求数据
        this.props.getGoodsEcharData(args);
        
        this.loadEchart(); 
    }


    // 最近N天
    onLatelyDate = (dayCount) => {
        // 今天日期
        let currentDate = moment().format('YYYY-MM-DD');
        // daycount 前的日期
        let latelyDate = moment().subtract(dayCount, "days").format("YYYY-MM-DD");

        // 赋值给文本框
        this.setState({
            defaultStartDate:latelyDate,
            defaultEndDate:currentDate,
        })


        // 参数
        let args = {
            pid:this.state.goodsEchartPid,
            startTime:latelyDate,
            endTime:currentDate
        }

        // 请求数据
        this.props.getGoodsEcharData(args);
        
        this.loadEchart(); 

    }

    // 限制日期控件只能选今天或今天前的日期
    disabledDate(current) {
      return current && current.valueOf() > Date.now();
    }


    // 自定义竞品-单项
    onCustomChange = (checkedList) => {
        this.setState({
            customGoods: {
                visible: true,
                checkedList,
                indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
                checkAll: checkedList.length === plainOptions.length,
            }

        });
    }

    // 自定义竞品-全选
    onCheckAllChange = (e) => {
        this.setState({
            customGoods: {
                visible: true,
                checkedList: e.target.checked ? plainOptions : [],
                indeterminate: false,
                checkAll: e.target.checked,
            }
        });
    }

    // 自定义竞品-确定选项
    onCustomOK = () => {
        let list = this.state.customGoods.checkedList;
        //console.log(list);
        
        // 关闭弹窗
        this.setState({
            customGoods: {
                visible: false,
            }
        });
    }


}

export default GoodsList;
