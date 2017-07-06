import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import SearchBar from '../views/search/search-bar';
import GoodsList from '../views/goods-list/goods-list';


class BgRouter extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    /**
     * 搜索
     * @param  args [搜索参数]
     */
    handleSearchArgs(args) {
        this.props.dispatch({
            type: 'RelevanceBG/search',
            payload: {
                searchArgs: args
            }
        });
    }

    // 分页操作
    // current: 当前页数
    changePagination(current) {
        this.props.dispatch({
            type: 'RelevanceBG/pagination',
            payload: {
                page: current
            }
        });
    }

    // 根据商品的pid与时间获取趋势图数据
    getGoodsEcharData(args){
        this.props.dispatch({
            type:'RelevanceBG/fetchGoodsEchartByPidAndTime',
            payload:{
                pid:args.pid,
                startTime:args.startTime,
                endTime:args.endTime,
            },
        })
    }

    // 根据商品的pid获取对比数据
    getGoodsContrastDataByPid(pid){
        this.props.dispatch({
            type:'RelevanceBG/fetchGoodsContrastDataByPid',
            payload:{
                pid:pid,
            }
        })
    }

    // 清空对比数据
    clearGoodsContrastData(args){
        this.props.dispatch({
            type:'RelevanceBG/clearGoodContrastData',
            payload:{}
        })
    }


    render() {
        return (
            <MainLayout headerMenuText="BG关联报表">
                <SearchBar 
                    menus={this.props.menus}
                    handleSearchArgs={args => this.handleSearchArgs(args)}
                    
                />
                <GoodsList 
                    data={this.props.data} 
                    loading={this.props.loading} 
                    changePagination={current => this.changePagination(current)} 

                    goodsEchartData={this.props.goodsEchartData} 
                    goodsEchartDataLoading={this.props.goodsEchartDataLoading} 
                    getGoodsEcharData={args => this.getGoodsEcharData(args)} 

                    getGoodsContrastDataByPid={pid => this.getGoodsContrastDataByPid(pid)} 
                    clearGoodsContrastData={args => this.clearGoodsContrastData(args)}
                    goodContrastData={this.props.goodContrastData}
                    goodContrastDataLoading={this.props.goodContrastDataLoading} 

                />
            </MainLayout>
        )
    }
}


function mapStateToProps(state) {
    // 菜单
    const menus = state.Menus;

    // BG表数据
    const { 
        data,                     // BG 表数据
        searchArgs,               // 搜索参数
        searchArguments,
        loading,                  // BG 表加载状态
        goodsEchartData,          // 主商品趋势图
        goodsEchartDataLoading,   // 主商品趋势图加载状态
        goodContrastData,         // 商品对比数据
        goodContrastDataLoading,  // 商品对比数据加载状态
    } = state.RelevanceBG;
    

    if (data) {
        // 遍历列表数据，转换成组件可用的数据
        data.list.map((item, index) => {
            
            // 添加key，不然会报错
            item['key'] = `td_${index}`; 

            if (item.relate_info) {
                let array = Object.keys(item.relate_info).map((el) => {
                    // 添加children标示
                    item.relate_info[el]['isChildren'] = 1;
                    return item.relate_info[el];
                });
                item['children'] = array;
            }
        });
    }

    return {
        // 搜索模块
        menus,     
        searchArgs,
        searchArguments,

        // 列表模块
        data,
        loading,

        // 趋势图模块
        goodsEchartData,
        goodsEchartDataLoading,

        // 商品对比数据
        goodContrastData,
        goodContrastDataLoading
    };
}

export default connect(mapStateToProps)(BgRouter);
