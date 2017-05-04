import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const GET_REQUEST = '/about/GET_REQUEST';
const GET_SUCCESS = '/about/GET_SUCCESS';
const GET_FAILURE = '/about/GET_FAILURE';

export const reducer = generateReducer([GET_REQUEST, GET_SUCCESS, GET_FAILURE]);

export function getAbout() {
  return fetch({
    url: 'about/',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    auth: false
  });
}

export function putAbout(data) {
  return fetch({
    method: 'PUT',
    url: 'about/',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    auth: false,
    data
  });
}