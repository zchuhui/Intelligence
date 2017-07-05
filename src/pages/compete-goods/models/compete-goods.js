import * as competeServices from '../../../services/service-compete-goods';

export default {
    namespace: 'CompeteGoods',

    state: {
        // 加载状态
        loading: false,
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
            price1: '',
            price2: '',
            startTime: '',
            endTime: '',
            sku: '',
            page: 1
        }
    },
    reducers: {
        // 把数据存储到state
        save(state, { payload: { data: data } }) {
            console.log(data.list);
            return {...state, data, loading: false };
        },
        // 更新搜索参数
        updateSearchArgs(state, { payload }) {
            return {...state, searchArgs: payload.searchArgs };
        },
        // 显示loading状态
        showLoading(state, { payload }) {
            return {...state, loading: payload.loading };
        }
    },
    effects: {
        // 获取数据
        * query({ payload }, { select, call, put }) {

            try{
                // 请求数据时，显示loading状态
                yield put({ type: 'showLoading', payload: { loading: true } });

                // 开始请求数据
                const { data } = yield call(competeServices.fetch, payload);

                // 保存数据
                if (data) {
                    yield put({ type: 'save', payload: data });
                } 
            }
            catch(e){
                yield put({ type: 'showLoading', payload: { loading: false } });
                console.log(e);
            }

        },

        // 搜索
        * search({ payload }, { select, call, put }) {

            try{
                // 更新参数到state,并取回来当搜索参数
                yield put({ type: 'updateSearchArgs', payload: { searchArgs: payload.searchArgs } });

                // 请求数据时，显示loading状态
                yield put({ type: 'showLoading', payload: { loading: true } });


                const searchArgs = yield select(state => state.CompeteGoods.searchArgs);

                // 开始请求数据
                const { data } = yield call(competeServices.search, { searchArgs: searchArgs });

                // 保存数据
                if (data) {
                    yield put({ type: 'save', payload: data });
                } 

            }catch(e){
                yield put({ type: 'showLoading', payload: { loading: false } });
            }

        },

        // 分页
        * paginationQuery({ payload }, { select, call, put }) {

            try{
                // 请求数据时，显示loading状态
                yield put({ type: 'showLoading', payload: { loading: true } });

                let searchArgs = yield select(state => state.CompeteGoods.searchArgs);
                searchArgs.page = payload.page;

                // 开始请求数据
                const { data } = yield call(competeServices.search, { searchArgs: searchArgs });

                // 保存数据
                if (data) {
                    yield put({ type: 'save', payload: data });
                }
            }catch(e){
                yield put({ type: 'showLoading', payload: { loading: false } });
                console.log(e)
            }
        }


    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // 监听url，但ulr为‘/’时，执行query
                if (pathname === '/') {
                    dispatch({ type: 'query', payload: { page: 1 } });
                }
            })
        },

    },

};
