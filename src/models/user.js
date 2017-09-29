/**
 * 用户登录
 * Date:2017/6/21
 * Author:zhuangchuhui
 */

import * as UsersService from '../services/users';
import LocalStorage from '../utils/local-storage';
import { CODE200, ERRORMESSAGE } from '../constants/constant';
import { message } from 'antd';

 
const saveTime = 60 * 24;        // 用户登录状态存储时间，默认设定为一天，单位为分钟

export default {
    namespace: 'User',

    state: {
        loginStatus: 0,     // 登录状态，是否登录成功
        loginMsg: '',       // 登录提示信息
        userInfo: {},       // 登录成功获取的用户信息
        loading: false,     // 登录中的加载状态
    },
    reducers: {

        // 存储登录信息
        save(state, { payload }) {

            let loginStatus = 0;   // 登录状态
            let userInfo;          // 用户信息

            if (payload.code == CODE200) {
                loginStatus = 1;
                userInfo = payload.data.userInfo
            }

            return { ...state, userInfo: userInfo, loginStatus: loginStatus, loading: false };
        },

        // 显示登录加载状态,清除提示
        showLoading(state, { payload }) {
            return { ...state, loading: true,loginMsg:'' };
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

    },
    effects: {
        // 点击登录
        * login({ payload }, { select, call, put }) {
        
            yield put({ type: 'showLoading' }); 

            const {data, msg, code}  = yield call(UsersService.login, payload.loginInfo);

            if (code == CODE200) {

                // 存储数据
                yield put({ type: 'save', payload: {data,msg,code} });
                
                // 存储用户名、密码
                LocalStorage.set('username', payload.loginInfo.username, saveTime);
                LocalStorage.set('password', payload.loginInfo.password, saveTime);
                LocalStorage.set('token', data.token, saveTime);
                LocalStorage.set('loginStatus', 1, saveTime);
                
                // 获取用户权限
                const userinfo_sj = LocalStorage.get('sj_info');
                

                // 如果有用户权限，则跳转到首页,否则跳转到BG列表页
                if(userinfo_sj)
                    window.location.href = "/sale-secy";
                else
                    window.location.href = "/sale-secy#/goods";
                
            } else {
                // 登录失败
                yield put({ type: 'save', payload: data });
            } 

        },

        // 如果本地已存储，则自动登录
        * autoLogin({ payload }, { select, call, put }) {

            // 重新存储登录信息，延长为一天
            let username = LocalStorage.get('username');
            let password = LocalStorage.get('password');
            let token = LocalStorage.get('token');
            
            // 存储用户名、密码
            LocalStorage.set('username', username, saveTime);
            LocalStorage.set('password', password, saveTime);
            LocalStorage.set('token', token, saveTime);
            LocalStorage.set('loginStatus', 1, saveTime); 

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
            const data = yield call(UsersService.logout);

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
                token = LocalStorage.get('token'),   // 登录状态
                pathname = window.location.pathname;             // url


            // 判断是否登录，已登录则显示用户信息
            if (username && password) {

                // 如果已登录，则不停留在login页面
                if (pathname == '/login') { 
                    //window.location.href = "/bg";
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
            else {
                // 没登录则马上跳到登录页
                if (pathname !== '/login') {
                    window.location.href = "/login";
                }
            }
        },

    },
};
