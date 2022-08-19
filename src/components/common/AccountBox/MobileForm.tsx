import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Button, Input } from 'toons-components';
import PhoneInput from 'react-phone-number-input/input';
import { useMutation } from 'react-query';
import { checkMobileVerification, sendMobileVerification } from '@apis/auth';
import {
  MobileVerificationCheckDTO,
  MobileVerificationRequestDTO,
} from '@apis/DTO/auth';
import { Controller, useFormContext } from 'react-hook-form';
import { debounceChange, FormValues } from './AccountForm';
import _default from 'react-redux/es/components/connect';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { setAlert } from '@store/modules/alert';
import { AxiosError } from 'axios';

interface MobileFormProps {
  onMobileVerified: () => void;
}

function MobileForm({ onMobileVerified }: MobileFormProps) {
  const dispatch = useDispatch();
  const [sentCode, setSentCode] = useState(false);
  const { getValues, control, formState } = useFormContext<FormValues>();
  const { errors } = formState;
  const { mutateAsync: sendCodeAsync } = useMutation(
    'send-verification',
    (mobileInfo: MobileVerificationRequestDTO) =>
      sendMobileVerification(mobileInfo),
  );
  const { mutateAsync: checkCodeAsync } = useMutation(
    'check-verfication',
    (verificationInfo: MobileVerificationCheckDTO) =>
      checkMobileVerification(verificationInfo),
  );

  const sendVerificationCode = useCallback(() => {
    sendCodeAsync({
      phoneNumber: getValues('phoneNumber'),
    })
      .then(() => {
        setSentCode(true);
      })
      .catch(
        (err: AxiosError) =>
          err.response?.status === 500 &&
          dispatch(
            setAlert({
              alertType: 'ERROR',
              alertTitle: 'Request Failed',
              alertContents:
                'An error has occurred while requesting. Please try again.',
            }),
          ),
      );
    // setSentCode(true);
  }, [sendCodeAsync, setSentCode, getValues()]);

  const onClickVerifyMobile = useCallback(() => {
    getValues('code') &&
      checkCodeAsync({
        phoneNumber: getValues('phoneNumber'),
        code: getValues('code'),
      })
        .then(() => {
          dispatch(
            setAlert({
              alertType: 'SUCCESS',
              alertTitle: 'Great!',
              alertContents: 'Your mobile number has verified.',
            }),
          );
          onMobileVerified();
        })
        .catch((err: AxiosError) => {
          err.response?.status === 400 &&
            dispatch(
              setAlert({
                alertType: 'ERROR',
                alertTitle: 'Sorry',
                alertContents: 'This code is expired or does not exist.',
              }),
            );
        });
  }, [getValues(), formState, onMobileVerified]);

  return (
    <MobileFormContainer>
      <MobileInputWrapper hasError={false}>
        <label>Mobile</label>
        <div>
          <div className="phoneInput">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange } }) => (
                <PhoneInput
                  placeholder="Enter your mobile number"
                  autoComplete="tel"
                  onChange={(e) => {
                    _.debounce(() => {
                      onChange(e);
                    }, 400)();
                  }}
                  required
                />
              )}
            />
            <Button onClick={sendVerificationCode} size="small">
              Send Code
            </Button>
          </div>
          {errors.phoneNumber?.message && (
            <p className="phoneErrorTxt">{errors.phoneNumber?.message}</p>
          )}
        </div>
      </MobileInputWrapper>
      <CSSTransition
        in={sentCode}
        timeout={300}
        classNames="verificationCode"
        unmountOnExit
      >
        <Controller
          name="code"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              id="contact-verification"
              onChange={(e) => debounceChange(e, onChange)}
              placeholder="Verification Code"
              autoComplete="one-time-code"
              withBtn={{
                btnText: 'Verify',
                onClickBtn: onClickVerifyMobile,
              }}
              required
              errorText={errors.code?.message}
            />
          )}
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
    margin-bottom: 0.7rem;
    div.phoneInput {
      display: flex;
      gap: 0.7rem;
      width: 100%;
      height: 2.67rem;
      line-height: 2.67rem;
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
    button {
      white-space: nowrap;
    }
    p.phoneErrorTxt {
      display: block;
      padding-top: 0.2rem;
      color: ${({ theme: { colors } }) => colors.red};
      font-size: 0.875rem;
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
