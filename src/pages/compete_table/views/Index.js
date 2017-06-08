import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/MainLayout/MainLayout';
import CompeteTable from './CompeteTable/CompeteTable';
import Searcher from '../../../components/Searcher/Searcher';

class Index extends React.Component {

    constructor(props, context) {
        super(props, context);

        /*this.state = {
            msg:"start",
        }*/
    }

    /*searchClick(msg){
        this.setState({
            msg
        })

        // searchClick={ msg => this.searchClick(msg)}
    }*/

    render() {
        return (
            <MainLayout searchArguments={this.props.search}>
                {/*<div>{ this.state.msg }</div>*/}
                <Searcher menus={this.props.menus}/>
                <CompeteTable data={this.props.data}/> 
            </MainLayout>
        )
    }
}


function mapStateToProps(state) {
    // 获取菜单数据
    const menus = state.Menus;

    // 获取竞品数据
    const { data } = state.CompeteGoods;
    
    // 如果page参数为空，给一个默认值
    const page = data.page;
    if (page !== undefined) {
        let count = parseInt(page.count);
        data.page.count = count;
    } 
    else {
        const pageDefault = {
            "page": 0,
            "pageSize": 0,
            "count": 0,
            "pageNum": 0
        }
        data.page = pageDefault;
        console.log(data)
    }

    // 输出数据
    return {
        menus,
        data,
    };
}

export default connect(mapStateToProps)(Index);
