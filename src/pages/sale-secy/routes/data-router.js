
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';

class DataRouter extends React.Component {

	render() {
		return (
			<MainLayout>
				小秘书
			</MainLayout>
		)
	}
}

function mapStateToProps(state){

}

export default connect(mapStateToProps)(DataRouter);