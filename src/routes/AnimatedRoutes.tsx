import { alarmListQuqeryKey } from '@hooks/api/useAlarms';
import Home from '@pages/home';
import MyPage from '@pages/myPage';
import KakaoDetailPage from '@pages/webtoons/kakao';
import NaverDetailPage from '@pages/webtoons/naver';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styled from 'styled-components';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <RoutesContainer pathname={location.pathname}>
      <TransitionGroup className={'transition-group'}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={600}
          unmountOnExit
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/webtoons/naver" element={<NaverDetailPage />} />
            <Route path="/webtoons/kakao" element={<KakaoDetailPage />} />
            <Route path="/my-page" element={<MyPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </RoutesContainer>
  );
}

const RoutesContainer = styled.div<{ pathname: string }>`
  position: relative;
  .transition-group {
    div[class*='fade'] {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      // transition: all 0.3s ease-in-out;
      transition: transform 0.6s ease-in-out, opacity 0.3s ease-in-out;
    }
    .fade-enter {
      opacity: 0;
      z-index: 10;
      transform: translateX(100%);
    }
    .fade-enter-active,
    .fade-enter-done {
      opacity: 1;
      transform: translateX(0%);
    }
    .fade-exit {
      z-index: 5;
      opacity: 1;
      transform: translateX(0%);
    }

    .fade-exit-active {
      transform: translateX(-100%);
      transition: transform 0.8s ease-in-out, opacity 0.3s ease-in-out;
      opacity: ${({ pathname }) => (pathname === '/' ? 1 : 0)};
    }
  }
`;

export default AnimatedRoutes;
