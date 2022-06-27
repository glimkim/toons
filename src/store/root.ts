import { useSelector } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
import { Alert } from './modules/alert';
import { User } from './modules/user';

export interface StoreState {
  user: User;
  alert: Alert;
}

const store = createStore(rootReducer);

export const getUser = () => {
  return useSelector<StoreState, User>((state) => state.user);
};

export default store;
