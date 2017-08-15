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
                {/* 导航 */}
                <MenuBar />
                
                <div className={styles.mainWrap}>
                    <SearchBar 
                        menus={this.props.menus}
                        handleSearchArgs={args => this.handleSearchArgs(args)}
                    />
                    { <GoodsList 
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

                    />}
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
     * @param {int} current     // 页码
     */
    changePagination(current) {
        this.props.dispatch({
            type: 'RelevanceBGModel/pagination',
            payload: {
                page: current,
            }
        });
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


    
}


function mapStateToProps(state) {
    //菜单
    const menus = state.Menus;

    // BG表数据
    const {  data } = state.RelevanceBGModel;
    
    // 数据格式转换：遍历列表数据，转成子表可用的数据格式
    if (data && data.list) {
        
        data.list.map((item, index) => {
            
            // 添加key，不然会报错
            item['key_id'] = Math.random();

            if (item.relate_info) {
                let array = Object.keys(item.relate_info).map((el) => {
                    // 添加children标示
                    item.relate_info[el]['isChildren'] = 1;
                    return item.relate_info[el];
                });

                // 添加key，不然会报错
                array.map((item2,index2) => {
                     item2['key_id'] = Math.random();
                })

                item['children'] = array;
            }
        });
    }
    
    
    return {
        menus,
        ...state.RelevanceBGModel
    }; 
}

export default connect(mapStateToProps)(GoodsListDataRouter);
