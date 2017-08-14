import React from 'react';
import { Router, Route } from 'dva/router';
import DataRouter from './routes/data-router';

// 销售小秘书路由
function RouterConfig({ history }) {
    return (
        <Router history={ history }>
      		<Route path="/" component={ DataRouter } />
   		</Router>
    );
}
export default RouterConfig;

