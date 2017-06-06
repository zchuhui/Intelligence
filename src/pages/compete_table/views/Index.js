import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import CompeteTable from './CompeteTable/CompeteTable';

class CompteRoute extends React.Component {

	render(){
		return (
			<MainLayout>
	        	<CompeteTable />
	        </MainLayout>
		)
	}
}

CompteRoute.propTypes = {}

export default connect()(CompteRoute);

