import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

function MenuButton() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMenuButton = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <MenuBtn className={isActive ? 'active' : ''} onClick={handleMenuButton}>
      <span className="circle" />
      <span className="circle" />
      <span className="circle" />
    </MenuBtn>
  );
}

const MenuBtn = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  span.circle {
    position: relative;
    z-index: 10;
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #fff;
    transition: 0.3s;
    opacity: 1;
    &:nth-child(2) {
      transition: 0.6s;
    }
  }

  &.active {
    align-items: space-between;
    gap: none;
    span.circle {
      position: absolute;
      &:nth-child(odd) {
        width: 40px;
        height: 4px;
        border-radius: 0.5rem;
      }
      &:first-of-type {
        top: 8px;
        left: 10px;
        transform-origin: left;
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        bottom: 8px;
        left: 10px;
        transform-origin: left;
        transform: rotate(-45deg);
      }
      &:nth-child(2) {
        width: 3rem;
        height: 3rem;
        z-index: 1;
        opacity: 0;
        /* animation-name: middleCircle;
        animation-duration: 0.6s;
        animation-fill-mode: forwards; */
      }
    }
  }

  @keyframes middleCircle {
    from {
      opacity: 1;
      width: 3rem;
      height: 3rem;
    }
    to {
      z-index: 1;
      opacity: 0;
    }
  }
`;

export default MenuButton;
