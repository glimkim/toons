import Axios from './config';
import { SignInRequestDTO, SignUpRequestDTO } from './DTO/auth';

export const signInAPI = async (signInInfo: SignInRequestDTO) => {
  return (await Axios.post('/auth', signInInfo)).data;
};

export const signUpAPI = async (signUpInfo: SignUpRequestDTO) => {
  return (await Axios.post('/api/members', signUpInfo)).data;
};
