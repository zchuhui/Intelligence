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
                    goodsEchartData={this.props.goodsEchartData}
                    goodsEchartDataLoading={this.props.goodsEchartDataLoading}
                    changePagination={current => this.changePagination(current)}
                    getGoodsEcharData={args => this.getGoodsEcharData(args)}

                />
            </MainLayout>
        )
    }
}


function mapStateToProps(state) {
    // 菜单
    const menus = state.Menus;

    // 竞品表数据
    const { data, 
        searchArgs, 
        loading, 
        goodsEchartData, 
        goodsEchartDataLoading 
    } = state.RelevanceBG;
    console.log(goodsEchartData)
    if (data) {
        // 遍历数据，转换成组件可用的数据
        data.list.map((item, index) => {
            
            // 添加key，不然会报错
            item['key'] = `td_${index}`; 

            if (item.relate_info) {

                let array = Object.keys(item.relate_info).map((el) => {
                    return item.relate_info[el];
                })
                item['children'] = array;
            }
        });
    }

    return {
        // 搜索模块
        menus,     
        searchArgs,

        // 列表模块
        data,
        loading,

        // 趋势图模块
        goodsEchartData,
        goodsEchartDataLoading,
    };
}

export default connect(mapStateToProps)(BgRouter);
