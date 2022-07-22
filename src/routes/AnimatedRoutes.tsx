import Home from '@pages/home';
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
    <RoutesContainer>
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
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </RoutesContainer>
  );
}

const RoutesContainer = styled.div`
  position: relative;
  .transition-group {
    div[class*='fade'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: all 0.3s ease-in-out;
    }
    .fade-enter {
      opacity: 0;
      z-index: 10;
      transform: translateX(50%);
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

    .fade-exit-active,
    .fade-exit-done {
      transform: translateX(-50%);
      transition: all 0.6s ease-in-out;
    }
  }
`;

export default AnimatedRoutes;
