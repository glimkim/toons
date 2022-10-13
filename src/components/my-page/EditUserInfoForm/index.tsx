import MobileForm from '@components/common/AccountBox/MobileForm';
import { StoreState } from '@store/root';
import React, { useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Input } from 'toons-components';
import { string } from 'yup';

interface EditForm {
  email: string;
  username: string;
  phoneNumber: string;
}

function EditForm() {
  const user = useSelector((state: StoreState) => state.user);
  const methods = useForm<EditForm>({
    mode: 'onTouched',
  });

  useEffect(() => {
    // console.log(methods.getValues());
    console.log(user);
    methods.reset({
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  useEffect(() => {
    console.log(methods.watch('phoneNumber'), 'sdahdsakjhd');
  }, [methods]);

  return (
    <LoginWrapper>
      <h1>Your Info</h1>
      <FormProvider {...methods}>
        <form>
          <Controller
            name="email"
            control={methods.control}
            render={({ field: { value } }) => (
              <Input
                id="email"
                label="Email"
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
            onMobileVerified={console.log}
            editMobile={{
              isSavedMobile: methods.watch('phoneNumber') === user.phoneNumber,
              defaultMobile: user.phoneNumber || '',
            }}
          />
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
  height: ${() => `calc(${window.innerHeight}px - 8rem)`};
  max-height: calc(100% - 4rem);
  margin: auto;
  padding-top: 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.gray00};
  overflow: hidden;
  h1 {
    font-family: 'Black Han Sans';
    font-size: 1.7rem;
  }

  @media screen and (max-height: 600px) {
    height: ${() => `calc(${window.innerHeight}px - 2rem)`};
    padding: 1rem 0;
  }
`;

export default EditForm;
