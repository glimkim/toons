import { getWebtoonsAPI } from '@apis/webtoons';
import useScroll from '@hooks/useScroll';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Button, SectionBar, ToonsListItem } from 'toons-components';

function WebtoonList() {
  const { data } = useQuery('webtoon-list', () => getWebtoonsAPI('NAVER'), {
    select: (res) => res.content,
  });
  const { scrollY } = useScroll();

  return (
    <WebtoonListContainer>
      <SectionBar
        platform="NAVER"
        isActive={scrollY > window.innerHeight - 100}
        onClickMore={console.log}
      />
      <NaverWebtoonList
        className={scrollY > window.innerHeight - 100 ? 'active' : ''}
      >
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
  padding-top: 4.5rem;
  margin-bottom: 15rem;
`;

const NaverWebtoonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.7rem;
  transform: translateY(40px);
  transition-timing-function: ease-in-out;
  opacity: 0;
  transition: 0.6s;
  transition-delay: 0.2s;
  &.active {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default WebtoonList;
