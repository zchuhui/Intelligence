import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import CompeteList from '../views/CompeteList/CompeteList';
import Searcher from '../../../components/Searcher/Searcher';

class CompeteRouter extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <MainLayout searchArguments={this.props.search}>
                {/*<div>{ this.state.msg }</div>*/}
                <Searcher menus={this.props.menus}/>
                <CompeteList 
                data={this.props.data}
                loading={this.props.loading}
                /> 
            </MainLayout>
        )
    }
}


function mapStateToProps(state) {
    // 获取菜单数据
    const menus = state.Menus;
    const loading = false;

    // 获取竞品数据
    const { data } = state.CompeteGoods;

    // 输出数据
    return {
        menus,
        data,
        loading
    };
}

export default connect(mapStateToProps)(CompeteRouter);
