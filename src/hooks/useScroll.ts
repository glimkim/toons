import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

interface ScrollObject {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'UP' | 'DOWN';
}

interface useScrollProps {
  callbackOnScrolling?: () => void;
}

function useScroll(callbackOnScrolling?: () => void) {
  const [scroll, setScroll] = useState<ScrollObject>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: 'DOWN',
  });

  const getScrollEvent = useCallback(
    _.throttle((e) => {
      setScroll((prev) => {
        const bodyOffset = document.body.getBoundingClientRect();
        return {
          scrollY: -bodyOffset.top,
          scrollX: bodyOffset.left,
          scrollDirection:
            (prev?.scrollY || 0) < -bodyOffset.top ? 'DOWN' : 'UP',
        };
      });
      callbackOnScrolling && callbackOnScrolling();
    }, 300),
    [callbackOnScrolling],
  );

  useEffect(() => {
    window.addEventListener('scroll', getScrollEvent);

    return () => {
      window.removeEventListener('scroll', getScrollEvent);
    };
  }, []);

  return scroll;
}

export default useScroll;