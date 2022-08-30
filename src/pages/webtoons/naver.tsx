import { DayOfWeek } from '@apis/DTO/webtoons';
import DetailPageTemplate from '@components/common/DetailPageTemplate';
import useAlarmMutation from '@hooks/api/useAlarmMutation';
import useWebtoonsByDay from '@hooks/api/useWebtoonByDay';
import useListState from '@hooks/useListState';
import PageLayout from '@layout/pageLayout';
import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { List, ListItem, Loader, TabBar } from 'toons-components';

function NaverDetailPage() {
  const {
    webtoonsByDayQuery: { data },
    setDayOfWeek,
    dayOfWeek,
  } = useWebtoonsByDay('NAVER');
  const naverToons = useListState(data?.content || []);
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
        title: _day,
        contents: naverToons ? (
          <List id={`naver_${_day}`}>
            {naverToons.map(
              (_item, index) =>
                (
                  <ListItem
                    key={index}
                    itemInfo={{
                      ..._item,
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
            <Loader isPartial={true} theme="white" />
          </div>
        ),
        onClickTab: () => onClickTab(_day),
      }));
    });
  }, [data]);

  return (
    <PageLayout pageTitle="Naver toons">
      <DetailPageTemplate platform="NAVER">
        <TabBar
          theme="MAIN"
          headTitle={`NAVER > WEBTOONS > ${dayOfWeek}`}
          tabs={tabContents}
        />
      </DetailPageTemplate>
    </PageLayout>
  );
}

export default NaverDetailPage;
