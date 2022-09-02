import React, { HTMLAttributes, useCallback, useState } from 'react';
import styled from 'styled-components';

interface MenuBtnProps extends HTMLAttributes<HTMLButtonElement> {
  isMenuActive: boolean;
}

function MenuButton({ isMenuActive, ...props }: MenuBtnProps) {
  return (
    <MenuBtn className={isMenuActive ? 'active' : ''} {...props}>
      <span className="circle" />
      <span className="circle" />
      <span className="circle" />
    </MenuBtn>
  );
}

const MenuBtn = styled.button`
  position: relative;
  right: -1rem;
  display: none;
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
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
  }
`;

export default MenuButton;
