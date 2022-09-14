import _ from 'lodash';
import { useState, useCallback, useEffect } from 'react';

interface ResizingObj {
  innerHeight: number;
  innerWidth: number;
}

/**
 * Get window screen size on resize event
 * @param {callback} callbackOnResizing
 * @return {ResizingObj}
 */
function useScreenSize(callbackOnResizing?: () => void) {
  const [observeResizing, setObserveResizing] = useState(true);
  const [screenSize, setScreenSize] = useState<ResizingObj>({
    innerHeight,
    innerWidth,
  });

  const getResizingEvent = useCallback(
    _.throttle(({ currentTarget }) => {
      setScreenSize(() => {
        return {
          innerHeight: currentTarget.innerHeight,
          innerWidth: currentTarget.innerWidth,
        };
      });

      callbackOnResizing && callbackOnResizing();
    }, 300),
    [callbackOnResizing],
  );

  useEffect(() => {
    setScreenSize(() => ({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    }));

    observeResizing
      ? window.addEventListener('resize', getResizingEvent)
      : window.removeEventListener('resize', getResizingEvent);

    return () => {
      window.removeEventListener('resize', getResizingEvent);
    };
  }, [observeResizing, getResizingEvent]);

  return { screenSize, setObserveResizing };
}

export default useScreenSize;
