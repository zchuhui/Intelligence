import dva from 'dva';
import { browserHistory,hashHistory  } from 'dva/router';
import createLoading from 'dva-loading'; //加载
import { message } from 'antd';

// 1. Initialize
const app = dva({
    history: browserHistory,
    //history: hashHistory,
    onError(e) {
        message.error(e.message, 3);
    },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../../models/user'));
app.model(require('../../models/menus')); 
app.model(require('./models/bg-relevance-goods-model')); 
app.model(require('./models/create-relevance-model'));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
