import { Platform } from '@apis/DTO/webtoons';
import { getWebtoonsAPI } from '@apis/webtoons';
import useScroll from '@hooks/useScroll';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SectionBar, ToonsListItem } from 'toons-components';

function WebtoonList() {
  const navigate = useNavigate();
  const { data } = useQuery('webtoon-list', () => getWebtoonsAPI('NAVER'), {
    select: (res) => res.content,
  });
  const { scrollY } = useScroll();
  const [isActivated, setIsActivated] = useState(false);
  const moveToPlatformPage = (platform: 'naver' | 'kakao') => {
    navigate(`/webtoons/${platform}`);
  };

  useEffect(() => {
    if (scrollY > window.innerHeight - 100 && !isActivated) {
      setIsActivated(true);
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
