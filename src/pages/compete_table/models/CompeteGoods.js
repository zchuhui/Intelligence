import * as competeServices from '../../../services/competeGoods';

export default {

  namespace: 'CompeteGoods',

  state: {
      data:[],
      total: null, 
  },
  reducers: {
    save(state,  { payload: { data: data} }) {
      return { ...state, data }; 
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(competeServices.fetch,payload); 
      yield put({ type: 'save', payload: data });
    },
    *search({ payload }, { call , put}){
      const { data } = yield call(competeServices.search, payload); 
      yield put({ type: 'save', payload: data});

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

