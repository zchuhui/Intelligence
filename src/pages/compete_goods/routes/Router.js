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
            type: 'CompeteGoods/paginationQuery',
            payload: {
                page: current
            }
        });
    }

    // 抓取时间段(未完成)
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

    // 获取品牌
   /* getMenuBrands(site) {
        this.props.dispatch({
            type: 'Menus/getBrands',
            payload: {
                site: site
            }
        });
    }*/


    render() {
        return (
            <MainLayout searchArguments={this.props.search}>

                {/*搜索模块*/}
                <Searcher 
                    menus={this.props.menus} 
                    searchArgs={this.props.searchArgs}  
                    handleSearchArgs={args => this.handleSearchArgs(args)}
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
    
}


function mapStateToProps(state) {
    // 菜单数据
    const menus = state.Menus;

    // 竞品数据
    const { data, searchArgs, loading } = state.CompeteGoods;

    // 输出数据
    return {
        menus,
        data,
        searchArgs,
        loading,

    };
}

export default connect(mapStateToProps)(CompeteRouter);
