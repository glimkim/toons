import React, { HTMLAttributes } from 'react';
import { Button, Loader } from 'toons-components';

interface SubmitBtnProps extends HTMLAttributes<HTMLButtonElement> {
  submitType: 'signIn' | 'signUp';
  isLoading: boolean;
  disabled?: boolean;
}

const SubmitBtn = ({
  submitType,
  isLoading,
  disabled = false,
}: SubmitBtnProps) => {
  return (
    <Button fullWidth type="submit" disabled={disabled}>
      {/* TODO disabled on loading */}
      {isLoading ? (
        <Loader isPartial />
      ) : submitType === 'signIn' ? (
        'Sign In'
      ) : (
        'Sign Up'
      )}
    </Button>
  );
};

export default SubmitBtn;
