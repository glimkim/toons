import { getAPIHeaderWithAuth } from '@utils/getAPIHeaderWithAuth';
import Axios from './config';
import {
  MobileVerificationCheckDTO,
  MobileVerificationRequestDTO,
  SignInRequestDTO,
  SignUpRequestDTO,
  UserInfo,
} from './DTO/auth';

export const signInAPI = async (signInInfo: SignInRequestDTO) => {
  return (await Axios.post('/auth', signInInfo)).data;
};

export const signUpAPI = async (signUpInfo: SignUpRequestDTO) => {
  return (await Axios.post('/api/members', signUpInfo)).data;
};

export const sendMobileVerification = async (
  mobileInfo: MobileVerificationRequestDTO,
) => {
  return await Axios.post('api/members/certification/send', mobileInfo);
};

export const checkMobileVerification = async (
  verificationInfo: MobileVerificationCheckDTO,
) => {
  return await Axios.post('api/members/certification/check', verificationInfo);
};

export const getUserInfoAPI = async (token: string) => {
  return (
    await Axios.get<UserInfo>('/api/members', {
      headers: getAPIHeaderWithAuth(token),
    })
  ).data;
};
