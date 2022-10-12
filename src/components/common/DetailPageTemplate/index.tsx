import { DayOfWeek, Platform } from '@apis/DTO/webtoons';
import useWebtoonsByDay from '@hooks/api/useWebtoonByDay';
import { paddingUnderHeader } from '@styles/css';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loader, TabBar } from 'toons-components';
import WebtoonList from '../WebtoonList';

interface PageTemplateProps {
  platform: Platform;
  children?: React.ReactNode;
}

function DetailPageTemplate({ platform, children }: PageTemplateProps) {
  const {
    webtoonsByDayQuery: { data, isLoading },
    setDayOfWeek,
    dayOfWeek,
  } = useWebtoonsByDay(platform);
  const [tabContents, setTabContents] = useState<
    {
      title: string;
      contents: React.ReactNode;
      onClickTab?: () => void;
    }[]
  >([]);

  const onClickTab = useCallback(
    (day: DayOfWeek) => {
      setDayOfWeek(day);
    },
    [setDayOfWeek],
  );

  useEffect(() => {
    const days: DayOfWeek[] = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];
    setTabContents(() => {
      return days.map((_day) => ({
        title: _day.slice(0, 3),
        contents:
          data && !isLoading ? (
            <WebtoonList listId={`${platform}_${_day}`} data={data.content} />
          ) : (
            <div className="loader">
              <Loader isPartial={true} theme="mix" />
            </div>
          ),
        onClickTab: () => onClickTab(_day),
      }));
    });
  }, [data]);

  return (
    <PageTemplateContainer platform={platform}>
      <div className="wrapper">
        <div className="pageHead">
          <h3>{platform === 'NAVER' ? '네이버' : '카카오'}</h3>
        </div>
        <TabBar
          theme="MAIN"
          headTitle={`${platform} > WEBTOONS > ${dayOfWeek}`}
          tabs={tabContents}
        />
        {children}
      </div>
    </PageTemplateContainer>
  );
}

const PageTemplateContainer = styled.div<{ platform: Platform }>`
  ${paddingUnderHeader};
  padding-bottom: 12rem;

  div.pageHead {
    padding-top: 5rem;
    padding-bottom: 3rem;
    h3 {
      font-family: 'Black Han Sans';
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
  div.loader {
    padding: 3rem 0;
  }
`;

export default DetailPageTemplate;
