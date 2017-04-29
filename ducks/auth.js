import {generateReducer} from '../store';
import fetch from '../apiMiddleware';
import {TOKEN_NAME} from '../CONSTANTS';

const LOGIN_REQUEST = '/articles/:id/LOGIN_REQUEST';
const LOGIN_SUCCESS = '/articles/:id/LOGIN_SUCCESS';
const LOGIN_FAILURE = '/articles/:id/LOGIN_FAILURE';

export const reducer = generateReducer([LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]);

export function login(creds){
  return fetch({
    method: 'POST',
    url: 'users/login',
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    data: creds,
    auth: false,
    headers: {'Content-Type': 'application/json'}
  });
}

export function setToken(status, data = {}){
  if(status === 'success' && data.user){
    localStorage.setItem(TOKEN_NAME, data.user.token);
  }
}