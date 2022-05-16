import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

function MainBanner() {
  const [scrollTop, setScrollTop] = useState(0);
  const isScrolled = useMemo(() => {
    return scrollTop > window.innerHeight / 2;
  }, [scrollTop]);

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

  return <MainBnWrapper isScrolled={isScrolled}></MainBnWrapper>;
}

const MainBnWrapper = styled.div<{ isScrolled: boolean }>`
  width: 100vw;
  height: 100vh;
  transition: 0.4s;
  background-color: ${(props) => (props.isScrolled ? 'pink' : 'lavender')};
`;

export default MainBanner;
