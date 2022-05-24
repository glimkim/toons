import React from 'react';
import styled from 'styled-components';

function LoginBox() {
  return (
    <LoginContainer>
      <div className="loginWrapper"></div>
      <div className="loginBg" />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  div.loginWrapper {
    position: absolute;
    z-index: 1000;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    width: 24rem;
    height: calc(100% - 4rem);
    margin: auto;
    border-radius: 1rem;
    background-color: #fff;
    -webkit-box-shadow: 5px -1px 38px 2px rgba(164, 244, 196, 0.2);
    box-shadow: 5px -1px 38px 2px rgba(164, 244, 196, 0.2);
  }
  div.loginBg {
    position: fixed;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export default LoginBox;
