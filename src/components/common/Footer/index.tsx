import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ToonsLogo } from '@images/common/logo_dark.svg';

function Footer() {
  return (
    <FooterContainer>
      <ToonsLogo />
      <div className="textBox">
        <p>Contact : 010-2309-9292 | 010-</p>
        <p>&copy; 2022 TOONS</p>
        <p>This website is created in the purpose of personal portfolio.</p>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4.2rem 0;
  background-color: ${({ theme: { colors } }) => colors.gray50};
  div.textBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    p {
      color: #fff;
      font-size: 0.75rem;
    }
  }
`;

export default Footer;
