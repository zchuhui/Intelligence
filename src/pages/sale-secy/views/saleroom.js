/**
 * 销售秘书-销售额模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { DatePicker, Icon  } from 'antd';
import moment from 'moment';

class Saleroom extends React.Component{

	render(){
		return (
			<div className={styles.panel}>
				<div className={styles.dateWrap}>
					<DatePicker defaultValue={moment('2015/01/01', 'YYYY-MM-DD')} format={'YYYY-MM-DD'} />
				</div>
				<div>
					<span>你拥有 <b>9999</b> 件，</span> <span>环比增长 <span><Icon type="arrow-up" />11%</span></span>
				</div>
				<div className={styles.clear}>
					<div className={styles.saleroomContent}>
						<ul className={styles.clear}>
							<li>
								<h3>销售额</h3>
								<div>当天</div>
								<div>前天环比</div>
								<div>上周同比</div>
							</li>
							<li>
								<h3>销量</h3>
								<div>当天</div>
								<div>前天环比</div>
								<div>上周同比</div>
							</li>
							<li>
								<h3>转化率</h3>
								<div>当天</div>
								<div>前天环比</div>
								<div>上周同比</div>
							</li>
							<li>
								<h3>新品上架数</h3>
								<div>当天</div>
								<div>前天环比</div>
								<div>上周同比</div>
							</li>
						</ul>
						<div style={{width:920,height:240,background:'#acdaff'}}>
							echart
						</div>
					</div>
					<div className={styles.saleroomScore}>
						888fen
					</div>
				</div>
			</div>
		)
	}
}


export default Saleroom;