import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import MenuBar from '../views/menu-bar/menu-bar';
import RivalNewView from '../views/rival/rival-new-view';


class RivalViewDataRouter extends React.Component {

    render(){
        return (
            <MainLayout headerMenuText="销售秘书">
                {/* 菜单 */}
                <MenuBar value={2}/>
                
                <RivalNewView />
                
            </MainLayout>
        )
    }
    
}


function mapStateToProps(state){
    //return {...state.GoodsDetailModel};
}

export default connect(mapStateToProps)(RivalViewDataRouter)