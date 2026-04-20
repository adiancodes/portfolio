import { useCallback, useEffect, useRef, useState, RefObject } from 'react';

export function useWindowSize() {
  const dimensions = useRef({ width: 1280, height: 800 });

  const createRuler = useCallback(() => {
    let ruler: HTMLDivElement | null = document.createElement('div');

    ruler.style.position = 'fixed';
    ruler.style.height = '100vh';
    ruler.style.width = '0';
    ruler.style.top = '0';

    document.documentElement.appendChild(ruler);

    dimensions.current.width = window.innerWidth;
    dimensions.current.height = ruler.offsetHeight;

    document.documentElement.removeChild(ruler);
    ruler = null;
  }, []);

  const getHeight = useCallback(() => {
    const isIOS = typeof navigator !== 'undefined' && navigator?.userAgent.match(/iphone|ipod|ipad/i);

    if (isIOS) {
      createRuler();
      return dimensions.current.height;
    }

    return typeof window !== 'undefined' ? window.innerHeight : 800;
  }, [createRuler]);

  const getSize = useCallback(() => {
    return {
      width: typeof window !== 'undefined' ? window.innerWidth : 1280,
      height: getHeight(),
    };
  }, [getHeight]);

  const [windowSize, setWindowSize] = useState(dimensions.current);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize]);

  return windowSize;
}

export function useInViewport(
  elementRef: RefObject<Element | null>,
  unobserveOnIntersect?: boolean,
  options: IntersectionObserverInit = {},
  shouldObserve = true
) {
  const [intersect, setIntersect] = useState(false);
  const [isUnobserved, setIsUnobserved] = useState(false);

  useEffect(() => {
    if (!elementRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry;

      setIntersect(isIntersecting);

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target);
        setIsUnobserved(true);
      }
    }, options);

    if (!isUnobserved && shouldObserve) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef, unobserveOnIntersect, options, isUnobserved, shouldObserve]);

  return intersect;
}
