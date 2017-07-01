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
import { Table, Pagination, Icon, Menu, Dropdown, 
    Button, message, Modal, DatePicker, Checkbox, Select, Radio,Spin } from 'antd';


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

            goodsEchartVisible:false,
            goodsEchartPid:0,
            goodsEchartRadioValue:1,
        }

    }

    render() {
        
        // 主表Columns
        const tableColumns = [
            {
                title: "主图",
                key: "img_url",
                render: (text, record) => (<img src={ record.img_url} className={ styles.img } />),
            }, {
                title: "编码",
                dataIndex: "sku",
                key: "sku",
            }, {
                title: "操作",
                dataIndex: "pid",
                render: (text, record) => (
                   <Dropdown overlay={this.tableColumnsMenu(record.pid)}>
                        <Button>
                          操作 <Icon type="down" />
                        </Button>
                  </Dropdown>
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
                key: "price",
                sorter: (a, b) => a.price - b.price,
            }, {
                title: "销量",
                dataIndex: "sales",
                key: "sales",
                sorter: (a, b) => a.sales - b.sales,
            }, {
                title: "评分",
                dataIndex: "score",
                key: "score",
                sorter: (a, b) => a.score - b.score,
            }, {
                title: "评论数",
                dataIndex: "reviews",
                key: "reviews",
                sorter: (a, b) => a.reviews - b.reviews,
            }, {
                title: "关注数",
                dataIndex: "favorites",
                key: "favorites",
                sorter: (a, b) => a.favorites - b.favorites,
            }, {
                title: "提问数",
                dataIndex: "questions",
                key: "questions",
                sorter: (a, b) => a.questions - b.questions,
            }, {
                title: "分类",
                dataIndex: "cateName",
                key: "cateName",
                className: styles.columnCate
            },
        ]

        return (
            <div className={ styles.main }>

				{ /* 操作栏 start*/ }
            	<div className={ styles.clear } style={{ paddingBottom:20 }}>
            		
            		{/*<RangePicker
				      ranges={{ 今天: [moment(), moment()],
				      	'本周': [moment(), moment().endOf('week')], 
				      	'本月': [moment(), moment().endOf('month')] }}
				      	format="YYYYMMDD"
				      	style={{width:240}}
				      onChange={this.onSearchDateQuantum.bind(this)}

				    />*/}

				    <Button className={styles.fr} onClick={ this.showCustomRowModal }>自定义列</Button>
            		<Button className={styles.fr} onClick={ this.showCustomGoodsModal } style={{marginRight:10}}>自定竞品</Button>
            		<Button className={styles.fr} style={{marginRight:10}}><Link to='/create'>创建关系</Link></Button>
                    
            		{/*自定义列弹框 star*/}
				    <Modal
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
			        </Modal>
			    	{/*自定义列弹框 end*/}

			    	{/*自定义竞品弹框 star*/}
			        <Modal
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
			        </Modal>
			    	{/*自定义竞品弹框 end*/}

                    {/*主商品趋势图弹框 star*/}
                    <Modal
                        title="主体商品的趋势图"
                        visible={this.state.goodsEchartVisible}  
                        onCancel={this.hideGoodsEchartModal} 
                        okText="确认"
                        cancelText="取消"
                        footer={null}
                        width={800}
                        >
                        <div style={{ }}>
                            <div>
                                {
                                    /*<div style={{display:'inline-block',height:40, width:'60%',verticalAlign:'top'}}>
                                    <RadioGroup onChange={ this.selectOption.bind(this) } value={this.state.goodsEchartRadioValue}>
                                        <Radio value={1}>价格</Radio>
                                        <Radio value={2}>销量</Radio>
                                        <Radio value={3}>评论</Radio>
                                        <Radio value={4}>评分</Radio>
                                        <Radio value={5}>关注</Radio>
                                    </RadioGroup>
                                     </div>*/

                                }

                                <div style={{display:'inline-block',
                                    height:40,}}>
                                    <RangePicker onChange={ this.getGoodsEcharData }
                                        defaultValue={[
                                            moment().startOf('month'), 
                                            moment().endOf('month')
                                        ]}  
                                        ranges={{ 今天: [moment(), moment()],
                                        '本周': [moment(), moment().endOf('week')], 
                                        '本月': [moment(), moment().endOf('month')] }}
                                        format="YYYY-MM-DD"
                                        style={{width:240, margin:'0 auto'}}
                                        ref='echartTime'
                                    />
                                </div>
                            </div>
                            <div style={{width:768,height:550,position:'relative'}}>
                                { 
                                    this.props.goodsEchartDataLoading==false?
                                    <div style={{width:768,height:550,textAlign:'center',position:'absolute',background:'rgba(49,151,235,0.1)',zIndex:1000}}>
                                        <Spin tip="Loading..." style={{ marginTop:250 }}/>
                                    </div>
                                    :null
                                }
                                <div id="echartId" ref='echartId' style={{width:768,height:500,margin:'0 auto'}}></div>
                                
                            </div>
                        </div>
                    </Modal>
                    {/*主商品趋势图弹框 end*/}

            	</div>
            	{ /* 操作栏 end*/ }

            	<div className={ styles.tableWrap }>

					{ /* 数据列表 start */ }
					<Table 
						dataSource={ this.props.data.list }
						loading={ this.props.loading } 
						pagination={false} 
						columns={tableColumns}
						indentSize = {30}

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
			</div>
        )
    }

    // 主表Columns里面的menu
    tableColumnsMenu(record){
        return (
            <Menu onClick={this.onClickSelct.bind(this,record)}>
                <Menu.Item key="0">
                  <a rel='xx' href="javascript:;">对比</a>
                </Menu.Item>
                <Menu.Item key="1">
                  <a rel='xx' href="javascript:;">趋势图</a>
                </Menu.Item>
            </Menu>
        )
    }

    // 数据变动，渲染完成后，执行
    componentDidUpdate(prevProps, prevState) {
        if (this.props.goodsEchartDataLoading) {
            this.loadEchart();
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
    onClickSelct = (pid,item) => {
        // 趋势图
        if (item.key==1) {
            this.showGoodsEchartModal(pid)
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
        console.log('loadEchart')
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

    // 根据pid与时间获取主商品的趋势图
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
