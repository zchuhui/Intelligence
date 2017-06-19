import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import RelevanceList from '../views/RelevanceList/RelevanceList';

class BgRouter extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <MainLayout>
                
                <RelevanceList />
            </MainLayout>
        )
    }
    
}


function mapStateToProps(state) {

    // 竞品数据
    const { data, searchArgs, loading } = state.RelevanceBG;

    // 输出数据
    return {
        data,
        searchArgs,
        loading
    };
}

export default connect(mapStateToProps)(BgRouter);
