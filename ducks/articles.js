import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const GET_REQUEST = '/notes/GET_REQUEST';
const GET_SUCCESS = '/notes/GET_SUCCESS';
const GET_FAILURE = '/notes/GET_FAILURE';

export const reducer = generateReducer(null, [GET_REQUEST, GET_SUCCESS, GET_FAILURE]);

export function getNotes() {
  return fetch({
    url: 'notes/',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    auth: false
  });
}