import React, { HTMLAttributes } from 'react';
import { Button, Loader } from 'toons-components';

interface SubmitBtnProps extends HTMLAttributes<HTMLButtonElement> {
  submitType: 'signIn' | 'signUp';
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isLoading: boolean;
}

const SubmitBtn = ({ submitType, handleSubmit, isLoading }: SubmitBtnProps) => {
  return (
    <Button fullWidth onClick={() => handleSubmit()}>
      {/* TODO disabled on loading */}
      {isLoading ? (
        <Loader isPartial />
      ) : submitType === 'signIn' ? (
        'Sing In'
      ) : (
        'Sing Up'
      )}
    </Button>
  );
};

export default SubmitBtn;
