/**
 * 用户登录
 * Date:2017/6/21
 * Author:zhuangchuhui
 */

import * as usersService from '../services/users';
import localStorage from '../utils/localStorage';

// 一天
const oneDay =  60*24;

export default {
    namespace: 'User',

    state: {
        loginStatus: 0,   // 登录状态，是否登录成功
        loginMsg: '',     // 登录提示信息
        userInfo: {},     // 登录成功获取的用户信息
        loading:0,        // 登录中的加载状态
    },
    reducers: {
        // 存储登录成功后的信息到state
        save(state, { payload: { data: data } }) {
            return {...state,userInfo:data.data.userInfo,loginStatus:data.status, loginMsg: data.msg, loading: 0 };
        },

        // 显示登录加载状态
        showLoading(state, { payload }) {
            return {...state, loading:1};
        },

        // 退出登录，清除信息
        clearLoginInfo(state, { payload: { data: data } }) {
            return {...state,userInfo:{},loginStatus:0, loginMsg: '', };
        },
    },
    effects: {
        // 点击登录
        * login({ payload }, { select, call, put }) {

            // 显示加载状态
            yield put({ type: 'showLoading'});  

            // 开始请求数据
            const data = yield call(usersService.login, payload.loginInfo);
            
            // 存储数据
            if (data) {

                // 存储数据
                yield put({ type: 'save', payload: data });

                // 存储用户名、密码
                localStorage.set('username',payload.loginInfo.username,oneDay);
                localStorage.set('password',payload.loginInfo.password,oneDay);

                // 转到BG页
                window.location.href= "/bg"; 

            } else {
                console.log("login err");
            }
        },

        // 后台自动登录
        * autoLogin({ payload }, { select, call, put }) {

            console.log('自动登录中...',payload.loginInfo)

            // 开始请求数据
            const data = yield call(usersService.login, payload.loginInfo);
            
            // 存储数据
            if (data) {
                console.log("登录成功！",data)

                // 存储数据
                yield put({ type: 'save', payload: data });

            } else {
                console.log("login err");
            }
        },

        // 退出登录
        * logout({ payload }, { select, call, put }) {

            // 开始请求数据
            const data = yield call(usersService.logout);
            
            // 存储数据
            yield put({ type: 'clearLoginInfo', payload: data });

        }



    },
    subscriptions: {
        setup({ dispatch, history }) {

            // 获取本地存储的登录名与密码
            let username = localStorage.get('username');
            let password = localStorage.get('password');

            // 判断是否存在，存在则自动登录
            if (username && password) {

                const loginInfo = {
                    username: username,
                    password: password
                }

                dispatch({ type: 'autoLogin', payload:{loginInfo:loginInfo}});
            }
        },
        
    },
};
