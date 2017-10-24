import dva from 'dva';
import createLoading from 'dva-loading'; //加载
import { message } from 'antd';

// 1. Initialize
const app = dva({
    onError (error) {
        message.error(error.message);
      },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../../models/user'));
app.model(require('../../models/menus'));
app.model(require('./models/index-home-model'));
app.model(require('./models/goods-list-model'));
app.model(require('./models/goods-detail-model'));
app.model(require('./models/create-relevance-model'));
app.model(require('./models/rival-model'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
