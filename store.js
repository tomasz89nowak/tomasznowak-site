import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './ducks';

const middleware = [thunk];
let composedMiddleware = applyMiddleware(...middleware);

export const initStore = () => {
  return createStore(reducers, composedMiddleware);
};


export function generateReducer(types, initialState = {
  isFetching: false,
  result: null,
  error:false
}){

   return function reducer(state = initialState, action) {
    switch (action.type) {
      case types[0]:
        return {
          ...state,
          isFetching: true
        };
      case types[1]:
        return {
          ...state,
          isFetching: false,
          result:action.data,
          error:false
        };
      case types[2]:
        return {
          ...state,
          isFetching: false,
          error: action.data || true
        };
      default:
        return state;
    }
  }
}


