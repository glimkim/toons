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
    naverWebtoonsQuery: { data },
  } = useWebtoonList();
  const naverToons = useListState(data?.content || []);
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
      <NaverWebtoonListWrapper className={isActivated ? 'active' : ''}>
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
      </NaverWebtoonListWrapper>
    </WebtoonListContainer>
  );
}

const WebtoonListContainer = styled.div`
  padding-top: 6rem;
  margin-bottom: 15rem;
`;

const NaverWebtoonListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
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
