import Axios from './config';
import { SignInDTO } from './DTO/auth';

export const signInAPI = async (signInInfo: SignInDTO) => {
  return (await Axios.post('/auth', signInInfo)).data;
};
