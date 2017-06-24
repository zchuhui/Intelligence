/**
 * BG关联表
 * Date: 2017-06-19
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './RelevanceList.less';
import moment from 'moment';
import { Table, Pagination, Icon, Menu, Dropdown, Button, message, Modal, DatePicker, Checkbox, Select } from 'antd';

const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;


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
        dataIndex: "",
        render: (text, record) => (
            <Select defaultValue="操作">
				<Option value="0">对比</Option>
				<Option value="1">趋势图</Option>
			</Select>
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
        }
    }


    render() {

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
            		<Button className={styles.fr} onClick={ this.handlerClick } style={{marginRight:10}}>创建关系</Button>

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

					  {/*<Table 
						  columns={columns}
						  dataSource={data}
						  rowSelection={rowSelection}
						  expandedRowRender={expandedRowRender}
						> </Table>*/}
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
