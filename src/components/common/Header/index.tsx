import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useSearchParameters from '@hooks/useSearchParameters';
import { useDispatch, useSelector } from 'react-redux';
import { unsetUser, User } from '@store/modules/user';
import { StoreState } from '@store/root';
import useToken from '@hooks/useToken';
import { setAlert } from '@store/modules/alert';
import { headerHeight } from '@styles/css';
import useScroll from '@hooks/useScroll';
import { Logo } from 'toons-components';
import MobileMenuBtn from './MobileMenuBtn';

function Header() {
  const {
    scroll: { scrollY },
  } = useScroll();
  const { pathname } = useLocation();
  const isInvisible = useMemo(() => {
    return pathname === '/' && scrollY < window.innerHeight - 200;
  }, [pathname, scrollY]);
  const { appendSearchParams } = useSearchParameters();
  const user = useSelector<StoreState, User>((state) => state.user);
  const { removeToken } = useToken();
  const dispatch = useDispatch();
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);

  const onToggleMobileBtn = useCallback(() => {
    setMobileMenuActive((prev) => {
      document
        .getElementById('header')
        ?.querySelectorAll('.active')
        .forEach((el) => el.classList.remove('active'));
      return !prev;
    });
  }, [setMobileMenuActive]);

  const handleMenuClick = useCallback(() => {
    mobileMenuActive && setMobileMenuActive(false);
  }, [mobileMenuActive]);

  const onClickAuthBtn = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      handleMenuClick();
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
    [user, handleMenuClick, appendSearchParams],
  );

  const onClickMainMenuWithSubList = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.currentTarget?.classList.toggle('active');
    },
    [mobileMenuActive],
  );

  useEffect(() => {
    if (mobileMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuActive]);

  return (
    <StyledHeader
      id="header"
      invisible={isInvisible}
      className={mobileMenuActive ? 'mobileActive' : ''}
    >
      <div className="backDrop" />
      <div className="wrapper">
        <Link to="/" className="logo">
          <Logo style="BASIC" />
        </Link>
        <MainMenuList className="mainMenuList">
          <li>
            <a href="#mainMenu" onClick={onClickMainMenuWithSubList}>
              Webtoons
            </a>
            <ul className="subMenuList">
              <li>
                <Link to="/webtoons/naver" onClick={handleMenuClick}>
                  Naver
                </Link>
              </li>
              <li>
                <Link to="/webtoons/kakao" onClick={handleMenuClick}>
                  Kakao
                </Link>
              </li>
            </ul>
          </li>
          {user.token && (
            <li>
              <Link to="/my-page" onClick={handleMenuClick}>
                My Page
              </Link>
            </li>
          )}
          <li>
            <a href="#login" onClick={onClickAuthBtn}>
              {!!user.token ? 'LogOut' : 'Login'}
            </a>
          </li>
        </MainMenuList>
        <MobileMenuBtn
          isMenuActive={mobileMenuActive}
          onClick={onToggleMobileBtn}
        />
      </div>
    </StyledHeader>
  );
}

const MainMenuList = styled.ul`
  display: flex;
  @media screen and (min-width: 768px) {
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
  }

  @media screen and (max-width: 767px) {
    position: absolute;
    width: 100%;
    top: 4.4rem;
    left: 0;
    min-height: 20vh;
    padding: 2rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.main};
    transform: translateY(-50%) translateZ(-100px);
    opacity: 0;
    transition: 0.4s;
    > li {
      &:first-of-type {
        margin-bottom: 1rem;
      }
      //mainMenuLi

      * {
        color: #2b2b2b;
      }
      > a {
        position: relative;
        display: block;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.25rem;
        font-weight: bold;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          width: 100%;
          height: 4px;
          background-color: #fff;
          transform-origin: left center;
          transform: scaleX(0);
          transition: 0.6s;
        }
        &.active {
          &::after {
            transform: scaleX(1);
          }
        }
      }

      ul.subMenuList {
        height: 0;
        opacity: 0;
        transition: 0.4s;
        overflow: hidden;
        li {
          position: relative;
          width: 100%;
          height: 3rem;
          padding-left: 0.5rem;
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            font-size: 1.25rem;
          }
          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto 0;
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 100%;
            background-color: #fff;
          }
        }
      }
      > a.active + ul.subMenuList {
        height: fit-content;
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
    z-index: 100;
    transform-style: preserve-3d;
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
    svg,
    path {
      width: 8rem;
      height: 100%;
    }
  }

  div.backDrop {
    display: none;
  }

  @media screen and (max-width: 767px) {
    div.backDrop {
      position: fixed;
      z-index: 10;
      width: 100vw;
      top: 4.4rem;
      left: 0;
      height: calc(100vh - 4.4rem);
      background-color: rgba(0, 0, 0, 0.7);
      transition: 0.4s;
    }
    &.mobileActive {
      div.backDrop {
        display: block;
      }
      ul.mainMenuList {
        transition: transform 0.3s;
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`;

export default Header;
