import React from 'react';
import styled from 'styled-components';

function MouseScrollBox() {
  return (
    <MouseWrapper>
      <Mouse>
        <span />
      </Mouse>
      <p>Scroll Down!</p>
    </MouseWrapper>
  );
}

const Mouse = styled.div`
  position: relative;
  width: 1.5rem;
  height: 2rem;
  border: 2px solid #333;
  border-radius: 0.6rem;
  background-color: #fff;
  overflow: hidden;

  > span {
    position: absolute;
    top: 0.36rem;
    right: 0;
    left: 0;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 auto;
    border: 2px solid #333;
    border-radius: 100%;
    animation-name: ball;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  @keyframes ball {
    from {
      top: -50%;
      opacity: 0;
    }
    to {
      top: 40%;
      opacity: 1;
    }
  }
`;

const MouseWrapper = styled.div`
  position: absolute;
  z-index: 50;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(100px);
  display: flex;
  width: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.875rem;
    font-weight: 700;
  }
  animation-name: appearFromBottom;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
  @keyframes appearFromBottom {
    from {
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default MouseScrollBox;
