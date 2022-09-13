import { DayOfWeek, Platform } from '@apis/DTO/webtoons';
import useAlarmMutation from '@hooks/api/useAlarmMutation';
import useWebtoonsByDay from '@hooks/api/useWebtoonByDay';
import useListState from '@hooks/useListState';
import { paddingUnderHeader } from '@styles/css';
import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { List, ListItem, Loader, TabBar } from 'toons-components';

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
  const toons = useListState(data?.content || []);
  const { onToggleItem } = useAlarmMutation();
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
          toons && !isLoading ? (
            <List id={`${platform}_${_day}`}>
              {toons.map(
                (_item, index) =>
                  (
                    <ListItem
                      key={index}
                      itemInfo={{
                        ..._item,
                        thumbnail:
                          _item.thumbnail +
                          (platform === 'NAVER' ? '' : '.webp'),
                      }}
                      onToggleItem={(isActive, handleToggleView) =>
                        onToggleItem(_item, isActive, handleToggleView)
                      }
                    />
                  ) as HTMLAttributes<HTMLLIElement>,
              )}
            </List>
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
