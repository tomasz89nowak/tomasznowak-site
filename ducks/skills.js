import {generateReducer} from '../store';
import fetch from '../apiMiddleware';

const GET_REQUEST = '/about/skills/GET_REQUEST';
const GET_SUCCESS = '/about/skills/GET_SUCCESS';
const GET_FAILURE = '/about/skills/GET_FAILURE';

export const reducer = generateReducer([GET_REQUEST, GET_SUCCESS, GET_FAILURE]);

export function getSkills() {
  return fetch({
    url: 'about/skills',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
    auth: false
  });
}

const DELETE_REQUEST = '/about/skills/DELETE_REQUEST';
const DELETE_SUCCESS = '/about/skills/DELETE_SUCCESS';
const DELETE_FAILURE = '/about/skills/DELETE_FAILURE';

export function deleteSkill(id) {
  return fetch({
    method: 'DELETE',
    url: 'about/skills/' + id,
    types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
    auth: false
  });
}