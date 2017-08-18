import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import MenuBar from '../views/menu-bar/menu-bar';
import GoodsDetail from '../views/goods-detail/goods-detail';


class GoodsDetailDataRouter extends React.Component {

    render(){
        return (
            <MainLayout headerMenuText="销售秘书">
                <MenuBar value={1}/>
                <GoodsDetail />
            </MainLayout>
        )
    }
}


function mapStateToProps(state){
    return {};
}

export default connect(mapStateToProps)(GoodsDetailDataRouter)