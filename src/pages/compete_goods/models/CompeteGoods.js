import * as competeServices from '../../../services/competeGoods';

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
            site:null,
            cid: '',
            bid: null,
            status: null,
            startTime: null,
            endTime: null,
            price1: null,
            price2: null,
            sku: null,
            page: 1
        },
    },
    reducers: {
        // 把数据存储到state
        save(state, { payload: { data: data} }) {
            return {...state, data,loading: false };
        },

        // 更新搜索参数
        updateSearchArgs(state, { payload }) {
            console.log(payload.searchArgs);  
            return {...state, searchArgs:payload.searchArgs};
        },
        
        // 显示loading状态
        showLoading(state, { payload }) {
            return {...state, loading:payload.loading};
        }
    },
    effects: {
        // 获取数据
        * query({ payload }, { select, call, put }) {
            // 请求数据时，显示loading状态
            yield put({ type: 'showLoading', payload:{loading:true} });
            // 开始请求数据
            const { data } = yield call(competeServices.fetch,payload);
            // 保存数据
            if(data){
                yield put({ type: 'save', payload: data});
            }else{
                console.log("data null")
            }
            
        },

        // 搜索
        * search({ payload }, { select, call, put }) {
            // 请求数据时，显示loading状态
            yield put({ type: 'showLoading', payload:{loading:true} });
            // 开始请求数据
            const { data } = yield call(competeServices.search, {searchArgs:payload.searchArgs});
            // 保存数据
            if (data) {
                yield put({type: 'save',payload:data});
                yield put({ type: 'updateSearchArgs', payload:{searchArgs:payload.searchArgs} });
            }else{
                console.log("data null")
            }


        }



    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    dispatch({ type: 'query', payload: {page:1} });
                }
            })
        },

    },

};
