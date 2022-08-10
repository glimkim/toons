import useAlarms from '@hooks/api/useAlarms';
import useWebtoonList from '@hooks/api/useWebtoonList';
import useScroll from '@hooks/useScroll';
import { setAlert } from '@store/modules/alert';
import { StoreState } from '@store/root';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SectionBar, ToonsListItem } from 'toons-components';

function WebtoonList() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: StoreState) => state.user);
  const navigate = useNavigate();
  const {
    naverWebtoonsQuery: { data: naverToons },
  } = useWebtoonList();
  const { addAlarmItemAsync, deleteAlarmItemAsync } = useAlarms();
  const {
    scroll: { scrollY },
    setObserveScroll,
  } = useScroll();
  const [isActivated, setIsActivated] = useState(false);

  const moveToPlatformPage = (platform: 'naver' | 'kakao') => {
    navigate(`/webtoons/${platform}`);
  };

  const onToggleItem = useCallback(
    (webtoonId: number, isActive: boolean, handleToggleView: () => void) => {
      if (token) {
        isActive
          ? deleteAlarmItemAsync(webtoonId).then(() => handleToggleView())
          : addAlarmItemAsync({
              webtoonId,
            }).then(() => handleToggleView());
      } else {
        dispatch(
          setAlert({
            alertType: 'WARNING',
            alertTitle: 'You need to Sign In',
            alertContents: '해당 기능은 로그인 후 사용하실 수 있습니다.',
          }),
        );
      }
    },
    [deleteAlarmItemAsync, addAlarmItemAsync, token],
  );

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
      <NaverWebtoonList className={isActivated ? 'active' : ''}>
        {naverToons?.map((_toon, index) => (
          <ToonsListItem
            key={index}
            isActive={_toon.toNotify}
            itemInfo={{
              name: _toon.name,
              thumbnail: _toon.thumbnail,
              day: _toon.dayOfWeek,
              link: _toon.link,
            }}
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
