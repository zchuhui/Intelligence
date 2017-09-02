import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import MenuBar from '../views/menu-bar/menu-bar';
import GoodsDetail from '../views/goods-detail/goods-detail';


class GoodsDetailDataRouter extends React.Component {

    render(){
        return (
            <MainLayout headerMenuText="销售秘书">
                {/* 菜单 */}
                <MenuBar value={1}/>
                {/* 价格对比 */}
                <GoodsDetail 
                    sku={this.props.params.sku} 
                    goods={this.props.goods} 
                    priceList={this.props.priceList} 
                    compareInfoList={this.props.compareInfoList}
                    relateInfo={this.props.relateInfo}
                    runChart={this.props.runChart}
                    attrInfo={this.props.attrInfo}
                    onGoodsOtherRunChart={params => this.onGoodsOtherRunChart(params)}
                />
            </MainLayout>
        )
    }


    onGoodsOtherRunChart(argus){
        console.log('argus',argus);
        this.props.dispatch({
            type: 'GoodsDetailModel/getGoodsByArguments',
            payload: argus
        })
    }
    

    componentDidMount(){

        // 根据sku请求数据
        if(this.props.params.sku){
            this.props.dispatch({
                type: 'GoodsDetailModel/getGoodsBySku',
                payload: {
                    sku: this.props.params.sku
                }
            })
        }

    }


}


function mapStateToProps(state){
    return {...state.GoodsDetailModel};
}

export default connect(mapStateToProps)(GoodsDetailDataRouter)