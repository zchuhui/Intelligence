import React from 'react';
import { Table, Pagination, Icon, Menu, Dropdown, Button, message, Modal, DatePicker } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './CompeteTable.less';

import { PAGE_SIZE } from '../../../../constants/constant';

const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker } = DatePicker;

const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}];


const menu = (
    <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">批量对比</Menu.Item>
    <Menu.Item key="2">批量关联</Menu.Item>
    <Menu.Item key="3">取消批量</Menu.Item>
  </Menu>
)


let argument = {
    site: null,
    cid: null,
    bid: null,
    status: null,
    startTime: null,
    endTime: null,
    price1: null,
    price2: null,
    sku: null,
    page: 1
}

function handleMenuClick() {}


class CompteTable extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        // 自定义弹框
        visible: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    // 搜索
    handleSearch = (query) => {
        this.props.dispatch({
            type: 'CompeteGoods',
            payload: query,
        })
    }

    /*handlerClick(){
      this.props.searchClick('i love you');
    }*/

    // 分页
    pageChangeHandler(page) {
        this.props.dispatch(routerRedux.push({
            pathname: '/',
            query: { page },
        }));
    }

    /* 渲染模块 */
    render() {
        return (
            <div>
                <div className={ styles.main } > 

	            	{ /* 操作栏 */ }
	            	<div className={ styles.clear } style={{ paddingBottom:20 }}>
	            		<RangePicker
					      ranges={{ 今天: [moment(), moment()],本周: [moment(), moment().endOf('week')], '本月': [moment(), moment().endOf('month')] }}
					      format="YYYY/MM/DD"
					      style={{width:240}}
					    />
					    <Button type="primary" className={styles.fr} onClick={ this.showModal }>自定义列</Button>
	            		<Button type="primary" className={styles.fr} onClick={ this.handlerClick } style={{marginRight:10}}>批量操作</Button>

					    <Modal
				          title="自定义列"
				          visible={this.state.visible}  
				          onOk={this.handleOk}
				          onCancel={this.handleCancel} 
				          >
				          <p>Some contents...</p>
							
				        </Modal>

	            	</div>
					
					{ /*表格*/ }
					<Table dataSource={ this.props.data.list } pagination={false} bordered>
						<Column
					      title="主图"
					      key="img_url"
					      render={(text,record) => (
								<img src={ record.img_url} style={{ width:80, height:80}} />
					      )}
					    />
					    <Column
					      title="SKU"
					      dataIndex="sku"
					      key="sku"
					    />
					    <Column
					      title="操作"
					      dataIndex="address"
					      key="address"
					    />
					    <Column
					      title="标题"
					      dataIndex="pname"
					      key="pname"
					    />
					     <Column
					      title="价格"
					      dataIndex="price"
					      key="price"
					    />
					     <Column
					      title="销量"
					      dataIndex="sales"
					      key="sales"
					    />
					     <Column
					      title="评分"
					      dataIndex="score"
					      key="score"
					    />
					     <Column
					      title="评论数"
					      dataIndex="reviews"
					      key="reviews"
					    />
					     <Column
					      title="关注数"
					      dataIndex="favorites"
					      key="favorites"
					    />
					    <Column
					      title="提问数"
					      dataIndex="questions"
					      key="questions"
					    />
					    <Column
					      title="站点"
					      dataIndex=""
					      key="site"
					    />
					    
					  </Table>
					
					{/*分页*/}
					<Pagination
			          className="ant-table-pagination"
			          showQuickJumper 
			          total={this.props.data.page.count} 
			          current={this.props.data.page.page}
			          pageSize={PAGE_SIZE} 
			          onChange={this.pageChangeHandler}
			        />
				</div>
        	</div>

        )
    }

}


export default CompteTable
