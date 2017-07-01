import React from 'react';
import { Router, Route } from 'dva/router';
import DataRouter from './routes/data-router';
import CreateRelevance from './views/create-relevance/create-relevance';

// BG关联表路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      		<Route path="/" component={ DataRouter } />
      		<Route path="/create" component={ CreateRelevance } />
   		</Router>
    );
}
export default RouterConfig;

