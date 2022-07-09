import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ToonsLogo } from '@images/common/logo_basic.svg';
import useSearchParameters from '@hooks/useSearchParameters';
import { useDispatch, useSelector } from 'react-redux';
import { unsetUser, User } from '@store/modules/user';
import { StoreState } from '@store/root';

const headerHeight = '4.4rem';

function Header() {
  const { appendSearchParams } = useSearchParameters();
  const { token } = useSelector<StoreState, User>((state) => state.user);
  const dispatch = useDispatch();
  const onClickAuthBtn = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (!!token) {
        dispatch(unsetUser());
      } else {
        appendSearchParams({
          authType: 'signIn',
        });
      }
    },
    [token],
  );

  return (
    <StyledHeader>
      <div className="wrapper">
        <Link to="/" className="logo">
          <ToonsLogo />
        </Link>
        <MainMenuList>
          <li>
            <a href="#mainMenu">Webtoons</a>
            <ul className="subMenuList">
              <li>
                <Link to="webtoons/naver">Naver</Link>
              </li>
              <li>
                <Link to="webtoons/daum">Kakao</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#login" onClick={onClickAuthBtn}>
              {!!token ? 'LogOut' : 'Login'}
            </a>
          </li>
        </MainMenuList>
      </div>
    </StyledHeader>
  );
}

const MainMenuList = styled.ul`
  display: flex;
  height: ${headerHeight};
  > li {
    //mainMenuLi
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    * {
      color: #2b2b2b;
    }
    > a {
      //mainMenu
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 0.7rem;
      background-color: ${(props) => props.theme.colors.main};
      font-weight: bold;
      transition: 0.3s;
    }
    ul.subMenuList {
      position: absolute;
      z-index: 5;
      top: -3.4rem;
      display: flex;
      flex-direction: column;
      width: 100%;
      opacity: 0;
      transition: 0.3s;
      background-color: ${(props) => props.theme.colors.gray50};
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
      > a {
        background-color: ${(props) => props.theme.colors.gray50};
        color: #fff;
      }
      ul.subMenuList {
        top: 4.4rem;
        opacity: 1;
      }
    }
  }
`;

const StyledHeader = styled.header`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.4rem;
  background-color: ${(props) => props.theme.colors.main};
  div.wrapper {
    display: flex;
    align-items: center;
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
