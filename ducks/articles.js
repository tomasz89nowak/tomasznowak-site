import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const GET_REQUEST = '/articles/GET_REQUEST';
const GET_SUCCESS = '/articles/GET_SUCCESS';
const GET_FAILURE = '/articles/GET_FAILURE';

export const reducer = generateReducer([GET_REQUEST, GET_SUCCESS, GET_FAILURE]);

export function getArticles() {
  return fetch({
    url: 'articles/',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    auth: false
  });
}