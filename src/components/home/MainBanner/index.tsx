import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';
import MainBg from '@images/main-bg.svg';
import MouseScrollBox from './MouseScrollBox';
import useScroll from '@hooks/useScroll';
import useScreenSize from '@hooks/useScreenSize';

function MainBanner() {
  const {
    scroll: { scrollY, scrollDirection },
  } = useScroll();
  const { screenSize } = useScreenSize();
  const mainBn = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (
      screenSize?.innerHeight &&
      50 < scrollY &&
      scrollY < screenSize?.innerHeight &&
      scrollDirection === 'DOWN'
    ) {
      window.scroll({
        top: innerHeight,
        behavior: 'smooth',
      });
    }
  }, [scrollY, screenSize?.innerHeight]);

  // useEffect(() => {
  //   const typeInterval = setInterval(() => {
  //     setLetterCount((prev) => ({
  //       index:
  //         prev.count === mainBnString[prev.index].length
  //           ? prev.index + 1
  //           : prev.index,
  //       count:
  //         prev.count === mainBnString[prev.index].length ? 1 : prev.count + 1,
  //     }));
  //   }, 120);

  //   if (letterCount.index === 3 && letterCount.count === 5) {
  //     clearInterval(typeInterval);
  //     mainBn?.current?.classList.add('active');
  //   }

  //   return () => {
  //     clearInterval(typeInterval);
  //   };
  // }, [letterCount]);

  return (
    <MainBnWrapper height={screenSize?.innerHeight} ref={mainBn}>
      <div className="wrapper">
        <AnimatedLetters>KEEP</AnimatedLetters>
        <AnimatedLetters>YOUR FAVOURITES</AnimatedLetters>
        <AnimatedLetters>ON</AnimatedLetters>
        <AnimatedLetters>TRACK</AnimatedLetters>
        <BackgroundImg>
          <img src={MainBg} />
        </BackgroundImg>
      </div>
      <MouseScrollBox />
    </MainBnWrapper>
  );
}

const BackgroundImg = styled.figure`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  img {
    display: block;
    width: calc(100% - 1rem);
    height: auto;
    transform: scale(0, 0) translateY(-50px);
    opacity: 0;
    animation-name: bgAni;
    animation-duration: 2s;
    animation-timing-function: cubic-bezier(0.45, -0.01, 0, 0.99);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 1s;
  }

  @keyframes bgAni {
    from {
      opacity: 0;
      transform: scale(0.8, 0.8) translateY(-50px);
    }
    to {
      opacity: 1;
      transform: scale(1, 1) translateY(0);
    }
  }
`;

const AnimatedLetters = styled.h3`
  position: relative;
  z-index: 100;
  width: fit-content;
  font-family: 'Black Han Sans', sans-serif;
  transition: 0.3s;
  overflow: hidden;
  opacity: 0;
  animation-name: appearFromBottom;
  animation-duration: 0.6s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  ${() => {
    let styles = '';
    for (let i = 1; i < 5; i++) {
      styles += `&:nth-child(${i}) {
          animation-delay: ${0.2 * i + 0.3}s;
        }`;
    }
    return css`
      ${styles}
    `;
  }}
  &:nth-child(3),
  &:nth-child(4) {
    align-self: flex-end;
  }

  @keyframes appearFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translate(0);
    }
  }

  @media screen and (min-width: 1680px) {
    font-size: 8rem;
  }
  @media screen and (max-width: 1679px) and (min-width: 581px) {
    font-size: 7rem;

    span.cursor {
      height: 5.5rem;
    }
  }
  @media screen and (max-width: 580px) {
    font-size: 5rem;
    span.cursor {
      height: 3.5rem;
    }
  }
  @media screen and (max-width: 414px) {
    font-size: 3rem;
    span.cursor {
      height: 1.5rem;
    }
  }
`;

const MainBnWrapper = styled.div<{ height: number | undefined }>`
  position: relative;
  z-index: 600;
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${({ height }) => {
    console.log(height, 'sss');
    return height + 'px' || '100vh';
  }};
  background-color: ${(props) => props.theme.colors.main};
  /* background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-image: url(${MainBg});
  animation-name: bgAni;
  animation-duration: 2s;
  animation-timing-function: cubic-bezier(0.45, -0.01, 0, 0.99);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 1.2s; */
  overflow: hidden;

  div.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    transition: 0.6s;
    overflow: hidden;
  }
`;

export default MainBanner;
