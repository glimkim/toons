import { createStore } from 'redux';
import rootReducer from './modules';
import { AlarmList } from './modules/alarms';
import { Alert } from './modules/alert';
import { User } from './modules/user';

export interface StoreState {
  user: User;
  alert: Alert;
  alarms: AlarmList;
}

const store = createStore(rootReducer);

export default store;
