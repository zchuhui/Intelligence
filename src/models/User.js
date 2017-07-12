/**
 * 用户登录
 * Date:2017/6/21
 * Author:zhuangchuhui
 */

import * as usersService from '../services/users';
import LocalStorage from '../utils/localStorage';
import { CODE200, ERRORMESSAGE } from '../constants/constant';

// 天数，设定为保存一周
const dayCount = 60 * 24 * 7;

export default {
    namespace: 'User',

    state: {
        loginStatus: 0, // 登录状态，是否登录成功
        loginMsg: '', // 登录提示信息
        userInfo: {}, // 登录成功获取的用户信息
        loading: 0, // 登录中的加载状态
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
                    LocalStorage.set('username', payload.loginInfo.username, dayCount);
                    LocalStorage.set('password', payload.loginInfo.password, dayCount);
                    LocalStorage.set('token', data.data.token, dayCount);
                    LocalStorage.set('loginStatus', 1, dayCount);

                    // 转到BG页
                    window.location.href = "/bg";
                    //console.log('已登录');

                } else {
                    // 传入失败信息，用于页面展示
                    yield put({ type: 'save', payload: data });
                    message.warning(data.msg)
                }
            }
            catch (e) {
                message.error(ERRORMESSAGE);
                
                // 传入失败信息，用于页面展示
                yield put({ type: 'saveError', payload:{msg:e.message} });
            }


        },

        // 后台自动登录
        * autoLogin({ payload }, { select, call, put }) {

            //console.log('自动登录中...', payload.loginInfo)

            // 存储数据
            yield put({ type: 'updateStatusAndUsername', payload: { username: payload.loginInfo.username, loginStatus: 1 } });


            /*// 开始请求数据
            const data = yield call(usersService.login, payload.loginInfo);
            // 存储数据
            if (data) {
                console.log("登录成功！", data)

                // 存储数据
                yield put({ type: 'save', payload: data });

            } else {
                console.log("login err");
            }*/
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

            // 获取本地存储的登录名与密码
            let username = LocalStorage.get('username');
            let password = LocalStorage.get('password');

            // 判断是否存在，存在则自动获取登录信息，不在请求
            if (username && password) {

                const loginInfo = {
                    username: username,
                    password: password
                }

                dispatch({ type: 'autoLogin', payload: { loginInfo: loginInfo } });
            }
        },

    },
};
