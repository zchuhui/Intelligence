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
    // args: 搜索参数
    handleSearchArgs(args) {
        this.props.dispatch({
            type: 'CompeteGoods/search',
            payload: {
                searchArgs: args
            }
        });

    }
    
    // 分页操作
    // current: 当前页数
    handlePagination(current) {
        this.props.dispatch({
            type: 'CompeteGoods/query',
            payload: {
                page: current
            }
        });
    }

    // 抓取时间段
    // args: 时间段
    handleSearchArgsToDate(args) {
        console.log(args)
        this.props.dispatch({
            type: 'CompeteGoods/search',
            payload: {
                searchArgs: args
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
                    handlePagination={current => this.handlePagination(current) } 
                    handleSearchArgsToDate={args => this.handleSearchArgsToDate(args)}
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
