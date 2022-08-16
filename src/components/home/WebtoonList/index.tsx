import useAlarmMutation from '@hooks/api/useAlarmMutation';
import useWebtoonList, { WebtoonItem } from '@hooks/api/useWebtoonList';
import useScroll from '@hooks/useScroll';
import { addToList, deleteFromList } from '@store/modules/alarms';
import { setAlert } from '@store/modules/alert';
import { StoreState } from '@store/root';
import React, { HTMLAttributes, useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SectionBar, ListItem, List } from 'toons-components';

function WebtoonList() {
  const dispatch = useDispatch();
  const {
    user: { token },
    alarms,
  } = useSelector((state: StoreState) => state);
  const navigate = useNavigate();
  const {
    naverWebtoonsQuery: { data },
  } = useWebtoonList();
  const naverToons = useMemo<WebtoonItem[]>(() => {
    return !!data
      ? data.content.map((item) =>
          alarms.some(({ webtoonDTO: _item }) => _item.name === item.name)
            ? {
                ...item,
                toNotify: true,
              }
            : {
                ...item,
                toNotify: false,
              },
        )
      : [];
  }, [data, alarms]);
  const { addAlarmItemAsync, deleteAlarmItemAsync } = useAlarmMutation();
  const {
    scroll: { scrollY },
    setObserveScroll,
  } = useScroll();
  const [isActivated, setIsActivated] = useState(false);

  const moveToPlatformPage = (platform: 'naver' | 'kakao') => {
    navigate(`/webtoons/${platform}`);
  };

  const onToggleItem = useCallback(
    (item: WebtoonItem, isActive: boolean, handleToggleView: () => void) => {
      if (token) {
        if (isActive) {
          deleteAlarmItemAsync(item.id).then(() => {
            handleToggleView();
            dispatch(deleteFromList(item.id));
          });
        } else {
          addAlarmItemAsync({
            webtoonId: item.id,
          }).then(() => {
            handleToggleView();
            dispatch(addToList({ ...item, deletedAt: '' }));
          });
        }
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
