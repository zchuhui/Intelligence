import React from 'react';
import { Table, Icon, Menu, Dropdown, Button, message, Modal } from 'antd';
import styles from './competeTable.less';

const { Column, ColumnGroup } = Table;


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

function handleMenuClick() {}


class CompteTable extends React.Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
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

    render() {
        return (
            <div className={ styles.main } >
				
            	<div className={ styles.clear } style={{ paddingBottom:20 }}>
				    <Button type="primary" className={styles.fr} onClick={this.showModal}>自定义列</Button>

            		<Dropdown overlay={menu}>
				      <Button type="primary" className={styles.fr} style={{ marginRight: 15 }} >
				        批量操作 <Icon type="down" />
				      </Button>
				    </Dropdown>

				     <Modal
			          title="自定义列"
			          visible={this.state.visible}  
			          onOk={this.handleOk}
			          onCancel={this.handleCancel} 
			        >
			          <p>Some contents...</p>
<<<<<<< HEAD
			          <p>Some contents...</p>
			          <p>Some contents...</p>
						
=======
						 
>>>>>>> batch-1
			        </Modal>
            	</div>

				<Table dataSource={data} bordered>
					<Column
				      title="主图"
				      dataIndex="firstName"
				      key="firstName"
				    />
				    <Column
				      title="SKU"
				      dataIndex="age"
				      key="age"
				    />
				    <Column
				      title="操作"
				      dataIndex="address"
				      key="address"
				    />
				    <Column
				      title="标题"
				      dataIndex=""
				      key=""
				    />
				     <Column
				      title="价格"
				      dataIndex=""
				      key=""
				    />
				     <Column
				      title="销量"
				      dataIndex=""
				      key=""
				    />
				     <Column
				      title="评分"
				      dataIndex=""
				      key=""
				    />
				     <Column
				      title="评论数"
				      dataIndex=""
				      key=""
				    />
				     <Column
				      title="关注数"
				      dataIndex=""
				      key=""
				    />
				    <Column
				      title="提问数"
				      dataIndex=""
				      key=""
				    />
				    <Column
				      title="站点"
				      dataIndex=""
				      key=""
				    />
				    
				  </Table>


			</div>
        )
    }
}


export default CompteTable
