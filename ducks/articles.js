import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const REQUEST = '/articles/REQUEST';
const GET_SUCCESS = '/articles/GET_SUCCESS';
const FAILURE = '/articles/FAILURE';
const DELETE_SUCCESS = '/articles/:id/DELETE_SUCCESS';

export const reducer = generateReducer([REQUEST, GET_SUCCESS, FAILURE, DELETE_SUCCESS]);

export function getArticles() {
  return fetch({
    url: 'articles/',
    types: [REQUEST, GET_SUCCESS, FAILURE],
    auth: false
  });
}


export function deleteArticle(id) {
  return fetch({
    method: 'DELETE',
    url: 'articles/' + id + '/',
    types: [REQUEST, null, FAILURE, DELETE_SUCCESS],
    extraData: {id}
  });
}