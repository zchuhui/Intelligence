/**
 * 用户登录
 * Date:2017/6/21
 * Author:zhuangchuhui
 */

import * as usersService from '../services/users';
import LocalStorage from '../utils/local-storage';
import { CODE200, ERRORMESSAGE } from '../constants/constant';
import { message } from 'antd';


const saveTime = 60 * 24;        // localStorage的保存天数，默认设定为一天，单位为分钟

export default {
    namespace: 'User',

    state: {
        loginStatus: 0, // 登录状态，是否登录成功
        loginMsg: '',   // 登录提示信息
        userInfo: {},   // 登录成功获取的用户信息
        loading: 0,     // 登录中的加载状态
    },
    reducers: {
        // 存储登录成功后的信息到state
        save(state, { payload }) {
            let loginStatus = 0;
            if (payload.code == CODE200) {
                loginStatus = 1;
            }
            return { ...state, userInfo: payload.data.userInfo, loginStatus: loginStatus, loginMsg: payload.msg, loading: 0 };
        },

        // 显示登录加载状态
        showLoading(state, { payload }) {
            return { ...state, loading: 1 };
        },

        // 退出登录，清除信息
        clearLoginInfo(state, { payload: { data: data } }) {
            return { ...state, userInfo: {}, loginStatus: 0, loginMsg: '', };
        },

        // 登录请求实在慢，所以先存储本地信息
        updateStatusAndUsername(state, { payload }) {
            let info = {
                admin_name: payload.username
            }
            return { ...state, loginStatus: payload.loginStatus, userInfo: info };
        },

        // 报错时存储信息
        saveError(state, { payload }) {
            return { ...state, loginMsg: payload.msg, loading: 0, loginStatus: 0 };
        }
    },
    effects: {
        // 点击登录
        * login({ payload }, { select, call, put }) {
            try {
                // 显示加载状态
                yield put({ type: 'showLoading' });

                // 开始请求数据
                const { data } = yield call(usersService.login, payload.loginInfo);

                if (data.code == CODE200) {

                    // 存储数据
                    yield put({ type: 'save', payload: data });

                    // 存储用户名、密码
                    LocalStorage.set('username', payload.loginInfo.username, saveTime);
                    LocalStorage.set('password', payload.loginInfo.password, saveTime);
                    LocalStorage.set('token', data.data.token, saveTime);
                    LocalStorage.set('loginStatus', 1, saveTime);

                    // 转到BG页
                    window.location.href = "/bg";

                } else {
                    // 传入失败信息，用于页面展示
                    yield put({ type: 'save', payload: data });
                    //message.warning(data.msg)
                }
            }
            catch (e) {
                message.warning(ERRORMESSAGE);
                
                // 传入失败信息，用于页面展示
                yield put({ type: 'saveError', payload:{msg:e.message} });
            }


        },

        // 如果本地已存储，则自动登录
        * autoLogin({ payload }, { select, call, put }) {

            // 重新存储登录信息，延长为一天
            /* let username = LocalStorage.get('username');
            let password = LocalStorage.get('password');
            let token = LocalStorage.get('token');
            
            // 存储用户名、密码
            LocalStorage.set('username', username, saveTime);
            LocalStorage.set('password', password, saveTime);
            LocalStorage.set('token', token, saveTime);
            LocalStorage.set('loginStatus', 1, saveTime); */


            // 存储数据
            yield put({ type: 'updateStatusAndUsername', payload: { username: payload.loginInfo.username, loginStatus: 1 } });

        },

        // 退出登录
        * logout({ payload }, { select, call, put }) {

            // 清空本地登录名、密码
            LocalStorage.remove('username');
            LocalStorage.remove('password');
            LocalStorage.remove('token');
            LocalStorage.remove('loginStatus');

            // 转到登录页
            window.location.href = "/login";

            // 请求响应后台
            const data = yield call(usersService.logout);

            // 清空state数据
            yield put({ type: 'clearLoginInfo', payload: data });

        }

    },
    subscriptions: {
        setup({ dispatch, history }) {


            // 判断是http、https，如果是http，则跳转到https
            // 开发环境除外
            if (document.domain !== 'localhost') {
                var isHttps = 'https:' == document.location.protocol ? true : false;
                if (!isHttps) {
                    // 获取Url地址，并转向https
                    let url = window.location.href.split('://')[1];
                    location.href = `https://${url}`;
                }
            }


            // 获取本地存储的登录名与密码
            let username = LocalStorage.get('username'),         // 用户名
                password = LocalStorage.get('password'),         // 密码
                loginStatus = LocalStorage.get('loginStatus'),   // 登录状态
                pathname = window.location.pathname;             // url


            // 判断是否登录，没登录则马上跳到登录页
            if (loginStatus == 0) {
                if (pathname !== '/login') {
                    window.location.href = "/login";
                }
            }
            else {
                // 如果已登录，则不停留在login页面
                if (pathname == '/login') {
                    window.location.href = "/bg";
                }
                else{
                    // 如果已经登录，则自动获取登录信息
                    const loginInfo = {
                        username: username,
                        password: password
                    }
                    
                    dispatch({ type: 'autoLogin', payload: { loginInfo: loginInfo } });
                }
            }
        },

    },
};
