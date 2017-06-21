/**
 * 用户登录
 * Date:2017/6/21
 * Author:zhuangchuhui
 */

import * as usersService from '../services/users';
import localStorage from '../utils/localStorage';
import Url from '../config/config.url.js';

// 一天
const oneDay =  60*24;

export default {
    namespace: 'User',

    state: {
        loginStatus: 0, 
        loginMsg: '',
        userInfo: {},
        loading:0,
    },
    reducers: {
        // 存储品牌表
        save(state, { payload: { data: data } }) {
            return {...state,userInfo:data.data.userInfo,loginStatus:data.status, loginMsg: data.msg, loading: 0 };
        },
        
        showLoading(state, { payload }) {
            return {...state, loading:1};
        },
    },
    effects: {
        // 获取品牌表
        * login({ payload }, { select, call, put }) {

            // 显示加载状态
            yield put({ type: 'showLoading'});
            
            // 开始请求数据
            const data = yield call(usersService.login, payload.loginInfo);
            
            // 存储数据
            if (data) {
                console.log("返回数据",data)

                // 存储数据
                yield put({ type: 'save', payload: data });

                // 存储用户名、密码
                localStorage.set('username',payload.loginInfo.username,oneDay);
                localStorage.set('password',payload.loginInfo.password,oneDay);

                window.location.href= "/bg"; 

            } else {
                console.log("login err");
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {

            let username = localStorage.get('username');
            let password = localStorage.get('password');
            console.log(username,password);

            /*return history.listen(({ pathname, query }) => {
                if (pathname === '/login') {
                    dispatch({ type: 'login'});
                }
            })*/
        },
    },
};
