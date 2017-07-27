import React from 'react';
import { Router, Route, browserHistory } from 'dva/router';
import Login from './routes/data-router';

// 登录页入口路由
function RouterConfig({ history }) {
	
    return (
        <Router history={browserHistory}>
      		<Route path="/login" component={Login} /> 
   		</Router>
    );
}

export default RouterConfig;

