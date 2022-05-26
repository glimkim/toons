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
  bottom: 1rem;
  left: 50%;
  transform: translateY(100px) translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 0.875rem;
    font-weight: 700;
  }
  animation-name: appearFromBottom;
  animation-duration: 1s;
  animation-delay: 3.8s;
  animation-fill-mode: forwards;
  @keyframes appearFromBottom {
    from {
      transform: translateY(100px) translateX(-50%);
    }
    to {
      transform: translateY(0) translateX(-50%);
    }
  }
`;

export default MouseScrollBox;
