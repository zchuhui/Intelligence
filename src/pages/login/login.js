/**
 * 登录页入口
 * Date:2017-06-20
 * Author:zhuangchuhui
 */

import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading'; //加载

// 1. Initialize
const app = dva({
    history: browserHistory,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../../models/user'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
