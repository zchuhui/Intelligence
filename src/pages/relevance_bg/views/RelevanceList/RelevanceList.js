import React from 'react';
import styles from './RelevanceList.less';
import moment from 'moment';
import { Table, Pagination, Icon, Menu, Dropdown, Button, message, Modal, DatePicker, Checkbox } from 'antd';

const { Column, ColumnGroup } = Table;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;


const plainOptions = ['环球', '速卖通', '兰亭集势','DX','亚马逊','Tom Top'];
const defaultCheckedList = [];


class RelevanceList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customRowVisible: false, // 自定列

            customGoods: {
                visible: false, // 自定义竞品

            },

            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        }
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

    
    render() {
        return (
            <div className={ styles.main }>
				{ /* 操作栏 */ }
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

            	<div className={ styles.tableWrap }>
						{ /*表格*/ }
						<Table 
							dataSource={ this.props.data.list } 
							loading={ this.props.loading } 
							pagination={false} 
							>
							<Column
						      title="主图"
						      key="img_url"
						      render={(text,record) => (
									<img src={ record.img_url} className={ styles.img } />
						      )}
						    />
						    <Column
						      title="编码"
						      dataIndex="sku"
						      key="sku"
						    />
						    {/*<Column
						      title="操作"
						      dataIndex="address"
						      key="address"
						    />*/}
						    <Column
						      title="站点"
						      dataIndex="site"
						      key="site"
						    />
						    <Column
						      title="标题"
						      dataIndex="pname"
						      key="pname"
						      className={ styles.columnTitle }
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
						      title="分类"
						      dataIndex="cateName"
						      key="cateName"
						      className={ styles.columnCate }
						    />
						  </Table>
						
						<div className={styles.piginationWrap}>
							{/*分页*/}
							<Pagination
					          className="ant-table-pagination"
					          showQuickJumper 
					          total={parseInt(this.props.data.page.count)} 
					          current={this.props.data.page.page}
					          pageSize={this.props.data.page.pageSize}
					          onChange={this.props.changePagination.bind(this)}
					        />
						</div>
					</div>
			</div>
        )
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
