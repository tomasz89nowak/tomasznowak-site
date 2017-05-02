import axios from 'axios';
import {TOKEN_NAME, TOKEN_PREFIX} from './CONSTANTS';
import {API_URL} from './ENDPOINTS';
// import {toastr} from 'react-redux-toastr';

export const serverErrorHandle = (status) => {
  // if(status === 500){
  //   toastr.error('Błąd serwera', 'Nie można pobrać danych. Jeśli problem będzie się powtarzał, skontaktuj się z administracją.');
  //   return true;
  // }
  // if(status === 502 || status === undefined) {
  //   if(navigator && navigator.onLine === false){
  //     toastr.error('Brak połączenia z internetem', 'Sprawdź swoje połączenie sieciowe.');
  //   } else {
  //     toastr.error('Brak odpowiedzi z serwera', 'Prawdopodobnie trwa wdrożenie nowej wersji oprogramowania. Proszę spróbować ponownie za chwilę.');
  //   }
  //   return true;
  // }
  return false;
};


function fetch(attrs){
  const token = window.localStorage && localStorage.getItem(TOKEN_NAME);
  let allHeaders = {};
  if(attrs.auth !== false){
    allHeaders = {...allHeaders, 'Authorization': TOKEN_PREFIX + token}
  }
  const {url, method = 'get', headers = {}, data, extraData = {}, types, query = {}} = attrs;
  // extraData is for passing additional data only to reducer, it will be not passed as request data

  allHeaders = {...allHeaders, ...headers};
  const endpoint = `${API_URL + url + composeQuery(query)}`;
  // get and delete takes two params, post and put takes three
  let axiosParams = {method, headers: allHeaders, url: endpoint};
  if(method === 'post' || method === 'POST' || method === 'put' || method === 'PUT'){
    axiosParams = {method, headers: allHeaders, url: endpoint, data};
  }
  let requestType;
  let successType;
  let failureType;
  let deleteType;
  // types can be passed as array (required specific order!). Can be strings or functions
  if(Array.isArray(types) === true) {
    requestType = types[0];
    successType = types[1];
    failureType = types[2];
    deleteType =  types[3];
  } else {
    // types can be also passed as object attributes (specific amount and order is not required, you can omit one or two of types). Can be strings or functions
    requestType = types.request;
    successType = types.success;
    failureType = types.failure;
    deleteType = types.delete;
  }
  return dispatch => {
    handleDispatch(requestType, dispatch);
    return axios(axiosParams).then(resp =>{
      if(method.toLowerCase() === 'get') {
        handleDispatch(successType, dispatch, resp.data, extraData, method);
      } else if (method.toLowerCase() === 'delete') {
        handleDispatch(deleteType, dispatch, resp.data, extraData, method);
      }
      return {status: 'success', data: resp.data, extraData};
    }).catch(err =>{
      // eslint-disable-next-line
      const error = err && err.response || {};
      handleDispatch(failureType, dispatch, error.data, extraData);
      serverErrorHandle(error.status || 502);
      return {status: 'failure', error: error.data || null, extraData};
    });
  }
}

function handleDispatch(type, dispatch, data, extraData, method){
  // If type is string, fires an action; if type is function, fires a function.
  // You can run other action creator instead of action.
  if(type && typeof type === 'string'){
    dispatch({type, data, extraData, method});
  } else if(type && typeof type === 'function'){
    dispatch(type);
  }
}

function composeQuery(query){
  let newQuery = '';
  Object.keys(query).forEach((part, index) =>{
    if(index === 0){
      newQuery += '?';
    } else {
      newQuery += '&';
    }
    newQuery += `${part}=${query[part]}`
  });
  return newQuery;
}

export default fetch;

// examples

// simple:

// return fetch({
//   url: 'localhost:8000/samples/',
//   types: [REQUEST, SUCCESS, FAILURE],              // type can be string or function. Required exactly that order.
// });

// full featured:

// return fetch({
//   url: 'localhost:8000/samples/',
//   query: {ordering: 'name', search: 'Andrew'},
//   method: 'post',
//   headers: {'content-type': 'application/json'},
//   types: {                                         // types as an object attributes. If you need to omit one or two types.
//     request: REQUEST,
//     success: getSomething(query),
//     failure: FAILURE
//   },
//   data: data,                                      // data for request - post and put only
//   extraData: {index: 1}                            // data passed only to reducer
// });