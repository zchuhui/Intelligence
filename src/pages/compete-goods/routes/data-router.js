import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import CompeteList from '../views/goods-list/goods-list';
import SearchBar from '../views/search/search-bar';

class CompeteRouter extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    /**
     * 搜索
     * @param {*搜索参数} args 
     */
    handleSearchArgs(args) {
        this.props.dispatch({
            type: 'CompeteGoods/search',
            payload: {
                searchArgs: args
            }
        });

    }
    
    /**
     * 分页操作
     * @param {*当前页码} current 
     */
    handlePagination(current) {
        this.props.dispatch({
            type: 'CompeteGoods/paginationQuery',
            payload: {
                page: current
            }
        });
    }

    /**
     * 商品列表排序
     * @param {排序参数} sort 
     */
    handleTableChange(sort) {
        this.props.dispatch({
            type: 'CompeteGoods/paginationQuery',
            payload: {
                sort: sort,
            }
        });
    }


    /**
     * 抓取时间段(未完成)
     * @param {*时间段} args 
     */
    handleSearchArgsToDate(args) {
        this.props.dispatch({
            type: 'CompeteGoods/search',
            payload: {
                searchArgs: args
            }
        });
    }


    render() {
        return (
            <MainLayout 
                searchArguments={this.props.search}
                headerMenuText="竞品报表" 
                userPermission={this.props.menus.userPermission}
                >

                {/*搜索模块*/}
                <SearchBar 
                    menus={this.props.menus} 
                    searchArgs={this.props.searchArgs}  
                    handleSearchArgs={args => this.handleSearchArgs(args)}
                />

                {/*列表模块*/}
                <CompeteList 
                    data={this.props.data}
                    loading={this.props.loading} 
                    handlePagination={current => this.handlePagination(current) } 
                    handleTableChange={sort => this.handleTableChange(sort) } 
                    handleSearchArgsToDate={args => this.handleSearchArgsToDate(args)}
                /> 
            </MainLayout>
        )
    }
    
}


function mapStateToProps(state) {
    const menus = state.Menus;
    
    return {
        menus,...state.CompeteGoods
    };
}


export default connect(mapStateToProps)(CompeteRouter);
