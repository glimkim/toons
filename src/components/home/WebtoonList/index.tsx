import useAlarmMutation from '@hooks/api/useAlarmMutation';
import useWebtoonList from '@hooks/api/useWebtoonList';
import useListState from '@hooks/useListState';
import useScroll from '@hooks/useScroll';
import React, { HTMLAttributes, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SectionBar, ListItem, List } from 'toons-components';

function WebtoonList() {
  const navigate = useNavigate();
  const {
    naverWebtoonsQuery: { data: naverData },
    kakaoWebtoonsQuery: { data: kakaoData },
  } = useWebtoonList();
  const naverToons = useListState(naverData?.content || []);
  const kakaoToons = useListState(kakaoData?.content || []);
  const { onToggleItem } = useAlarmMutation();
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

  return (
    <WebtoonListContainer>
      <SectionBar
        platform="NAVER"
        isActive={isActivated}
        onClickMore={() => moveToPlatformPage('naver')}
      />
      <WebtoonListWrapper className={isActivated ? 'active' : ''}>
        <List id="naverList">
          {naverToons?.map(
            (_toon, index) =>
              (
                <ListItem
                  key={index}
                  itemInfo={{
                    ..._toon,
                  }}
                  onToggleItem={(isActive, handleToggleView) =>
                    onToggleItem(_toon, isActive, handleToggleView)
                  }
                />
              ) as HTMLAttributes<HTMLLIElement>,
          )}
        </List>
      </WebtoonListWrapper>
      <SectionBar
        platform="KAKAO"
        isActive={isActivated}
        onClickMore={() => moveToPlatformPage('kakao')}
      />
      <WebtoonListWrapper className={isActivated ? 'active' : ''}>
        <List id="kakaoList">
          {kakaoToons?.map(
            (_toon, index) =>
              (
                <ListItem
                  key={index}
                  itemInfo={{
                    ..._toon,
                    thumbnail: _toon.thumbnail + '.webp',
                  }}
                  onToggleItem={(isActive, handleToggleView) =>
                    onToggleItem(_toon, isActive, handleToggleView)
                  }
                />
              ) as HTMLAttributes<HTMLLIElement>,
          )}
        </List>
      </WebtoonListWrapper>
    </WebtoonListContainer>
  );
}

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

export default WebtoonList;
