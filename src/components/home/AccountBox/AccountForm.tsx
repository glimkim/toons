import React from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Input } from 'toons-components';
import { CSSTransition } from 'react-transition-group';

interface FormProps {
  forSignUp: boolean;
}

function AccountForm({ forSignUp }: FormProps) {
  return (
    <Form className={forSignUp ? 'signUpForm' : ''}>
      <Input
        id="email"
        label="Email"
        onChange={console.log}
        placeholder="Enter your email"
      />
      <Input
        id="password"
        label="Password"
        onChange={console.log}
        placeholder="Enter your password"
      />
      <CSSTransition in={forSignUp} timeout={800} unmountOnExit>
        <div className="joinInfo">
          <Input
            id="email"
            label="Email"
            onChange={console.log}
            placeholder="Enter your email"
          />
          <Input
            id="email"
            label="Email"
            onChange={console.log}
            placeholder="Enter your email"
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
          <Button fullWidth>Sing In</Button>
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
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.14rem;
  overflow: hidden;
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
    margin-top: 1.14rem;
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
