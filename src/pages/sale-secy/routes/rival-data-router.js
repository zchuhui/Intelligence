import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import MenuBar from '../views/menu-bar/menu-bar';
import RivalNew from '../views/rival/rival-new';


class RivalDataRouter extends React.Component {

    render(){
        return (
            <MainLayout headerMenuText="销售秘书">
                {/* 菜单 */}
                <MenuBar value={2}/>

                <RivalNew />
                
            </MainLayout>
        )
    }
    
    componentDidMount(){

        // 根据sku请求数据
        /* if(this.props.params.sku){
            this.props.dispatch({
                type: 'GoodsDetailModel/getGoodsBySku',
                payload: {
                    sku: this.props.params.sku
                }
            })
        } */

    }   
}


function mapStateToProps(state){
    //return {...state.GoodsDetailModel};
}

export default connect(mapStateToProps)(RivalDataRouter)