import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import CompeteList from '../views/CompeteList/CompeteList';
import Searcher from '../../../components/Searcher/Searcher';

class CompeteRouter extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    // 搜索
    handleSearchArgs(args) {
        //console.log(args)
        this.props.dispatch({
            type: 'CompeteGoods/search',
            payload: {
                searchArgs: args
            }
        });

    }

    // 更改loading状态
    checkLoading(i) {
        this.props.dispatch({
            type: 'CompeteGoods/showLoading',
            payload: {
                loading: i
            }
        });
    }

    render() {
        return (
            <MainLayout searchArguments={this.props.search}>
                {/* <p>{this.state.msg}</p>*/}
                {/*搜索模块*/}
                <Searcher 
                menus={this.props.menus} 
                searchArgs={this.props.searchArgs}  
                handleSearchArgs={args => this.handleSearchArgs(args)}
                /*checkLoading={i => this.checkLoading(i)} */

                />

                {/*列表模块*/}
                <CompeteList 
                data={this.props.data}
                loading={this.props.loading}
                /> 
            </MainLayout>
        )
    }
    componentDidMount() {
        /*this.props.dispatch({
            type: 'CompeteGoods/updateSearchArgs',

        });*/
    }
}


function mapStateToProps(state) {
    // 菜单数据
    const menus = state.Menus;

    // 竞品数据
    const { data, searchArgs, loading } = state.CompeteGoods;

    //console.log(loading)

    // 输出数据
    return {
        menus,
        data,
        searchArgs,
        loading,

    };
}

export default connect(mapStateToProps)(CompeteRouter);
