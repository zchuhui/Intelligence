import React from 'react';
import { Router, Route, browserHistory } from 'dva/router';
import DataRouter from './routes/data-router';
import CreateRelevance from './views/create-relevance/create-relevance';

// BG关联表路由
function RouterConfig({ history }) {
    return (
        <Router history={browserHistory}>
      		{/* <Route path="/bg" component={ DataRouter }>
			  	<Route path="/bg/:id" component={ DataRouter } />
			</Route>
			
      		<Route path="/create" component={ CreateRelevance }>
      			<Route path="/create/:sku" component={ CreateRelevance } />
      		</Route>  */}

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

