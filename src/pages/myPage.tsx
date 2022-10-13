import useAlarmMutation from '@hooks/api/useAlarmMutation';
import useSearchParameters from '@hooks/useSearchParameters';
import PageLayout from '@layout/pageLayout';
import { StoreState } from '@store/root';
import { paddingUnderHeader } from '@styles/css';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, TabBar } from 'toons-components';
import { List, ListItem } from 'toons-components';

function MyPage() {
  const { user, alarms } = useSelector((state: StoreState) => state);
  const { onToggleItem } = useAlarmMutation();
  const navigate = useNavigate();
  const { appendSearchParams } = useSearchParameters();

  const notiTabs = useMemo(() => {
    const tabs = ['ALL', 'NAVER', 'KAKAO'];

    return tabs.map((_tab) => {
      const yourAlarms =
        _tab === 'ALL'
          ? alarms
          : alarms.filter((_alarm) => _alarm.platform === _tab);
      return {
        title: _tab,
        contents: (
          <List id="my-page-list">
            {yourAlarms.map((_alarm) => (
              <ListItem
                key={_alarm.alarmId}
                itemInfo={{ ..._alarm, toNotify: true }}
                onToggleItem={(isActive, handleToggleView) =>
                  onToggleItem(
                    {
                      ..._alarm,
                      toNotify: isActive,
                    },
                    isActive,
                    handleToggleView,
                  )
                }
              />
            ))}
          </List>
        ),
      };
    });
  }, [alarms, onToggleItem]);

  const onClickEditBtn = useCallback(() => {
    appendSearchParams({ userInfo: 'edit' });
  }, [appendSearchParams]);

  useEffect(() => {
    let count = 0;
    const moveToHomeInterval = setInterval(() => {
      if (count < 3) {
        !user.token && count++;
      } else {
        !user.token && navigate('/');
      }
    }, 400);

    user.token && clearTimeout(moveToHomeInterval);

    return () => {
      clearTimeout(moveToHomeInterval);
    };
  }, [user.token]);

  return (
    <PageLayout pageTitle="My Page">
      <MyPageContainer>
        <div className="wrapper">
          <ProfileContainer>
            <h6>
              Hello,
              <br />
              {user.username}!{' '}
              <button type="button" onClick={onClickEditBtn}>
                <Icon icon="Edit" />
              </button>
            </h6>
            <ul className="userInfo">
              <li>{user.email}</li>
              <li>|</li>
              <li>{user.phoneNumber}</li>
            </ul>
          </ProfileContainer>
          <TabBar headTitle="Your Notifications" tabs={notiTabs} />
        </div>
      </MyPageContainer>
    </PageLayout>
  );
}

const ProfileContainer = styled.div`
  margin-bottom: 3rem;
  h6 {
    font-size: 3rem;
    font-family: 'Black Han Sans';
  }
  ul.userInfo {
    display: flex;
    gap: 0.36rem;
    li {
      font-size: 1.125rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.gray40};
    }
  }
`;

const MyPageContainer = styled.div`
  ${paddingUnderHeader};
  div.wrapper {
    padding-top: 4rem;
    padding-bottom: 10rem;
  }
  background-color: ${({ theme: { colors } }) => colors.main};
`;

export default MyPage;
