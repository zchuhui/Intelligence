import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from '../pages/home/routes/IndexPage';
import competeRoute from '../pages/compete_table/routes/competeRoute';

// 入口路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      		<Route path="/" component={IndexPage} />
      		<Route path="/index" component={competeRoute} />
   		</Router>
    );
}

export default RouterConfig;

