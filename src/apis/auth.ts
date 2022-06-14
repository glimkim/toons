import Axios from './config';
import { SignInRequestDTO } from './DTO/auth';

export const signInAPI = async (signInInfo: SignInRequestDTO) => {
  return (await Axios.post('/auth', signInInfo)).data;
};
