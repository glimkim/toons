import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import AccountForm from './AccountForm';
import useSearchParameters from '@hooks/useSearchParameters';
import useToken from '@hooks/useToken';
import { Icon, Logo } from 'toons-components';

function AccountModal() {
  // const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { queryParams, appendSearchParams } = useSearchParameters('authType');
  const isSignUp = useMemo(() => {
    return queryParams[0] === 'signUp';
  }, [queryParams]);
  const { tokenFromLS, removeToken } = useToken();

  const onClickSignUp = useCallback(() => {
    appendSearchParams({ authType: 'signUp' });
  }, []);

  const onSocialLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget;
      if (name === 'kakao') {
        window.open(
          'https://api.jinwoo.space/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect',
          '_self',
        );
      } else {
        window.open(
          'https://api.jinwoo.space/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect',
          '_self',
        );
      }
    },
    [],
  );

  useEffect(() => {
    // to avoid scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      if (tokenFromLS === 'expired') {
        removeToken();
      }
    };
  }, []);

  return (
    <LoginWrapper
      className={isSignUp ? 'signUpForm loginWrapper' : 'loginWrapper'}
    >
      <Link to="/" className="logo">
        <Logo style="LIGHT" />
      </Link>
      <AccountForm forSignUp={isSignUp} />
      <CSSTransition in={!isSignUp} timeout={400} unmountOnExit>
        <SocialLoginWrapper className="socialWrapper">
          <div className="borderSpan">
            <span className="text">OR</span>
          </div>
          <div className="socialButtonGroup">
            <button type="button" name="google" onClick={onSocialLogin}>
              <Icon icon="Google" />
            </button>
            <button type="button" name="kakao" onClick={onSocialLogin}>
              <Icon icon="Kakao" />
            </button>
          </div>
        </SocialLoginWrapper>
      </CSSTransition>
      <CSSTransition in={!isSignUp} timeout={300} unmountOnExit>
        <div className="signUpBox">
          Need an account?
          <button type="button" onClick={onClickSignUp}>
            Sign Up
          </button>
        </div>
      </CSSTransition>
    </LoginWrapper>
  );
}

const SocialLoginWrapper = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  padding: 2.14rem 2rem 0;
  div.borderSpan {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    &:before,
    &:after {
      content: '';
      display: block;
      width: 50%;
      height: 1px;
      background-color: ${(props) => props.theme.colors.gray50};
    }
    span.text {
      display: block;
      padding: 0 0.7rem;
      height: 1.7rem;
      line-height: 1.7rem;
      background-color: ${(props) => props.theme.colors.gray50};
      border-radius: 0.36rem;
      color: ${(props) => props.theme.colors.gray00};
    }
  }
  div.socialButtonGroup {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    padding: 2rem 0 1.7rem;
    button {
      width: auto;
    }
  }
  &.enter {
    opacity: 0;
  }
  &.enter-done {
    animation-name: any;
    animation-duration: 1.2s;
    animation-fill-mode: forwards;
  }
`;

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
  a.logo {
    height: 3.5rem;
    * {
      height: 100%;
      width: auto;
    }
  }

  div.signUpBox {
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.875rem;
    > button {
      font-weight: bold;
      text-decoration: underline;
    }
    &.enter {
      opacity: 0;
    }
    &.enter-done {
      animation-name: any;
      animation-duration: 1.2s;
      animation-fill-mode: forwards;
    }
  }
  @keyframes any {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.signUpForm {
    div.socialWrapper {
      animation-name: downAndDisappear;
      animation-duration: 0.6s;
      animation-fill-mode: forwards;
      &:exit-done {
        display: none;
      }
    }

    div.signUpBox {
      animation-name: downAndDisappear;
      animation-duration: 0.8s;
      animation-fill-mode: forwards;
      &.exit-done {
        display: none;
        opacity: 0;
      }
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

  @media screen and (max-height: 600px) {
    height: ${() => `calc(${window.innerHeight}px - 2rem)`};
    padding: 1rem 0;
  }
`;

export default AccountModal;
