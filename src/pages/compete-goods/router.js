import React from 'react';
import { Router, Route, browserHistory } from 'dva/router';
import GoodsList from './routes/data-router';

// 入口路由
function RouterConfig({ history }) {
    return (
        <Router history={browserHistory}>
      		<Route path="/" component={GoodsList} />
   		</Router>
    );
}
export default RouterConfig;

