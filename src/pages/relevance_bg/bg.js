import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading'; //加载

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../../models/User'));
app.model(require('../../models/Menus'));
app.model(require('./models/RelevanceBG'));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
