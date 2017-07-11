
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import Saleroom from '../views/saleroom';
import styles from '../views/sale-secy.less';


class DataRouter extends React.Component {

	render() {
		return (
			<MainLayout>
				<div className={ styles.title }>
                    <span>销售秘书</span>
                </div>
				<div className={styles.main}>
					

					<Saleroom />


				</div>
				
			</MainLayout>
		)
	}
}

function mapStateToProps(state){

}

export default connect(mapStateToProps)(DataRouter);