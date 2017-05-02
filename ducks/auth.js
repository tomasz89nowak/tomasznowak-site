import {generateReducer} from '../store';
import fetch from '../apiMiddleware';
import {TOKEN_NAME} from '../CONSTANTS';
import Router from 'next/router';

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

export function checkAuth(){
  const isLoggedIn = localStorage.getItem(TOKEN_NAME) || null;
  if(!isLoggedIn) {
    Router.replace('/login');
    return false;
  } else {
    return true;
  }
}

// function verifyUser() {
//   return fetch({
//     method: 'POST',
//     url: 'users/verify',
//     types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
//     data: {token: localStorage.getItem(TOKEN_NAME)},
//   });
// }