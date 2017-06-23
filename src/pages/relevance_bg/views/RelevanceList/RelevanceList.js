/**
 * BG关联表
 * Date: 2017-06-19
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './RelevanceList.less';
import moment from 'moment';
import { Table, Pagination, Icon, Menu, Dropdown, Button, message, Modal, DatePicker, Checkbox } from 'antd';

const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;


const plainOptions = ['环球', '速卖通', '兰亭集势', 'DX', '亚马逊', 'Tom Top'];
const defaultCheckedList = [];


const tableColumns = [
	{
		title:"主图",
		key:"img_url", 
		render:(text,record) => (<img src={ record.img_url} className={ styles.img } />),
	},
	{
		title:"编码",
		dataIndex:"sku",
		key:"sku", 
	},
	{
		title:"操作",
		dataIndex:"",
		key:"", 
	},
	{
		title:"站点",
		dataIndex:"site",
		key:"site", 
	},
	{
		title:"标题",
		dataIndex:"pname",
		key:"pname", 
		className:styles.columnTitle 
	},
	{
		title:"价格",
		dataIndex:"price",
		key:"price", 
	},
	{
		title:"销量",
		dataIndex:"sales",
		key:"sales", 
	},
	{
		title:"评分",
		dataIndex:"score",
		key:"score", 
	},
	{
		title:"评论数",
		dataIndex:"reviews",
		key:"reviews", 
	},
	{
		title:"关注数",
		dataIndex:"favorites",
		key:"favorites", 
	},
	{
		title:"提问数",
		dataIndex:"questions",
		key:"questions", 
	},
	{
		title:"分类",
		dataIndex:"cateName",
		key:"cateName", 
		className:styles.columnCate
	},

]

//const expandedRowRender = record => <p>{record.description}</p>;

// 测试
/*const columns = [
	{
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	  width: '40%',
	}, {
	  title: 'Age',
	  dataIndex: 'age',
	  key: 'age',
	  width: '30%',
	}, {
	  title: 'Address',
	  dataIndex: 'address',
	  key: 'address',
	}
];

const data = 
[
	{
	  key: 1,
	  name: 'John Brown sr.',
	  age: 60,
	  address: 'New York No. 1 Lake Park',
	  children: [{
	    key: 11,
	    name: 'John Brown',
	    age: 42,
	    address: 'New York No. 2 Lake Park',
	  }, {
	    key: 12,
	    name: 'John Brown jr.',
	    age: 30,
	    address: 'New York No. 3 Lake Park',
	    children: [{
	      key: 121,
	      name: 'Jimmy Brown',
	      age: 16,
	      address: 'New York No. 3 Lake Park',
	    }],
	  }, {
	    key: 13,
	    name: 'Jim Green sr.',
	    age: 72,
	    address: 'London No. 1 Lake Park',
	    children: [{
	      key: 131,
	      name: 'Jim Green',
	      age: 42,
	      address: 'London No. 2 Lake Park',
	      children: [{
	        key: 1311,
	        name: 'Jim Green jr.',
	        age: 25,
	        address: 'London No. 3 Lake Park',
	      }, {
	        key: 1312,
	        name: 'Jimmy Green sr.',
	        age: 18,
	        address: 'London No. 4 Lake Park',
	      }],
	    }],
	  }],
	}, 
	{
	  key: 2,
	  name: 'Joe Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	}
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
*/

class RelevanceList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            customRowVisible: false, // 自定列

            // 自定义竞品
            customGoods: {
                visible: false, 
            },
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,

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
					            indeterminate={this.state.indeterminate}
					            onChange={this.onCheckAllChange}
					            checked={this.state.checkAll}
					          >
					            全选
					          </Checkbox>
					        </div>
					        <div style={{ maxWidth:400,margin:'20px 0' }}>
					       	    <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
					        </div>
					        <div style={{ textAlign:'center'}}><Button type='primary'>确定</Button></div>
			        	</div>
						
			        </Modal>

            	</div>
            	{ /* 操作栏 end*/ }

            	<div className={ styles.tableWrap }>
            		{
					  	  this.props.data.list.map((i,index)=>{
					  	  	<p>{i.cid}</p> 
					  	  })
					}

					{ /* 数据列表 start */ }
					<Table 
						dataSource={ this.props.data.list }
						loading={ this.props.loading } 
						pagination={false} 
						columns={tableColumns}
						>
						
					  </Table>


					  {/*<Table 
						  columns={columns}
						  dataSource={data}
						  rowSelection={rowSelection}
						>
						
					  </Table>*/}


					{ /* 数据列表 end */ }

					<div className={styles.piginationWrap}>
						{/* 分页 start*/}
						<Pagination
				          className="ant-table-pagination"
				          showQuickJumper 
				          total={parseInt(this.props.data.page.count)} 
				          current={this.props.data.page.page}
				          pageSize={this.props.data.page.pageSize}
				          onChange={this.props.changePagination.bind(this)}
				        />
				    	{/* 分页 end */}
					</div>
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

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,

        });
    }
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,

        });
    }
}

export default RelevanceList;
