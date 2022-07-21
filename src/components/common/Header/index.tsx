import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ToonsLogo } from '@images/common/logo_basic.svg';
import useSearchParameters from '@hooks/useSearchParameters';
import { useDispatch, useSelector } from 'react-redux';
import { unsetUser, User } from '@store/modules/user';
import { StoreState } from '@store/root';
import useToken from '@hooks/useToken';
import { setAlert } from '@store/modules/alert';
import { headerHeight } from '@styles/css';
import useScroll from '@hooks/useScroll';

function Header() {
  const { scrollY } = useScroll();
  const { appendSearchParams } = useSearchParameters();
  const user = useSelector<StoreState, User>((state) => state.user);
  const { removeToken } = useToken();
  const dispatch = useDispatch();
  const onClickAuthBtn = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (!!user.token) {
        dispatch(unsetUser());
        removeToken();
        user?.tokenTimeout && clearTimeout(user.tokenTimeout);
        dispatch(
          setAlert({
            alertType: 'SUCCESS',
            alertTitle: '로그아웃 되었습니다.',
          }),
        );
      } else {
        appendSearchParams({
          authType: 'signIn',
        });
      }
    },
    [user],
  );

  return (
    <StyledHeader
      invisible={
        window.location.pathname === '/' && scrollY < window.innerHeight - 200
      }
    >
      <div className="wrapper">
        <Link to="/" className="logo">
          <ToonsLogo />
        </Link>
        <MainMenuList>
          <li>
            <a href="#mainMenu" onClick={(e) => e.preventDefault()}>
              Webtoons
            </a>
            <ul className="subMenuList">
              <li>
                <Link to="/webtoons/naver">Naver</Link>
              </li>
              <li>
                <Link to="/webtoons/kakao">Kakao</Link>
              </li>
            </ul>
          </li>
          {user.token && (
            <li>
              <a href="#mypage">My Page</a>
            </li>
          )}
          <li>
            <a href="#login" onClick={onClickAuthBtn}>
              {!!user.token ? 'LogOut' : 'Login'}
            </a>
          </li>
        </MainMenuList>
      </div>
    </StyledHeader>
  );
}

const MainMenuList = styled.ul`
  display: flex;
  > li {
    //mainMenuLi
    height: ${headerHeight};
    width: fit-content;
    overflow: hidden;
    * {
      color: #2b2b2b;
    }
    > a {
      //mainMenu
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      height: ${headerHeight};
      font-style: normal;
      padding: 0 0.7rem;
      background-color: ${(props) => props.theme.colors.main};
      font-weight: bold;
      transition: 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 4px;
        background-color: ${(props) => props.theme.colors.gray40};
        transform-origin: left center;
        transform: scaleX(0);
        transition: 0.6s;
      }
    }
    ul.subMenuList {
      position: relative;
      top: -100px;
      display: flex;
      visibility: hidden;
      z-index: 1;
      flex-direction: column;
      width: 100%;
      transition: top 0.6s;
      transition: display 0;
      overflow: hidden;
      animation-name: display;
      li {
        width: 100%;
        padding: 0.7rem;
        a {
          display: block;
          font-weight: normal;
          font-size: 1rem;
          transition: 0.3s;
          transform-origin: left center;
          color: #fff;
          &:hover {
            transform: scale(1.1, 1.1);
            font-weight: bold;
          }
        }
      }
    }
    &:hover {
      height: fit-content;
      > a {
        font-style: italic;
        &::after {
          transform: scaleX(1);
        }
      }
      ul.subMenuList {
        top: 0;
        visibility: visible;
        background-color: ${(props) => props.theme.colors.gray50};
        opacity: 1;
      }
    }
  }
`;

const StyledHeader = styled.header<{ invisible: boolean }>`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4.4rem;
  background-color: ${(props) => props.theme.colors.main};
  opacity: ${({ invisible }) => (invisible ? 0 : 1)};
  transition: 0.3s;
  div.wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  a.logo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 8rem;
    height: ${headerHeight};
    svg {
      width: 8rem;
      height: auto;
    }
  }
`;

export default Header;
