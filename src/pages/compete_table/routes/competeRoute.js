import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import CompeteTable from '../views/competeTable';
import Searcher from '../../../components/Searcher/Searcher';

class CompteRoute extends React.Component {

	render(){
		return (
			<MainLayout>
                <Searcher /> 
	        	<CompeteTable />
	        </MainLayout>
		)
	}
}

CompteRoute.propTypes = {}

export default connect()(CompteRoute);