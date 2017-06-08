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
                <Searcher />
	        	<CompeteTable data={this.props.data} searchClick={ msg => this.searchClick(msg)}/> 
	        </MainLayout>
		)
	}
}


function mapStateToProps(state) {
    const { data } = state.CompeteGoods;

    const list = data.list;
    const page = data.page;
    const search = data.search;
	console.log(search)
    return {
    	data,
        list,
        page,
        search
    };
}

export default connect(mapStateToProps)(Index);

