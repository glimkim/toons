import PageLayout from '@layout/pageLayout';
import { StoreState } from '@store/root';
import { paddingUnderHeader } from '@styles/css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon, TabBar } from 'toons-components';

function MyPage() {
  const user = useSelector((state: StoreState) => state.user);

  const tabs = [
    {
      title: 'ALL',
      contents: <div>contents here</div>,
    },
    {
      title: 'NAVER',
      contents: <div>contents here</div>,
    },
    {
      title: 'KAKAO',
      contents: <div>contents here</div>,
    },
  ];
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
          <TabBar headTitle="Your Notification" tabs={tabs} />
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
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  background-color: ${({ theme: { colors } }) => colors.main};
`;

export default MyPage;
