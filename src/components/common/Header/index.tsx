import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ToonsLogo } from '@images/common/logo_basic.svg';

function Header() {
  return (
    <StyledHeader>
      <Link to="/" className="logo">
        <ToonsLogo />
      </Link>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  height: 4.4rem;
  background-color: ${(props) => props.theme.colors.primary.main};
  a.logo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 130px;
    height: 4.4rem;
    * {
      width: 130px;
      height: auto;
    }
  }
`;

export default Header;
