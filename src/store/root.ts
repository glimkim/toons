import { useSelector } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
import { User } from './modules/user';

export interface StoreState {
  user: User;
}

const store = createStore(rootReducer);

export const getUser = () => {
  return useSelector<StoreState, User>((state) => state.user);
};

export default store;
