import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const REQUEST = '/users:id/REQUEST';
const SUCCESS = '/users:id/SUCCESS';
const FAILURE = '/users:id/FAILURE';

export const reducer = generateReducer([REQUEST, SUCCESS, FAILURE]);

export function getUser(id) {
  return fetch({
    url: 'users/' + id + '/',
    types: [REQUEST, SUCCESS, FAILURE]
  });
}


export function postUser(data) {
  return fetch({
    method: 'POST',
    url: 'users/',
    types: [REQUEST, SUCCESS, FAILURE],
    data
  });
}

export function putUser(data, id) {
  return fetch({
    method: 'PUT',
    url: 'users/' + id + '/',
    types: [REQUEST, SUCCESS, FAILURE],
    data
  });
}