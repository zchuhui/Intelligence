import dva from 'dva';
import createLoading from 'dva-loading'; //加载

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../../models/user'));
/* app.model(require('../../models/menus'));  */
app.model(require('./models/sale-secy-model'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
