import { combineReducers } from 'redux';
import user from './user';
import alert from './alert';
import alarms from './alarms';

const rootReducer = combineReducers({
  alarms,
  user,
  alert,
});

export default rootReducer;
