import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import HomeTable from '../views/HomeTable.js';

function IndexPage() {
    return (
        <MainLayout>
        	<HomeTable /> 
        </MainLayout>
    );
}

IndexPage.propTypes = {}

export default connect()(IndexPage);

