import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import Searcher from '../views/Searcher/Searcher';
import RelevanceList from '../views/RelevanceList/RelevanceList';


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

    // 获取品牌
    /*getMenuBrands(site) {
        this.props.dispatch({
            type: 'Menus/getBrands',
            payload: {
                site: site
            }
        });
    }*/


    render() {
        return (
            <MainLayout>
                <Searcher 
                    menus={this.props.menus}
                    handleSearchArgs={args => this.handleSearchArgs(args)}
                    
                />
                <RelevanceList 
                    data={this.props.data}
                    loading={this.props.loading} 
                    changePagination={current => this.changePagination(current)}
                />
            </MainLayout>
        )
    }

}


function mapStateToProps(state) {
    // 菜单
    const menus = state.Menus;

    // 竞品数据
    const { data, searchArgs, loading } = state.RelevanceBG;

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

    // 输出数据
    return {
        menus,
        data,
        searchArgs,
        loading
    };
}

export default connect(mapStateToProps)(BgRouter);
