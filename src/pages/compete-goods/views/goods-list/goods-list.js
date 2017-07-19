import React from 'react';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { PAGE_SIZE } from '../../../../constants/constant';
import styles from './goods-list.less';
import { Table, Pagination, Icon, Menu, Dropdown, Button, message, Modal, DatePicker } from 'antd';

const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker } = DatePicker;


class GoodsList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    // 搜索时间段（未完成）
    onSearchDateQuantum(value, dateString) {
        let dateQuantum = {
            startTime: dateString[0],
            endTime: dateString[1]
        }

        this.props.handleSearchArgsToDate(dateQuantum);
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
                            :null
                        }
                       
                   </span>
                    
                ),
            }, {
                title: "编码",
                dataIndex: "sku",
                render:(text,record) => (
                    <div >
                        {
                            !record.isChildren?
                            <div>
                                {record.sku}
                                <div style={{ marginTop:5}}>
                                    {   
                                        // 是否关联，如果为关联，则显示关联连接
                                       record.relate_sku==0?
                                        <p><Icon type="exclamation-circle-o" style={{ color:'red',fontSize:14 }}/> &nbsp;未关联</p>
                                        :
                                        <p><Icon type="check-circle-o" style={{ color:'#79bb51',fontSize:14 }}/>&nbsp;已关联</p>
                                       
                                       /*  <Link  to={"/create/"+record.sku}><Icon type="exclamation-circle-o" style={{ color:'red',fontSize:14 }}/> &nbsp;未关联</Link>
                                        :
                                        <Link  to={"/create/"+record.sku}><Icon type="check-circle-o" style={{ color:'#79bb51',fontSize:14 }}/>&nbsp;已关联</Link> */
                                    }
                                </div>
                            </div>
                            :null
                        }
                        
                   </div>
                )
            },/* {
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
            }, */
            {
                title: "站点", 
                dataIndex: "site",
            }, {
                title: "标题",
                dataIndex: "pname",
                className: styles.columnTitle
            }, {
                title: "价格",
                dataIndex: "price",
                sorter:true,
            }, {
                title: "销量",
                dataIndex: "sales",
                sorter:true,
            }, {
                title: "评分",
                dataIndex: "score",
                sorter:true,
            }, {
                title: "评论数",
                dataIndex: "reviews",
                sorter:true,
            }, {
                title: "关注数",
                dataIndex: "favorites",
                sorter:true,
            }, {
                title: "提问数",
                dataIndex: "questions",
                sorter:true,
            }, {
                title: "分类",
                dataIndex: "cateName",
                className: styles.columnCate,
                render:(text,record) => (
                    <span>
                    {
                        record.cateName?
                        record.cateName.split('>').map((item,index) => <p key={index}>{item}</p>)
                        :
                        record.cateName
                    }
                    </span>
                )
            },
        ]

        return (   

            <div>
                <div className={ styles.main } > 
                	
	            	{ /* 操作栏 */ }
	            	<div className={ styles.clear } style={{ paddingBottom:20 }}>
	            		
	            		{/*<RangePicker
					      ranges={{ 今天: [moment(), moment()],本周: [moment(), moment().endOf('week')], '本月': [moment(), moment().endOf('month')] }}
					      format="YYYYMMDD"
					      style={{width:240}}
					      onChange={this.onSearchDateQuantum.bind(this)}

					    />*/}
					   {/* <Button type="primary" className={styles.fr} onClick={ this.showModal }>自定义列</Button>
	            		<Button type="primary" className={styles.fr} onClick={ this.handlerClick } style={{marginRight:10}}>批量操作</Button>*/}

					    {/*<Modal
				          title="自定义列"
				          visible={this.state.visible}  
				          onOk={this.handleOk}
				          onCancel={this.handleCancel} 
				          >
				          <p>Some contents...</p>
							
				        </Modal>*/}

	            	</div>
					
					<div className={ styles.tableWrap }>
						{ /* 数据列表 start */ }
						<Table 
							expandedRowRender={this.expandedRowRender}
							dataSource={ this.props.data.list } 
							loading={ this.props.loading } 
							columns={tableColumns}
							pagination={false} 
                            rowKey = {record => record.sku } 
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
					          pageSize={PAGE_SIZE}
					          onChange={this.props.handlePagination.bind(this)}
					        />
						</div>
						{/* 分页 end*/}

					</div>
				</div>
        	</div>

        )
    }

    // 获取表格的排序、筛选信息，并进行排序
    handleTableChange = (pagination, filters, sorter) =>{
        if(sorter.order == 'ascend'){
            this.props.handleTableChange(`${sorter.field}-asc`);
        }else if(sorter.order == 'descend'){
            this.props.handleTableChange(`${sorter.field}-desc`);
        }
    }

}


export default GoodsList
