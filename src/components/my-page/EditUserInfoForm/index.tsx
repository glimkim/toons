import { updateUserInfoAPI } from '@apis/auth';
import { UpdateUserRequestDTO } from '@apis/DTO/auth';
import MobileForm from '@components/common/AccountBox/MobileForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { setAlert } from '@store/modules/alert';
import { StoreState } from '@store/root';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input } from 'toons-components';
import * as yup from 'yup';

interface EditForm {
  email: string;
  username: string;
  phoneNumber: string;
}

const editFormScheme = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter your email.'),
  username: yup.string().required('Please enter username.'),
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number.')
    .required('Please enter your mobile number.'),
  code: yup.string(),
});

function EditForm() {
  const user = useSelector((state: StoreState) => state.user);
  const methods = useForm<EditForm>({
    mode: 'onTouched',
    resolver: yupResolver(editFormScheme),
  });
  const newMobile = useMemo(() => {
    return methods.watch('phoneNumber');
  }, [methods.watch('phoneNumber')]);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const { mutateAsync: updateUserInfo } = useMutation(
    'update-user-info',
    (newInfo: UpdateUserRequestDTO) => updateUserInfoAPI(newInfo, user.token!),
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMobileVerified = useCallback(() => {
    setIsMobileVerified(true);
  }, [setIsMobileVerified]);

  const onSubmitEditForm = useCallback(
    (e: EditForm) => {
      if (!user?.token) {
        dispatch(
          setAlert({
            alertType: 'WARNING',
            alertTitle: 'Login time has expired.',
            alertContents: 'Please login again :)',
          }),
        );
        return navigate('/?authType=signIn');
      }
      isMobileVerified
        ? updateUserInfo(e)
            .then(() => {
              dispatch(
                setAlert({
                  alertType: 'SUCCESS',
                  alertTitle: 'Your Info has updated!',
                }),
              );
            })
            .catch((err) => {
              dispatch(
                setAlert({
                  alertType: 'ERROR',
                  alertTitle: 'Update failed',
                  alertContents: 'Please try again',
                }),
              );
              console.dir(err);
            })
        : dispatch(
            setAlert({
              alertType: 'WARNING',
              alertTitle: '모바일 인증을 진행해주세요.',
            }),
          );
    },
    [isMobileVerified, updateUserInfo, navigate],
  );

  useEffect(() => {
    user?.phoneNumber === newMobile
      ? setIsMobileVerified(true)
      : setIsMobileVerified(false);
  }, [user, newMobile]);

  useEffect(() => {
    methods.reset({
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  return (
    <LoginWrapper>
      <h1>Your Profile</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitEditForm)}>
          <Controller
            name="email"
            control={methods.control}
            render={({ field: { value } }) => (
              <Input
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={value}
                disabled
              />
            )}
          />
          <Controller
            name="username"
            control={methods.control}
            render={({ field: { value, onChange } }) => (
              <Input
                id="username"
                label="Name"
                placeholder="Enter your name"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <MobileForm
            onMobileVerified={onMobileVerified}
            editMobile={{
              isSavedMobile: newMobile === user.phoneNumber,
              defaultMobile: user.phoneNumber || '',
            }}
          />
          <Button type="submit" fullWidth>
            Update Profile
          </Button>
        </form>
      </FormProvider>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  max-width: calc(100vw - 2rem);

  padding: 2rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.gray00};
  overflow: hidden;
  h1 {
    font-family: 'Black Han Sans';
    font-size: 1.7rem;
  }

  form {
    width: 100%;
    margin-top: 2rem;
    > div {
      margin-bottom: 0.7rem;
    }
    button {
      margin-top: 2rem;
    }
  }

  @media screen and (max-height: 600px) {
    height: ${() => `calc(${window.innerHeight}px - 2rem)`};
    padding: 1rem 0;
  }
`;

export default EditForm;
