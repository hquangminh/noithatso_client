import { useEffect, useState } from 'react';

const useWindowScroll = () => {
  const [pageYOffset, setPageYOffset] = useState<number>(0);

  const handleScroll = () => setPageYOffset(window.pageYOffset || document.documentElement.scrollTop);

  useEffect(() => {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return pageYOffset;
};
export default useWindowScroll;
