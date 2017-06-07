import React,{ Component } from 'react';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, InputNumber, Select, Tag } from 'antd';
import moment from 'moment';
import styles from './Searcher.less';

const { MonthPicker, RangePicker } = DatePicker;
const InputGroup = Input.Group;
const dateFormat = "YYYY-MM-DD";

const log = ({ item,key }) => {
   console.log(`点击了菜单${key}`);
   let text = item.props.children.props.children;

}

// 站点
const menu = (
	<Menu onClick={ log }>
		<Menu.Item key="keid1">
			<span>menu item1</span>
		</Menu.Item>
		<Menu.Item key="keid2">
			<span>menu item2</span>
		</Menu.Item>
		<Menu.Item key="keid3">
			<span>menu item3</span>
		</Menu.Item>
		<Menu.Item key="keid4">
			<span>menu item4</span>
		</Menu.Item>
	</Menu>
)


class Searcher extends Component {
	
	constructor(props, context) {
        super(props, context);

        this.state = {
        	arguments:{
        		site:'棒谷',      
				cid:null,       
				bid:null,       
				status:null,    
				startTime:null, 
				endTime:null,	
				price1:null,
				price2:null,
				sku:null,
        	}
        }
    }

    handlerClick(){
    	this.props.searchClick('i love you');
    }
    
	render() {
		return (
			<div className={ styles.searchWrap}>
				<div className={ styles.searchLeft }>
					<Dropdown overlay={ menu } trigger={['click']}>
						<Button style={{ marginRight:10, marginBottom:10}}> 
							{ 
								this.state.arguments.site != null
								? this.state.arguments.site
								: "站点"
							} <Icon type="down" />
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
					</div>
				</div>
				<div className={ styles.searchRight }>
					<Button type="primary" style={{ width: 100 }} onClick={ this.handlerClick }>搜索</Button>

					<InputGroup compact className={styles.dateGroup}>
						<Button style={{ marginLeft:10, pointerEvents: 'none' }}> 
							抓取时间
						</Button> 
						
					    <RangePicker
					      ranges={{ 今天: [moment(), moment()],本周: [moment(), moment().endOf('week')], '本月': [moment(), moment().endOf('month')] }}
					      format="YYYY/MM/DD"
					      style={{width:240}}
					    />
					</InputGroup> 
				</div>

				{ /*传参数进来*/ }
				{/*<p>{this.props.searchArguments.com}</p>*/}

			</div>
			
		);
	}

	componentDidMount() {
		/*setTimeout(() => {
	      this.props.transferMsg('end')
	    }, 1000);*/
	}
}

export default Searcher;
