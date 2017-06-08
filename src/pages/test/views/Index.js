import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../../constants/constant';

/*import MainLayout from '../../../components/MainLayout/MainLayout';
import HomeTable from './HomeTable.js';*/

/*function IndexPage({ dispatch, list: dataSource, loading, total, page: current }) {

    function deleteHandler(id) {
        dispatch({
            type: 'users/remove',
            payload: id,
        });
    }

    // 分页
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
    }

    // 编辑
    function editHandler(id, values) {
        dispatch({
            type: 'users/patch',
            payload: { id, values },
        });
    }


    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="">{text}</a>,
    }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    }, {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
    }, {
        title: 'Operation',
        key: 'operation',
        render: (text, record) => (
            <span>
	          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
	            <a href="">Delete</a>
	          </Popconfirm>
	        </span>
        ),
    }, ];


    return (
        <div>
	        <Table
	          columns={columns}
	          dataSource={dataSource}
	          loading={loading}
	          rowKey={record => record.id}
	          pagination={false}
	        />
	        <Pagination
	          className="ant-table-pagination"
	          total={total}
	          current={current}
	          pageSize={PAGE_SIZE}
	          onChange={pageChangeHandler}
	        />
    	</div>
    );
}*/


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
}, {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
}, {
    title: 'Operation',
    dataIndex: 'website',
    key: 'operation',
}, 
{
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
}, 
]

class IndexPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
	
    // 分页
    pageChangeHandler(page) {
        this.props.dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
    }

    render() {
        return (
            <div>
            	 <Table columns={columns}
			        rowKey={record => record.registered}
			        dataSource={this.props.list}
			        pagination={false}
			      />
			      <Pagination
			          className="ant-table-pagination"
			          total={this.props.total}
			          current={this.props.current}
			          pageSize={PAGE_SIZE}
			          onChange={this.pageChangeHandler}
			        />
			        <div>total: { this.props.total }</div>

			        <div>{this.props.list.map((item,i) => <span>{item.phone}</span>)}</div>
	    	</div>
        );
    }

    componentDidMount() {
		console.log("Did");
		console.log(this.props.list);
	}
}


function mapStateToProps(state) {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
    };
}

export default connect(mapStateToProps)(IndexPage);
