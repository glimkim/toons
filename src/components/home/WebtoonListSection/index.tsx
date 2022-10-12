import WebtoonList from '@components/common/WebtoonList';
import useWebtoonList from '@hooks/api/useWebtoonList';
import useScroll from '@hooks/useScroll';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SectionBar, Loader } from 'toons-components';

function WebtoonListSection() {
  const navigate = useNavigate();
  const {
    naverWebtoonsQuery: { data: naverData, isLoading: isNaverLoading },
    kakaoWebtoonsQuery: { data: kakaoData, isLoading: isKakaoLoading },
  } = useWebtoonList();
  const {
    scroll: { scrollY },
    setObserveScroll,
  } = useScroll();
  const [isActivated, setIsActivated] = useState(false);

  const moveToPlatformPage = (platform: 'naver' | 'kakao') => {
    navigate(`/webtoons/${platform}`);
  };

  useEffect(() => {
    if (scrollY > window.innerHeight - 100 && !isActivated) {
      setIsActivated(true);
      setObserveScroll(false);
    }
  }, [scrollY]);

  return isNaverLoading && isKakaoLoading ? (
    <LoaderContainer>
      <Loader isPartial={true} theme={'main'} />
    </LoaderContainer>
  ) : (
    <WebtoonListContainer>
      <SectionBar
        platform="NAVER"
        isActive={isActivated}
        onClickMore={() => moveToPlatformPage('naver')}
      />
      <WebtoonListWrapper className={isActivated ? 'active' : ''}>
        {naverData && (
          <WebtoonList listId="naver-list" data={naverData.content} />
        )}
      </WebtoonListWrapper>
      <SectionBar
        platform="KAKAO"
        isActive={isActivated}
        onClickMore={() => moveToPlatformPage('kakao')}
      />
      <WebtoonListWrapper className={isActivated ? 'active' : ''}>
        {kakaoData && (
          <WebtoonList listId="kakao-list" data={kakaoData.content} />
        )}
      </WebtoonListWrapper>
    </WebtoonListContainer>
  );
}

const LoaderContainer = styled.div`
  height: 5vh;
  padding-top: 10rem;
  margin-bottom: 15rem;
`;

const WebtoonListContainer = styled.div`
  padding-top: 10rem;
  margin-bottom: 15rem;
`;

const WebtoonListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 8rem;
  transform: translateY(60px);
  transition-timing-function: ease-in-out;
  opacity: 0;
  transition: 0.8s;
  transition-delay: 0.2s;
  &.active {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default WebtoonListSection;
