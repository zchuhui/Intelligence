import React from 'react';
import { Router, Route,hashHistory} from 'dva/router';
import IndePageDataRouter from './routes/index-page-data-router';
import GoodsListDataRouter from './routes/goods-list-data-router';
import GoodsDetailDataRouter from './routes/goods-detail-data-router';
import RivalDataRouter from './routes/rival-data-router';
import RivalViewDataRouter from './routes/rival-view-data-router';
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
            <Route path="/detail/:sku" component={ GoodsDetailDataRouter } />
            {/* 创建关系 */}
			<Route path="/create" component={ CreateRelevance }> </Route>
			<Route path="/create/:sku" component={ CreateRelevance } /> 
            {/* 竞品 */}
            <Route path="/rival" component={ RivalDataRouter } ></Route>
            <Route path="/view" component={ RivalViewDataRouter } ></Route>
            <Route path="/view/:name" component={ RivalViewDataRouter } />

   		</Router>
    );
}

export default RouterConfig;

