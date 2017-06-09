import React from 'react';
import { Router, Route } from 'dva/router';
import LoginRouter from './routes/LoginRouter';

// 登录页入口路由
function RouterConfig({ history }) {
	
    return (
        <Router history={history}>
      		<Route path="/" component={LoginRouter} /> 
   		</Router>
    );
}

export default RouterConfig;

