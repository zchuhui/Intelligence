import React from 'react';
import { Router, Route } from 'dva/router';
import DataRouter from './routes/data-router';
import CreateRelevance from './views/create-relevance/create-relevance';

// BG关联表路由
function RouterConfig({ history }) {
    return (
        <Router history={history}>
			<Route path="/" component={ DataRouter }>
			  	<Route path="bg" component={ DataRouter } /> 
			</Route>
			
      		<Route path="/" component={ CreateRelevance }>
			  	<Route path="bg/create" component={ CreateRelevance } /> 
			  	<Route path="bg/create/:sku" component={ CreateRelevance } /> 
      		</Route>
   		</Router>
    );
}
export default RouterConfig;

