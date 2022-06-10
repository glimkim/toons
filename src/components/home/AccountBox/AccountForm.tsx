import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Input } from 'toons-components';
import { CSSTransition } from 'react-transition-group';
import { useMutation } from 'react-query';
import { Formik } from 'formik';
import { signInAPI } from '@apis/auth';

interface FormProps {
  forSignUp: boolean;
}

type SignInFormValues = {
  email: string;
  password: string;
};

type SignUpFormValues = {
  email: string;
  password: string;
  username: string;
  phone: string;
};

function AccountForm({ forSignUp }: FormProps) {
  const formInitialValues: { [key: string]: string } = forSignUp
    ? {
        email: '',
        password: '',
        username: '',
        phone: '',
      }
    : {
        email: '',
        password: '',
      };
  const { mutateAsync: submitSignInInfo } = useMutation('signIn', signInAPI);

  const onSubmit = useCallback(
    (formValues: { [key: string]: string }) => {
      if (forSignUp) {
      } else {
        // signIn
        console.log(formValues as SignInFormValues, 'sss');
        submitSignInInfo(formValues as SignInFormValues).then((e) =>
          console.log(e),
        );
        // submitSignInInfo({});
      }
    },
    [forSignUp],
  );

  return (
    <Formik initialValues={formInitialValues} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Form className={forSignUp ? 'signUpForm' : ''}>
          <Input
            id="email"
            label="Email"
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            id="password"
            label="Password"
            onChange={handleChange}
            placeholder="Enter your password"
            type="password"
          />
          <CSSTransition in={forSignUp} timeout={800} unmountOnExit>
            <div className="joinInfo">
              <Input
                id="username"
                label="Name"
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <Input
                id="contact"
                label="Mobile"
                onChange={handleChange}
                placeholder="Enter your mobile number"
              />
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
              <Button
                fullWidth
                onClick={(e) => {
                  console.log(values);
                  handleSubmit();
                }}
              >
                Sing In
              </Button>
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
            <Button fullWidth>Sing Up</Button>
          </CSSTransition>
        </Form>
      )}
    </Formik>
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
  }
  button[class*='signUpBtn'] {
    margin-top: 1.14rem;
    opacity: 0;
    transform: translateY(50%);
  }
  div.joinInfo {
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
      &[class*='enter'] {
        animation-name: appearFromBottom;
        animation-duration: 0.6s;
        animation-delay: 0.6s;
        animation-fill-mode: forwards;
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

  @keyframes appearFromBottom {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
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

  @keyframes downAndDisappear {
    0% {
      top: 0;
      opacity: 1;
    }
    50% {
      top: 100px;
    }
    100% {
      top: 100px;
      display: none;
      opacity: 0;
    }
  }
`;

export default AccountForm;
