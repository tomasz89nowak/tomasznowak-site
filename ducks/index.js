import { combineReducers } from 'redux';
import {reducer as auth} from './auth';
import {reducer as article} from './article';
import {reducer as articles} from './articles';
import {reducer as about} from './about';
import {reducer as skills} from './skills';

const reducers = combineReducers({
  auth,
  articles,
  article,
  about,
  skills
});

export default reducers;
