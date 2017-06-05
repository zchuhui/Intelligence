import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './pages/home/routes/IndexPage';
import TestPage from './pages/compete_table/views/TestPage';

// 入口路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/test" component={TestPage} />
    </Router>
    );
}

export default RouterConfig;
