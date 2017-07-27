import React from 'react';
import { Router, Route, browserHistory } from 'dva/router';
import DataRouter from './routes/data-router';

// 销售小秘书路由
function RouterConfig({ history }) {
    return (
        <Router history={browserHistory}>
      		<Route path="/sale-secy" component={ DataRouter } />
   		</Router>
    );
}
export default RouterConfig;

