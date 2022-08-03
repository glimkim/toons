import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Button, Input } from 'toons-components';
import PhoneInput from 'react-phone-number-input/input';

interface MobileFormProps {
  onMobileVerified: () => void;
}

function MobileForm({ onMobileVerified }: MobileFormProps) {
  const [sentCode, setSentCode] = useState(false);
  const onClickVerifyMobile = useCallback(() => {
    setSentCode(true);
  }, []);

  return (
    <MobileFormContainer>
      <MobileInputWrapper hasError={false}>
        <label>Mobile</label>
        <div>
          <PhoneInput
            onChange={console.log}
            placeholder="Enter your mobile number"
          />
          <Button onClick={onClickVerifyMobile} size="small">
            Verify
          </Button>
        </div>
      </MobileInputWrapper>
      <CSSTransition
        in={sentCode}
        timeout={300}
        classNames="verificationCode"
        unmountOnExit
      >
        <Input
          id="contact-verification"
          onChange={console.log}
          placeholder="Verification Code"
        />
      </CSSTransition>
    </MobileFormContainer>
  );
}

const MobileInputWrapper = styled.div<{ hasError: boolean }>`
  label {
    display: block;
    margin-bottom: 0.36rem;
  }
  > div {
    display: flex;
    gap: 0.7rem;
    width: 100%;
    height: 2.67rem;
    line-height: 2.67rem;
    margin-bottom: 0.7rem;
    input {
      width: 100%;
      padding: 0 0.7rem;
      border: none;
      border-radius: 0.7rem;
      box-shadow: 1px 2px 5px #00000015;
      background-color: #fff;
      color: #333333;
      &:focus {
        box-shadow: 1px 2px 5px
          ${({ theme, hasError }) =>
            hasError ? theme.colors.red + '50' : theme.colors.main + 60};
      }
      &::placeholder {
        color: ${(props) => props.theme.colors.gray20};
        font-weight: bold;
      }
    }
  }
`;

const MobileFormContainer = styled.div`
  div[class*='verificationCode'] {
    transition: 0.3s;
    &.verificationCode-enter {
      opacity: 0;
      transform: translateY(20px);
    }
    &.verificationCode-enter-done {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default MobileForm;
