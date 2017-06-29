/**
 * BG关联表
 * Date: 2017-06-19
 * Author: zhuangchuhui
 */

import React from 'react';
import { Link } from 'dva/router';
import styles from './RelevanceList.less';
import moment from 'moment';
import echarts from 'echarts';
import { Table, Pagination, Icon, Menu, Dropdown, 
    Button, message, Modal, DatePicker, Checkbox, Select,Radio  } from 'antd';


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



class RelevanceList extends React.Component {

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
            goodsEchartRadioValue:1,
        }

    }

    render() {

        const menu = (
          <Menu onClick={this.onClickSelct.bind(this)}>
            <Menu.Item key="0">
              <a rel='xx' href="javascript:;">对比</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a rel='xx' href="javascript:;">趋势图</a>
            </Menu.Item>
          </Menu>
        )

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
                   <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={this.showGoodsEchartModal.bind(this,record.pid)} href="javascript:;">
                      趋势图 <Icon type="down" />
                    </a>
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
			        		2222222
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
                                <div style={{display:'inline-block',height:40, width:'60%',verticalAlign:'top'}}>
                                    <RadioGroup onChange={ this.selectOption.bind(this) } value={this.state.goodsEchartRadioValue}>
                                        <Radio value={1}>价格</Radio>
                                        <Radio value={2}>销量</Radio>
                                        <Radio value={3}>评论</Radio>
                                        <Radio value={4}>评分</Radio>
                                        <Radio value={5}>关注</Radio>
                                    </RadioGroup>
                                </div>
                                <div style={{display:'inline-block',
                                    height:40, width:'40%',verticalAlign:'top',
                                    textAlign:'center',borderLeft:'1px solid #eee'}}>
                                    <RangePicker
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
                            <div>
                                <div id="echartId" ref='echartId' style={{width:600,height:500,margin:'0 auto'}}></div>
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

    componentDidUpdate(prevProps, prevState) {
        console.log('update',this.props.goodsEchartData);
    }


    // 显示自定义列弹框
    hideCustomRowModal = () => {
        this.setState({
            customRowVisible: false
        })
    }

    // 隐藏自定义列弹框
    showCustomRowModal = () => {
        this.setState({
            customRowVisible: true
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

    // 显示竞品列弹框
    showCustomGoodsModal = () => {
        this.setState({
            customGoods: {
                visible: true
            }
        })
    }


    onClickSelct = (_this) => {
    }

    // 显示主体商品趋势图
    showGoodsEchartModal = (pid) => {

        this.setState({goodsEchartVisible: true  });

        const goodsPid = pid;

        let args = {
            pid:pid,
            startTime:startTime,
            endTime:endTime
        }

        this.props.getGoodsEcharData(args);


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
                    data:['邮件营销1','联盟广告','视频广告','直接访问','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['6.1','6.2','6.3','6.4','6.5','6.6','6.7']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销1',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            });
        } 
        
    }

    /*// 根据pid与时间获取主商品的趋势图
    getGoodsEcharData = (pid,startTime,endTime) => {
        this.props.dispatch({
            type:'RelevanceBG/fetchGoodsEchartByPidAndTime',
            payload:{
                pid:pid,
                startTime:startTime,
                endTime:endTime,
            },
        })
    }*/

    // 隐藏主体商品趋势图
    hideGoodsEchartModal = () => {
        this.setState({
            goodsEchartVisible: false 
        })
    }

    // 主商品趋势图单选项
    selectOption = (e) => {
        this.setState({
            goodsEchartRadioValue: e.target.value,
        });
    }

    // 单项选择竞品选项
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

    // 全选选择竞品选项
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

    // 确定竞品选项
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

export default RelevanceList;
