import { getWebtoonsAPI } from '@apis/webtoons';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Button, ToonsListItem } from 'toons-components';

function WebtoonList() {
  const { data } = useQuery('webtoon-list', () => getWebtoonsAPI('NAVER'), {
    select: (res) => res.content,
  });

  return (
    <WebtoonListContainer>
      <NaverWebtoonList>
        {data?.map((content) => (
          <ToonsListItem
            key={content.id}
            name={content.name}
            thumbnail={content.thumbnail}
            link={content.link}
            day={content.dayOfWeek}
            onToggleItem={console.log}
          />
        ))}
      </NaverWebtoonList>
    </WebtoonListContainer>
  );
}

const WebtoonListContainer = styled.div`
  padding-top: 5rem;
`;

const NaverWebtoonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
`;

export default WebtoonList;
