import React from 'react';
import { Router, Route } from 'dva/router';
import BgRouter from './routes/Router';

// BG关联表路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      		<Route path="/" component={ BgRouter } />
   		</Router>
    );
}
export default RouterConfig;

