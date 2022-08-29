import { Platform } from '@apis/DTO/webtoons';
import useAlarmMutation from '@hooks/api/useAlarmMutation';
import useAlarms from '@hooks/api/useAlarms';
import PageLayout from '@layout/pageLayout';
import { StoreState } from '@store/root';
import { paddingUnderHeader } from '@styles/css';
import React, { HTMLAttributes, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon, TabBar } from 'toons-components';
import { List, ListItem } from 'toons-components';

function MyPage() {
  const { user, alarms } = useSelector((state: StoreState) => state);
  const { onToggleItem } = useAlarmMutation();

  const notiTabs = useMemo(() => {
    const tabs = ['ALL', 'NAVER', 'KAKAO'];
    const alarmList = alarms.map((_alarms) => _alarms.webtoonDTO);

    return tabs.map((_tab) => {
      const yourAlarms =
        _tab === 'ALL'
          ? alarmList
          : alarmList.filter((_alarm) => _alarm.platform === _tab);
      return {
        title: _tab,
        contents: (
          <List id="s">
            {yourAlarms.map(
              (_alarm, index) =>
                (
                  <ListItem
                    key={index}
                    itemInfo={{ ..._alarm, toNotify: true }}
                    onToggleItem={(isActive, handleToggleView) =>
                      onToggleItem(
                        { ..._alarm, toNotify: true },
                        isActive,
                        handleToggleView,
                      )
                    }
                  />
                ) as HTMLAttributes<HTMLLIElement>,
            )}
          </List>
        ),
      };
    });
  }, [alarms]);

  return (
    <PageLayout pageTitle="My Page">
      <MyPageContainer>
        <div className="wrapper">
          <ProfileContainer>
            <h6>
              Hello,
              <br />
              Lim!{' '}
              <button type="button">
                <Icon icon="Edit" />
              </button>
            </h6>
            <ul className="userInfo">
              <li>ltbllim@gmail.com</li>
              <li>|</li>
              <li>010-2309-9296</li>
            </ul>
          </ProfileContainer>
          <TabBar headTitle="Your Notifications" tabs={notiTabs} />
        </div>
      </MyPageContainer>
    </PageLayout>
  );
}

const NotiList = styled.ul`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

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
