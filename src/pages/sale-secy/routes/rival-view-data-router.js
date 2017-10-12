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
                
                <RivalNewView 
                    rivalViewLoading = {this.props.rivalViewLoading}
                    rivalViewList = {this.props.rivalViewList}
                    getRivalDataByParams = {params => this.getRivalDataByParams(params)}
                    setRelatedBgBySku = {params => this.setRelatedBgBySku(params)}
                    setStock = {params => this.setStock(params)}
                    menus={this.props.menus}
                    params={this.props.location.state}

                    relatedLoading={this.props.relatedLoading}
                    relatedStatus={this.props.relatedStatus}

                    stockLoading={this.props.stockLoading}
                    stockStatus={this.props.stockStatus}
                />
            </MainLayout>
        )
    }

    /**
     * 搜索
     * @param {object} params 
     */
    getRivalDataByParams(params){
        // 根据时间请求数据
        this.props.dispatch({
            type: 'RivalModel/getRivalDataByParams',
            payload: params,
        })
    }

    /**
     * 关联
     * @param {object} params 
     */
    setRelatedBgBySku(params){
        this.props.dispatch({
            type: 'RivalModel/setRelatedBgBySku',
            payload: params,
        })
    }

    /**
     * 采购
     * @param {object} params 
     */
    setStock(params){
        this.props.dispatch({
            type: 'RivalModel/setStock',
            payload: params,
        })
    }

    
    componentDidMount(){
        
        // 获取品牌菜单
        this.props.dispatch({ type: 'Menus/getBrands'}); 
        this.props.dispatch({ type: 'Menus/getCates'});

    }
    
}



function mapStateToProps(state){
    return {...state.RivalModel,menus:state.Menus};
}

export default connect(mapStateToProps)(RivalViewDataRouter)