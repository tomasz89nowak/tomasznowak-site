import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const REQUEST = '/about/skills/REQUEST';
const SUCCESS = '/about/skills/SUCCESS';
const FAILURE = '/about/skills/FAILURE';
const DELETE_SUCCESS = '/about/skills/DELETE_SUCCESS';

export const reducer = generateReducer([REQUEST, SUCCESS, FAILURE, DELETE_SUCCESS]);

export function getSkills() {
  return fetch({
    url: 'about/skills',
    types: [REQUEST, SUCCESS, FAILURE],
    auth: false
  });
}

export function deleteSkill(id) {
  return fetch({
    method: 'DELETE',
    url: 'about/skills/' + id,
    types: [REQUEST, null, FAILURE, DELETE_SUCCESS],
    auth: false,
    extraData: {id}
  });
}

export function postSkill(data) {
  return fetch({
    method: 'POST',
    url: 'about/skills/',
    types: [null, null, null],
    auth: false,
    data
  });
}

export function getSkill(id) {
  return fetch({
    url: 'about/skills/' + id + '/',
    types: [null, null, null],
    auth: false
  });
}

export function putSkill(data, id) {
  return fetch({
    method: 'PUT',
    url: 'about/skills/' + id + '/',
    types: [null, null, null],
    auth: false,
    data
  });
}