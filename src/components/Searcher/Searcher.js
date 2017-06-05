import React,{ Component } from 'react';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, InputNumber, Select, Tag } from 'antd';
import moment from 'moment';
import styles from './Searcher.less';

const { MonthPicker, RangePicker } = DatePicker;
const InputGroup = Input.Group;
const dateFormat = "YYYY-MM-DD";

const menu = (
	<Menu>
		<Menu.Item key="0">
			<span>menu item</span>
		</Menu.Item>
		<Menu.Item key="1">
			<span>menu item</span>
		</Menu.Item>
		<Menu.Item key="2">
			<span>menu item</span>
		</Menu.Item>
		<Menu.Item key="3">
			<span>menu item</span>
		</Menu.Item>
	</Menu>
)

function log(e) {
  console.log(e);
}

class Searcher extends Component {
	render() {
		return (
			<div className={ styles.searchWrap}>
				<div className={ styles.searchLeft }>
					<Dropdown overlay={ menu } trigger={['click']}>
						<Button style={{ marginRight:10, marginBottom:10}}> 
							站点 <Icon type="down" />
						</Button>
					</Dropdown>
					<Dropdown overlay={ menu } trigger={['click']}>
						<Button style={{ marginRight:10, marginBottom:10}}> 
							分类 <Icon type="down" />
						</Button>
					</Dropdown>
					<Dropdown overlay={ menu } trigger={['click']}>
						<Button style={{ marginRight:10 }}> 
							品牌 <Icon type="down" />
						</Button>
					</Dropdown>
					<Dropdown overlay={ menu } trigger={['click']}>
						<Button style={{ marginRight:10, marginBottom:10}}> 
							关联状态 <Icon type="down" />
						</Button>
					</Dropdown>
					
					<InputGroup compact className={styles.dateGroup}>
						<Button style={{ marginLeft:10, pointerEvents: 'none'  }}> 
							价格
						</Button> 
						<InputNumber style={{ width: 80, textAlign: 'center' }} placeholder="区间" />
	          			<Input style={{ width: 24, borderLeft: 0, pointerEvents: 'none' }} placeholder="~" />
	          			<InputNumber style={{ width: 80, textAlign: 'center', borderLeft: 0,marginRight:10 }} placeholder="区间" />
	        			
					</InputGroup>
					<InputGroup compact className={styles.dateGroup}>
						<Button style={{ marginLeft:0, pointerEvents: 'none'  }}> 
							SKU
						</Button> 
	          			<Input style={{ width: 140 }} placeholder="sku" />
	        			<Button style={{ width: 60, }}>应用</Button>
					</InputGroup>
					

					<div>
						<Tag closable onClose={log}>Tag 2</Tag>
						<Tag closable onClose={log}>Tag 2</Tag>
						<Tag closable onClose={log}>Tag 2</Tag>
						<Tag closable onClose={log}>Tag 2</Tag>
					</div>
				</div>

				<div className={ styles.searchRight }>
					<Button type="primary" style={{ width: 100 }}>搜索</Button>

					<InputGroup compact className={styles.dateGroup}>
						<Button style={{ marginLeft:10, pointerEvents: 'none' }}> 
							抓取时间
						</Button> 
						<RangePicker
					      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
					      format={dateFormat} 
					      style={{ width:250 }}
					    />
					</InputGroup> 
				</div>
				

				
			</div>
			
		);
	}
}

export default Searcher;
