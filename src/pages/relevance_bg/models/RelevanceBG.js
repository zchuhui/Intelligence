//import * as competeServices from '../../../services/competeGoods';

export default {
    namespace: 'RelevanceBG',

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
        /*save(state, { payload: { data: data } }) {
            return {...state, data, loading: false };
        },*/
    },
    effects: {
        // 获取数据
        /** query({ payload }, { select, call, put }) {
            //const searchArgs = yield select(state => state.CompeteGoods.searchArgs);

            // 请求数据时，显示loading状态
            yield put({ type: 'showLoading', payload: { loading: true } });
            // 开始请求数据
            const { data } = yield call(competeServices.fetch, payload);
            //console.log(data)
            // 保存数据
            if (data) {
                yield put({ type: 'save', payload: data });
            } else {
                console.log("data null")
            }

        },*/

    },
    subscriptions: {
        /*setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // 监听url，但ulr为‘/’时，执行query
                if (pathname === '/bg') {
                    console.log("bg...")
                    //dispatch({ type: 'query', payload: { page: 1 } });
                }
            })
        },*/

    },

};
