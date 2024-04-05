import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { CloseMenu } from 'store/reducer/web';

import { styled } from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  background-color: rgba(var(--color-white-rgb), 80%);
  backdrop-filter: blur(4px);

  .spinner {
    width: 56px;
    height: 56px;
    display: grid;
    border: 4.5px solid #0000;
    border-radius: 50%;
    border-right-color: #e3a070;
    animation: spinner-a4dj62 1s infinite linear;
  }

  .spinner::before,
  .spinner::after {
    content: '';
    grid-area: 1/1;
    margin: 2.2px;
    border: inherit;
    border-radius: 50%;
    animation: spinner-a4dj62 2s infinite;
  }

  .spinner::after {
    margin: 8.9px;
    animation-duration: 3s;
  }

  @keyframes spinner-a4dj62 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const LoadingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      setShow(shallow ? false : true);
      dispatch(CloseMenu());
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', () => setShow(false));
    router.events.on('routeChangeError', () => setShow(false));
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', () => setShow(false));
      router.events.off('routeChangeError', () => setShow(false));
    };
  }, [dispatch, router]);

  if (!isShow) return null;

  return (
    <Wrapper>
      <div className='spinner' />
    </Wrapper>
  );
};

export default LoadingPage;
