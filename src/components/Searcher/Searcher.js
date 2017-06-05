import React,{ Component } from 'react';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, Select } from 'antd';
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
);

class Searcher extends Component {
	render() {
		return (
			<div className={ styles.searchWrap}>
				<Dropdown overlay={ menu } trigger={['click']}>
					<Button style={{ marginLeft:0 }}> 
						站点 <Icon type="down" />
					</Button>
				</Dropdown>
				<Dropdown overlay={ menu } trigger={['click']}>
					<Button style={{ marginLeft:10 }}> 
						分类 <Icon type="down" />
					</Button>
				</Dropdown>
				<Dropdown overlay={ menu } trigger={['click']}>
					<Button style={{ marginLeft:10 }}> 
						品牌 <Icon type="down" />
					</Button>
				</Dropdown>
				<Dropdown overlay={ menu } trigger={['click']}>
					<Button style={{ marginLeft:10 }}> 
						关联状态 <Icon type="down" />
					</Button>
				</Dropdown>
				<InputGroup compact className={styles.dateGroup}>
					<Button style={{ marginLeft:10 }}> 
						抓取时间
					</Button> 
					<RangePicker
				      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
				      format={dateFormat} 
				    />
				</InputGroup>

			</div>
			
		);
	}
}

export default Searcher;
