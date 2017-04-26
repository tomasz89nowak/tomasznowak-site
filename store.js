import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {reducer as articles} from './ducks/articles';

const middleware = [thunk];
let composedMiddleware = applyMiddleware(...middleware);

const reducers = combineReducers({
  articles
});
const store = createStore(reducers, composedMiddleware);

export const initStore = (initialState) => {
  return store;
};


export function generateReducer(initialState = {
  isFetching: false,
  result: null,
  error:false
}, types){

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


