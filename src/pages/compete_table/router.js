import React from 'react';
import { Router, Route } from 'dva/router';
import Index from './views/Index';

// 入口路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      		<Route path="/" component={Index} />
   		</Router>
    );
}

export default RouterConfig;

