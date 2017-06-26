import React from 'react';
import { Router, Route } from 'dva/router';
import BgRouter from './routes/Router';
import CreateRelevance from './views/create-relevance/create-relevance';

// BG关联表路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      		<Route path="/" component={ BgRouter } />
      		<Route path="/create" component={ CreateRelevance } />
   		</Router>
    );
}
export default RouterConfig;

