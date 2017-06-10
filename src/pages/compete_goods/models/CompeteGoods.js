import * as competeServices from '../../../services/competeGoods';

export default {
    namespace: 'CompeteGoods',

    state: {
        // 加载状态
        loading: true,

        // 列表参数
        data: {
            page: {
                page: 0,
                pageSize: 0,
                count: 0,
                pageNum: 0
            },
            list: [],
        },
        // 搜索参数
        searchArgs: {
            site: '',
            cid: '',
            bid: '',
            status: '',
            startTime: '',
            endTime: '',
            price1: '',
            price2: '',
            sku: '21173650',
            page: 1
        },
    },
    reducers: {
        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            return {...state, data, loading: false };
        },
        updateSearchArgs(state, { payload },{put}) {
            console.log(payload.searchArgs);
            return {...state, searchArgs:payload.searchArgs};
        },
        showLoading(state, { payload }) {
            console.log(payload.loading);
            return {...state, loading:payload.loading};
        }
    },
    effects: {
        // 获取数据
        * query({ payload }, { select, call, put }) {
            const { data } = yield call(competeServices.fetch);
            yield put({ type: 'save', payload: data });
        },
        // 搜索
        * search({ payload }, { select, call, put }) {
            //const { searchArgs } = yield select(state => state.CompeteGoods);
            //yield put({ type: 'showLoading', payload: { loading: false} });

            const searchArgs = payload.searchArgs;  
            console.log(searchArgs);
            const { data } = yield call(competeServices.search, {searchArgs:searchArgs});

            console.log(data)
            
            if (data) {
                yield put({
                    type: 'save',
                    payload: data
                });
            }

        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    dispatch({ type: 'query', payload: query });
                }
            })
        },

    },

};
