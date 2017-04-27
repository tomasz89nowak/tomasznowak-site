import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {reducer as articles} from './ducks/articles';
import {reducer as about} from './ducks/about';

const middleware = [thunk];
let composedMiddleware = applyMiddleware(...middleware);

const reducers = combineReducers({
  articles,
  about
});

export const initStore = (aa) => {
const store = createStore(reducers, composedMiddleware);
  return store;
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


