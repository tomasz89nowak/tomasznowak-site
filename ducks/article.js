import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const GET_REQUEST = '/articles/:id/GET_REQUEST';
const GET_SUCCESS = '/articles/:id/GET_SUCCESS';
const GET_FAILURE = '/articles/:id/GET_FAILURE';
const CLEAR = '/notes/:id/CLEAR';

export const reducer = generateReducer([GET_REQUEST, GET_SUCCESS, GET_FAILURE]);

export function getArticle(id){
  return fetch({
    url: 'articles/' + id,
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    auth: false
  });
}

export function clearArticle(){
  return dispatch => {
    dispatch({type: CLEAR});
  }
}

export function postArticle(data) {
  return fetch({
    method: 'POST',
    url: 'articles/',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    data
  });
}

export function putArticle(data, id) {
  return fetch({
    method: 'PUT',
    url: 'articles/' + id + '/',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    data
  });
}