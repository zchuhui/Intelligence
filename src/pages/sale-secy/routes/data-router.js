
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import styles from '../views/sale-secy.less';
import Saleroom from '../views/saleroom';
import ReferenceIndex from '../views/reference-index';
import GoodsRank from '../views/goods-rank';
import Category from '../views/category';
import Correlation from '../views/correlation';

class DataRouter extends React.Component {

	render() {
		return (
			<MainLayout  headerMenuText="销售秘书">
				<div className={ styles.title }>
                    <span>销售秘书</span>
                </div>
				<div className={styles.main}>

					{/* 销售信息 */} 
					<Saleroom 
						productTotal = {this.props.productTotal}
						salesAmount = {this.props.salesAmount}
						salesSum = {this.props.salesSum}
						changeRate= {this.props.changeRate}
						productNew={this.props.productNew}
					/>
					{/* 参考指标 */}
					<ReferenceIndex 
						basket = {this.props.basket}
						favorites = {this.props.favorites}
						visitor = {this.props.visitor}
						pageView = {this.props.pageView}
					/>
					{/* 商品排名 */}
					<GoodsRank />
					{/* 类目情况 */}
					<Category />
					{/* 对比关系 */}
					<Correlation />

				</div>
				
			</MainLayout>
		)
	}
}

function mapStateToProps(state){
	console.log('salemodel:',state.SaleSecyModel);
	return {...state.SaleSecyModel};
}

export default connect(mapStateToProps)(DataRouter);