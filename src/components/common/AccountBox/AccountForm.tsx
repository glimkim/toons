import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Input } from 'toons-components';
import { CSSTransition } from 'react-transition-group';
import { useMutation } from 'react-query';
import { signInAPI, signUpAPI } from '@apis/auth';
import { SignInResponseDTO } from '@apis/DTO/auth';
import { useDispatch } from 'react-redux';
import useSearchParameters from '@hooks/useSearchParameters';
import SubmitBtn from './SubmitBtn';
import { setAlert } from '@store/modules/alert';
import useToken from '@hooks/useToken';
import MobileForm from './MobileForm';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
interface FormProps {
  forSignUp: boolean;
}

export interface FormValues {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  code: string;
}

export const debounceChange = _.debounce(
  (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) => onChange(e),
  300,
);

const signInSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter your email.'),
  password: yup.string().required('Please enter your password.'),
});

const signUpSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter your email.'),
  password: yup.string().required('Please enter your password.'),
  username: yup.string().required('Please enter username.'),
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number.')
    .required('Please enter your mobile number.'),
  code: yup.string().required('Please enter code.'),
});

function AccountForm({ forSignUp }: FormProps) {
  const dispatch = useDispatch();
  const { deleteSearchParams, appendSearchParams } = useSearchParameters();
  const formSchema = useMemo(() => {
    return forSignUp ? signUpSchema : signInSchema;
  }, [forSignUp]);
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      phoneNumber: '',
      code: '',
    },
    mode: 'all',
    resolver: yupResolver(formSchema),
  });
  const { errors } = methods.formState;
  const { mutateAsync: submitSignInInfo, isLoading: isSigningIn } = useMutation(
    'signIn',
    signInAPI,
  );
  const { mutateAsync: submitSignUpInfo, isLoading: isSigningUp } = useMutation(
    'signUp',
    signUpAPI,
  );
  const { setToken } = useToken();
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const onMobileVerified = useCallback(() => {
    setIsMobileVerified(true);
  }, [setIsMobileVerified]);

  const onSubmit = useCallback(
    ({ email, password, username, phoneNumber }: FormValues) => {
      if (forSignUp) {
        isMobileVerified &&
          submitSignUpInfo({
            email,
            password,
            username,
            phoneNumber,
          })
            .then(() => {
              dispatch(
                setAlert({
                  alertType: 'SUCCESS',
                  alertTitle: 'Welcome to Toons!',
                  alertContents: 'Returning to sign in page!',
                }),
              );
              appendSearchParams({ authType: 'signIn' });
            })
            .catch((e) => console.dir(e));
      } else {
        // signIn
        submitSignInInfo({ email, password })
          .then((res: SignInResponseDTO) => {
            setToken(res.token);
            deleteSearchParams('authType');
          })
          .catch((err: AxiosError) => {
            err.response?.status === 401 &&
              dispatch(
                setAlert({
                  alertType: 'ERROR',
                  alertTitle: 'Invalid email or password',
                  alertContents: 'Please check your email address or password.',
                }),
              );
          });
      }
    },
    [forSignUp, isMobileVerified, submitSignUpInfo, submitSignInInfo],
  );

  return (
    <FormProvider {...methods}>
      <Form
        className={forSignUp ? 'signUpForm' : ''}
        onSubmit={methods.handleSubmit(onSubmit, (e) => console.log(e))}
      >
        <Controller
          name="email"
          control={methods.control}
          render={({ field: { onChange } }) => (
            <Input
              id="email"
              label="Email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              errorText={errors.email?.message}
              onChange={(e) => debounceChange(e, onChange)}
            />
          )}
        />
        <Controller
          name="password"
          control={methods.control}
          render={({ field: { onChange } }) => (
            <Input
              type="password"
              id="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={(e) => debounceChange(e, onChange)}
              required
              errorText={errors.password?.message}
            />
          )}
        />
        <CSSTransition
          in={forSignUp}
          timeout={forSignUp ? 700 : 300}
          unmountOnExit
        >
          <div className="joinInfo">
            <Controller
              name="username"
              control={methods.control}
              render={({ field: { onChange } }) => (
                <Input
                  id="username"
                  label="Name"
                  placeholder="Enter your username"
                  autoComplete="username"
                  onChange={(e) => debounceChange(e, onChange)}
                  required={forSignUp}
                  errorText={errors.username?.message}
                />
              )}
            />
            <MobileForm onMobileVerified={onMobileVerified} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={!forSignUp}
          timeout={300}
          classNames="rememberMe"
          unmountOnExit
        >
          <div className="checkboxWrapper">
            <Checkbox id="rememberUser" onChange={console.log} />
            <span>Remember Me</span>
          </div>
        </CSSTransition>
        <CSSTransition in={!forSignUp} timeout={300} unmountOnExit>
          <div className="loginButtonGroup">
            <SubmitBtn submitType={'signIn'} isLoading={isSigningIn} />
            <button className="findBtn" type="button">
              Forgot passoword?
            </button>
          </div>
        </CSSTransition>
        <CSSTransition
          in={forSignUp}
          timeout={300}
          unmountOnExit
          classNames="signUpBtn"
        >
          <SubmitBtn submitType={'signUp'} isLoading={isSigningUp} />
        </CSSTransition>
      </Form>
    </FormProvider>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.14rem;
  overflow: hidden;
  padding: 0 2rem;
  > div {
    margin-bottom: 1rem;
  }
  div.checkboxWrapper {
    display: flex;
    flex-direction: row;
    gap: 0.7rem;
    width: 100%;
  }
  div.loginButtonGroup {
    display: flex;
    flex-direction: column;
    button:first-of-type {
      position: relative;
      top: 0;
      transform-origin: left center;
    }
    button.findBtn {
      width: fit-content;
      align-self: flex-end;
      margin-top: 0.36rem;
      font-size: 0.875rem;
    }
    &.enter {
      opacity: 0;
    }
  }

  div.joinInfo {
    opacity: 0;
    > div {
      margin-bottom: 0.7rem;
    }
  }
  &.signUpForm {
    height: calc(100% - 60px);
    div.loginButtonGroup {
      button:first-of-type {
        transition: 0;
        animation-name: buttonMove;
        animation-duration: 0.6s;
        animation-fill-mode: forwards;
      }
      button.findBtn {
        animation-name: moveToRight;
        animation-duration: 0.6s;
        animation-fill-mode: forwards;
      }
    }
    button[class*='signUpBtn'] {
      opacity: 0;
      transform: translateY(50%);
      &.signUpBtn-enter-done {
        transition-delay: 0.2s;
        opacity: 1;
        transform: translateY(0);
      }
    }

    div[class*='rememberMe'] {
      display: none;
    }

    div.joinInfo {
      animation-name: appearFromTop;
      animation-duration: 0.8s;
      animation-fill-mode: forwards;
      animation-delay: 0.2s;
      > div {
        margin-bottom: 1rem;
      }
    }
  }

  @keyframes appearFromTop {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes moveToRight {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes buttonMove {
    from {
      transform: translateX(0) scaleX(1);
    }
    to {
      transform: translateX(-10%) scaleX(0);
    }
  }
`;

export default AccountForm;
