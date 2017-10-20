import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import SearchBar from '../views/goods-list/search-bar';
import GoodsList from '../views/goods-list/goods-list';
import MenuBar from '../views/menu-bar/menu-bar';
import styles from '../views/goods-list/goods-list.less';

class GoodsListDataRouter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <MainLayout 
                headerMenuText="销售秘书"
            >
                {/* 菜单，选中该页 */}
                <MenuBar value={1}/>
                
                <div className={styles.mainWrap}>
                    <SearchBar 
                        menus={this.props.menus}
                        handleSearchArgs={args => this.handleSearchArgs(args)}
                    />
                    <GoodsList 
                        data={this.props.data} 
                        loading={this.props.loading} 
                        changePagination={current => this.changePagination(current)} 
                        changeTableSort={sort => this.changeTableSort(sort)} 
                        

                        goodsEchartData={this.props.goodsEchartData} 
                        goodsEchartDataLoading={this.props.goodsEchartDataLoading} 
                        getGoodsEcharData={args => this.getGoodsEcharData(args)} 

                        getGoodsContrastDataByPid={pid => this.getGoodsContrastDataByPid(pid)} 
                        clearGoodsContrastData={args => this.clearGoodsContrastData(args)}
                        goodContrastData={this.props.goodContrastData}
                        goodContrastDataLoading={this.props.goodContrastDataLoading} 

                    />
                </div>

            </MainLayout>
        )
    }

    /**
     * 搜索
     * @param {object} args   // 搜索参数
     */
    handleSearchArgs(args) {
        this.props.dispatch({
            type: 'RelevanceBGModel/search',
            payload: {
                searchArgs: args
            }
        });
    }

    /**
     * 分页
     * @param {int} page     // 页码
     */
    changePagination(page) {
        this.props.dispatch({
            type: 'RelevanceBGModel/pagination',
            payload: {
                page: page,
            }
        });
        
        sessionStorage.setItem('page',page);
    }

    /**
     * 表格排序
     * @param {string} sort       // 排序条件
     */
    changeTableSort(sort) {
        this.props.dispatch({
            type: 'RelevanceBGModel/pagination',
            payload: {
                sort: sort,
            }
        });
    }

    /**
     * 根据商品的 pid 与时间获取趋势图数据
     * @param {object} args 
     */
    getGoodsEcharData(args){
        this.props.dispatch({
            type:'RelevanceBGModel/fetchGoodsEchartByPidAndTime',
            payload:{
                pid:args.pid,
                startTime:args.startTime,
                endTime:args.endTime,
            },
        })
    }

    /**
     * 根据商品的 pid 获取对比数据
     * @param {int} pid 
     */
    getGoodsContrastDataByPid(pid){
        this.props.dispatch({
            type:'RelevanceBGModel/fetchGoodsContrastDataByPid',
            payload:{
                pid:pid,
            }
        })
    }

    /**
     * 清空对比数据
     * @param {object} args 
     */
    clearGoodsContrastData(args){
        this.props.dispatch({
            type:'RelevanceBGModel/clearGoodContrastData',
            payload:{}
        })
    }

    
    componentDidMount(){
        // 载入两个菜单数据
        this.props.dispatch({ type: 'Menus/getBanggoodCates'});
        this.props.dispatch({ type: 'Menus/getBanggoodBrands'});

    }
    
}


function mapStateToProps(state) {
    const menus = state.Menus;
    return {
        menus,
        ...state.RelevanceBGModel
    }; 
}

export default connect(mapStateToProps)(GoodsListDataRouter);
