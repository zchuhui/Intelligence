import React from 'react';
import { Router, Route } from 'dva/router';
import HomeTable from './views/HomeTable';

// 入口路由
function RouterConfig({ history }) {
	
    return (
        <Router history={history}>
      		<Route path="/" component={HomeTable} /> 
   		</Router>
    );
}

export default RouterConfig;

