import React from 'react';
import { Router, Route } from 'dva/router';
import IndePageDataRouter from './routes/index-page-data-router';
import GoodsListDataRouter from './routes/goods-list-data-router';
import GoodsDetailDataRouter from './routes/goods-detail-data-router';
import CreateRelevance from './views/create-relevance/create-relevance';

/**
 * 销售秘书模块路由
 * @param {*} param0 
 */
function RouterConfig({ history }) {
    return (
        <Router history={ history }>
            {/* 销售秘书 */}
      		<Route path="/" component={ IndePageDataRouter } ></Route>
            {/* 商品列表 */}
            <Route path="/goods" component={ GoodsListDataRouter } ></Route>
            {/* 商品详情 */}
            <Route path="/detail" component={ GoodsDetailDataRouter } ></Route>
            {/* 创建关系 */}
			<Route path="/create" component={ CreateRelevance }> </Route>
			<Route path="/create/:sku" component={ CreateRelevance } /> 

   		</Router>
    );
}

export default RouterConfig;

