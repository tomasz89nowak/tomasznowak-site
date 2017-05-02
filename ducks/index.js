import { combineReducers } from 'redux';
import {reducer as auth} from './auth';
import {reducer as article} from './article';
import {reducer as articles} from './articles';
import {reducer as about} from './about';
import {reducer as skills} from './skills';
import {reducer as users} from './users';
import {reducer as user} from './user';

const reducers = combineReducers({
  auth,
  articles,
  article,
  about,
  skills,
  users,
  user
});

export default reducers;
