import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import CreateRelevance from '../views/create-relevance/create-relevance';
import styles from '../views/create-relevance/create-relevance.less';

class CreateRelevanceDataRouter extends React.Component {
	
	render() {
		return (
			<MainLayout headerMenuText="销售秘书">
				<div className={styles.mainWrap}>
					<CreateRelevance 
						createRelevanceLoading = {this.props.createRelevanceLoading}
						goods = {this.props.goods}
						goodsBySite = {this.props.goodsBySite}
						similarGoodsList = {this.props.similarGoodsList}
						relevanceGoodsList = {this.props.relevanceGoodsList}
						setRevanceStatus = {this.props.setRevanceStatus}
					/>
				</div>
			</MainLayout>
		);
	}

}


function mapStateToProps(state) {
	return { ...state.CreateRelevanceModel };
}

export default connect(mapStateToProps)(CreateRelevanceDataRouter);