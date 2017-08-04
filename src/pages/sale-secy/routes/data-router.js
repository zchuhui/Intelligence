
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import styles from '../views/sale-secy.less';
import Saleroom from '../views/saleroom';
import ReferenceIndex from '../views/reference-index';
import GoodsRank from '../views/goods-rank';
import Category from '../views/category';
import Correlation from '../views/correlation';
import { Spin, DatePicker, Button, message } from 'antd';
import moment from 'moment';


class DataRouter extends React.Component {
	
	state = {
		date:moment(moment().format('YYYY-MM-DD')).subtract(1,"days").format("YYYY-MM-DD")  // 默认为前一天
	}

	render() {
		return (
			<MainLayout headerMenuText="销售秘书">

				<div className={styles.title}>
					<span>销售秘书</span>
				</div>
				
				{/* 各个模块 */}
				<div className={styles.main}>
					
					{
						// 判断加载状况
						this.props.loading ?
							<div className={styles.loadWrap}>
								<Spin tip="加载中..." style={{ marginTop: '20%' }} />
							</div>
							: 
							<div>
								{/* 日期切换 */}
								<div className={styles.dateWrap}>
									<DatePicker 
										value={moment(this.state.date)} 
										onChange={ this.onChangeDate.bind(this) } 
										disabledDate={this.disabledDate.bind(this)} 
										allowClear={false}
										showToday={false}
										/>
									<Button size="small" className={styles.toDay} onClick={this.onPrevOrNextDay.bind(this, 0)}>上一天</Button>
									<Button size="small" className={styles.toDay} onClick={this.onPrevOrNextDay.bind(this, 1)}>下一天</Button>
								</div>
								{/* 销售信息 */}
								<Saleroom 
									productTotal={this.props.productTotal}
									salesAmount={this.props.salesAmount} 
									salesSum={this.props.salesSum}
									changeRate={this.props.changeRate}
									productNew={this.props.productNew}

									getsaleSecyInfoToDate={time => this.getsaleSecyInfoToDate(time)}
									//getDate={date => this.getDate(date)}
								/>
								{/* 参考指标 */}
								<ReferenceIndex
									basket={this.props.basket}
									favorites={this.props.favorites}
									visitor={this.props.visitor}
									pageView={this.props.pageView}
								/>
								{/* 商品排名 */}
								<GoodsRank
									myProductRank={this.props.myProductRank}
								/>
								{/* 类目情况 */}
								<Category
									loading={this.props.cateLoading}
									cateSet={this.props.cateSet}
									myProductInCate={this.props.myProductInCate}
									productInCate={this.props.productInCate}
									myCateSalesFromPrice={this.props.myCateSalesFromPrice}

									getCategoryByCid={cid => this.getCategoryByCid(cid)}
								/> 
								{/* 对比关系 */}
								<Correlation
									loading={this.props.comparisonLoading}
									goodsComparisonList={this.props.goodsComparisonList} 
								/>
							</div>
					}
					
				</div>
			</MainLayout>
		)
	}


	/**
	 * 切换时间更新数据
	 * @param {Date} time 
	 */
	getsaleSecyInfoToDate(time) {
		this.props.dispatch({
			type: 'SaleSecyModel/getSaleSecyInfo',
			payload: {
				time: time
			}
		})
	}

	/**
	 * 获取类目信息
	 * @param {string} cid 
	 */
	getCategoryByCid(cid) {
		this.props.dispatch({
			type: 'SaleSecyModel/getRankAndCatetory',
			payload: {
				time:this.state.date,
				cid:cid,
			}
		});
	}



	/**
	 * 上一天、下一天
	 * @param {number} dayId 
	 */
	onPrevOrNextDay(dayId) {

		// 获取当前日期
		let currentDate = this.state.date;

		if (dayId == 0) {
			//上一天
			let provDay = moment(currentDate).subtract(1,"days").format("YYYY-MM-DD");

			// 更新到state
			this.setState({date: provDay});
			
			// 请求数据
			this.getsaleSecyInfoToDate(provDay); 
		}
		else {
			if(currentDate == moment().format('YYYY-MM-DD')){
				message.warning("今天已经是最后一天啦");
			}
			else{
				//下一天
				let nextDay = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
				
				// 更新到state
				this.setState({
					date: nextDay
				});

				// 请求数据
				this.getsaleSecyInfoToDate(nextDay); 
			}
			
		}
	}

	/**
	 * 选择日期
	 * @param {Date} date 
	 * @param {Date} dateString 
	 */
	onChangeDate(date, dateString){
		if(dateString){
			this.setState({date:dateString});
			// 请求数据
			this.getsaleSecyInfoToDate(dateString); 
		}
	}

	/**
	 * 日历控件限制时间范围的函数
	 * @param {Date} current 
	 */
	disabledDate(current) {
		// Can not select days before today and today
		return current && current.valueOf() > Date.now();  
	}

}



function mapStateToProps(state) {
	//const {goodsComparisonList} = state.SaleSecyModel;
	//console.log(goodsComparisonList);
	return { ...state.SaleSecyModel };
}

export default connect(mapStateToProps)(DataRouter);