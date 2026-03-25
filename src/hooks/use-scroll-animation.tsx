import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  return { ref, isVisible };
};

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        const elementTop = rect.top + scrollTop;
        const distance = scrollTop - elementTop;
        setOffset(distance * speed);
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [speed]);

  return { ref, offset };
};

export const useStaggeredAnimation = (items: any[], delay = 0.1) => {
  return items.map((item, index) => ({
    item,
    delay: index * delay,
  }));
};