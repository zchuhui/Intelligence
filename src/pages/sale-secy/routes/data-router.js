
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import styles from '../views/sale-secy.less';
import Saleroom from '../views/saleroom';
import ReferenceIndex from '../views/reference-index';
import GoodsRank from '../views/goods-rank';
import Category from '../views/category';
import Correlation from '../views/correlation';
import { Spin } from 'antd';
import moment from 'moment';

class DataRouter extends React.Component {
	
	state = {
		date:moment().format('YYYY-MM-DD'),
	}

	render() {
		return (
			<MainLayout headerMenuText="销售秘书">
				<div className={styles.title}>
					<span>销售秘书</span>
				</div>
				
				<div className={styles.main}>
					{
						// 判断加载状况
						this.props.loading ?
							<div className={styles.loadWrap}>
								<Spin tip="加载中..." style={{ marginTop: '20%' }} />
							</div>
							: 
							<div>
								{/* 销售信息 */}
								<Saleroom 
									productTotal={this.props.productTotal}
									salesAmount={this.props.salesAmount} 
									salesSum={this.props.salesSum}
									changeRate={this.props.changeRate}
									productNew={this.props.productNew}

									getsaleSecyInfoToDate={time => this.getsaleSecyInfoToDate(time)}
									getDate={date => this.getDate(date)}
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
	 * 获取子组件的日期值
	 * @param {*} date 
	 */
	getDate(date){
		this.setState({
			date:date,
		});
	}

	/**
	 * 切换时间更新数据
	 * @param {*} time 
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
	 * @param {*} cid 
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


}

function mapStateToProps(state) {
	return { ...state.SaleSecyModel };
}

export default connect(mapStateToProps)(DataRouter);