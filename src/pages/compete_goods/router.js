import React from 'react';
import { Router, Route } from 'dva/router';
import Index from './routes/Router';
import Test from '../test/views/Index';

// 入口路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      		<Route path="/" component={Index} />
      		{/*<Route path="/users" component={Test} />*/}
   		</Router>
    );
}
export default RouterConfig;
