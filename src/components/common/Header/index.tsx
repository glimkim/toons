import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ToonsLogo } from '@images/common/logo_basic.svg';

const headerHeight = '4.4rem';

function Header() {
  return (
    <StyledHeader>
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
              <Link to="webtoons/daum">Naver</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </MainMenuList>
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
      background-color: #ededed;
      li {
        width: 100%;
        padding: 0.7rem;
        a {
          display: block;
          font-weight: normal;
          font-size: 1rem;
          transition: 0.3s;
          transform-origin: left center;
          &:hover {
            transform: scale(1.1, 1.1);
            font-weight: bold;
          }
        }
      }
    }
    &:hover {
      > a {
        background-color: #ededed;
      }
      ul.subMenuList {
        top: 3.4rem;
        opacity: 1;
      }
    }
  }
`;

const StyledHeader = styled.header`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4.4rem;
  background-color: ${(props) => props.theme.colors.main};
  a.logo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 130px;
    height: ${headerHeight};
    * {
      width: 130px;
      height: auto;
    }
  }
`;

export default Header;
