import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const REQUEST = '/users/REQUEST';
const GET_SUCCESS = '/users/GET_SUCCESS';
const FAILURE = '/users/FAILURE';
const DELETE_SUCCESS = '/users/:id/DELETE_SUCCESS';

export const reducer = generateReducer([REQUEST, GET_SUCCESS, FAILURE, DELETE_SUCCESS]);

export function getUsers() {
  return fetch({
    url: 'users/',
    types: [REQUEST, GET_SUCCESS, FAILURE]
  });
}


export function deleteUser(id) {
  return fetch({
    method: 'DELETE',
    url: 'users/' + id + '/',
    types: [REQUEST, null, FAILURE, DELETE_SUCCESS],
    extraData: {id}
  });
}