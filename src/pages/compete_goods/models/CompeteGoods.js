import * as competeServices from '../../../services/competeGoods';

export default {
  namespace: 'CompeteGoods',

  state: {
      data: {
        page: {
          page:0,
          pageSize:0,
          count:0,
          pageNum:0
        },
        list:[],
      },
      loading: false, 
  },
  reducers: {
    save(state, { payload: { data: data} }) {
      return { ...state, data, loading: false }; 
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(competeServices.fetch,payload); 
      yield put({ type: 'save', payload: data });
    },
    *search({ payload }, { call , put}){
      const { data } = yield call(competeServices.search, payload); 
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
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
           dispatch({type: 'fetch',payload: query});
        }
      })
    },

  },

};

