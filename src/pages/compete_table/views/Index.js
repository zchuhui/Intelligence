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
    }*/

	render(){
		return (
			<MainLayout searchArguments={this.props.search}>
				{/*<div>{ this.state.msg }</div>*/}
                <Searcher menus={this.props.menus}/>
	        	<CompeteTable data={this.props.data} searchClick={ msg => this.searchClick(msg)}/> 
	        </MainLayout>
		)
	}
}


function mapStateToProps(state) {
    // 获取菜单数据
    const menus = state.Menus;
    console.log(menus.site)

    // 获取竞品数据
    const { data } = state.CompeteGoods;
    const list = data.list;
    const page = data.page;
    const search = data.search;

    return {
        menus,
    	data,
        list,
        page,
        search
    };
}

export default connect(mapStateToProps)(Index);

