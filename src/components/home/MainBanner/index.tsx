import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import _ from 'lodash';
import MainBg from '@images/main-bg.svg';
import MouseScrollBox from './MouseScrollBox';

const mainBnString = [
  'KEEP'.split(''),
  'YOUR FAVORITES'.split(''),
  'ON'.split(''),
  'TRACK'.split(''),
];

function MainBanner() {
  const theme = useTheme();
  console.log(theme);
  const [letterCount, setLetterCount] = useState({
    index: 0,
    count: 1,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const isScrolled = useMemo(() => {
    return scrollTop > window.innerHeight / 2;
  }, [scrollTop]);
  const mainBn = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const wHeight = window.innerHeight;

    const onScroll = _.throttle(
      () => {
        setScrollTop((prev) => {
          const wScrollY = window.scrollY;
          if (prev < wScrollY) {
            // scrolling down
            if (wScrollY < wHeight) {
              window.scroll({
                top: wHeight,
                behavior: 'smooth',
              });
            }
          } else if (prev > wScrollY) {
            // scroll up
            if (wScrollY < wHeight) {
              window.scroll({
                top: 0,
                behavior: 'smooth',
              });
            }
          }
          return wScrollY;
        });
      },
      400,
      {
        leading: true,
      },
    );

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      setLetterCount((prev) => ({
        index:
          prev.count === mainBnString[prev.index].length
            ? prev.index + 1
            : prev.index,
        count:
          prev.count === mainBnString[prev.index].length ? 1 : prev.count + 1,
      }));
    }, 120);

    if (letterCount.index === 3 && letterCount.count === 5) {
      clearInterval(typeInterval);
      mainBn?.current?.classList.add('active');
    }

    return () => {
      clearInterval(typeInterval);
    };
  }, [letterCount]);

  return (
    <MainBnWrapper isScrolled={isScrolled} ref={mainBn}>
      <div className="wrapper">
        {mainBnString.map((str, index) => {
          return (
            <h3 key={index}>
              {index < letterCount.index
                ? str
                : index === letterCount.index
                ? str.map(
                    (letter, index) => index <= letterCount.count - 1 && letter,
                  )
                : ''}
              {index === letterCount.index && <span className="cursor" />}
            </h3>
          );
        })}
      </div>
      <MouseScrollBox />
    </MainBnWrapper>
  );
}

const MainBnWrapper = styled.div<{ isScrolled: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.primary.main};
  background-size: calc(100% - 2rem);
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  animation-name: bgAni;
  animation-duration: 3.6s;
  animation-timing-function: cubic-bezier(0.45, -0.01, 0, 0.99);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.8s;

  div.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    transition: 0.6s;
    overflow: hidden;

    h3 {
      font-family: 'Black Han Sans', sans-serif;
      transition: 0.3s;

      span.cursor {
        display: inline-block;
        width: 2px;
        margin-left: 1rem;
        background-color: #333;
        animation-name: cursor;
        animation-duration: 0.3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }
    }
    h3:nth-child(3),
    h3:nth-child(4) {
      align-self: flex-end;
    }
  }

  @keyframes cursor {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes bgAni {
    from {
      background-image: url(${MainBg});
      background-position: center 500px;
    }
    to {
      background-image: url(${MainBg});
      background-position: center center;
    }
  }

  @media screen and (min-width: 541px) {
    h3 {
      font-size: 7rem;

      span.cursor {
        height: 5.5rem;
      }
    }
  }
  @media screen and (max-width: 540px) {
    h3 {
      font-size: 5rem;
      span.cursor {
        height: 3.5rem;
      }
    }
  }
  @media screen and (max-width: 414px) {
    h3 {
      font-size: 3rem;
      span.cursor {
        height: 1.5rem;
      }
    }
  }
`;

export default MainBanner;
