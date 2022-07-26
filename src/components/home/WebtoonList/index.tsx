import useAlarms from '@hooks/api/useAlarms';
import useWebtoonList from '@hooks/api/useWebtoonList';
import useScroll from '@hooks/useScroll';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SectionBar, ToonsListItem } from 'toons-components';

function WebtoonList() {
  const navigate = useNavigate();
  const {
    naverWebtoonsQuery: { data },
  } = useWebtoonList();
  const { addAlarmItemAsync, deleteAlarmItemAsync } = useAlarms();
  const { scrollY } = useScroll();
  const [isActivated, setIsActivated] = useState(false);
  const naverToons = useMemo(() => {
    return data;
  }, [data]);

  const moveToPlatformPage = (platform: 'naver' | 'kakao') => {
    navigate(`/webtoons/${platform}`);
  };

  const onToggleItem = useCallback(
    (webtoonId: number, isActive: boolean, handleToggleView: () => void) => {
      isActive
        ? deleteAlarmItemAsync(webtoonId).then(() => handleToggleView())
        : addAlarmItemAsync({
            webtoonId,
          }).then(() => handleToggleView());
    },
    [deleteAlarmItemAsync, addAlarmItemAsync],
  );

  useEffect(() => {
    if (scrollY > window.innerHeight - 100 && !isActivated) {
      setIsActivated(true);
    }
  }, [scrollY]);

  return (
    <WebtoonListContainer>
      <SectionBar
        platform="NAVER"
        isActive={isActivated}
        onClickMore={() => moveToPlatformPage('naver')}
      />
      <NaverWebtoonList className={isActivated ? 'active' : ''}>
        {naverToons?.map((_toon, index) => (
          <ToonsListItem
            key={index}
            isActive={_toon.toNotify}
            name={_toon.name}
            thumbnail={_toon.thumbnail}
            link={_toon.link}
            day={_toon.dayOfWeek}
            onToggleItem={(isActive, handleToggleView) =>
              onToggleItem(_toon.id, isActive, handleToggleView)
            }
          />
        ))}
      </NaverWebtoonList>
    </WebtoonListContainer>
  );
}

const WebtoonListContainer = styled.div`
  padding-top: 6rem;
  margin-bottom: 15rem;
`;

const NaverWebtoonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.7rem;
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
