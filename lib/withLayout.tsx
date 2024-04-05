import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useDevice } from 'lib/hooks';
import { SetDataCart } from 'store/reducer/cart';

import LayoutPage, { LayoutProps } from 'components/Layout';

import { PageProps } from 'interface/Global';

interface SSRComponentElements {
  getInitialProps?: () => Promise<any>;
}

type SSRProps = {};

export type WithLayoutProps = SSRProps & {};

const withLayout = (
  BaseComponent: React.ComponentType<WithLayoutProps | undefined | any> & SSRComponentElements,
  propsLayout?: LayoutProps,
) => {
  const App = (props: PageProps) => {
    const dispatch = useDispatch();
    const { device, viewport } = useDevice();

    const setCartRedux = useCallback(() => {
      const cartLocalStorage = localStorage.getItem('cart') || '[]';
      dispatch(SetDataCart(JSON.parse(cartLocalStorage)));
    }, [dispatch]);

    // Minimum page height should be 100vh
    const setMinHeightContent = useCallback(() => {
      if (viewport.height) {
        const heightHeader = document.getElementsByTagName('header')[0]?.clientHeight || 0;
        const heightFooter = document.getElementsByTagName('footer')[0]?.clientHeight || 0;
        const pageContent = document.querySelector('#__next > div > main');
        if (pageContent) {
          let pageStyle = pageContent.getAttribute('style') ?? '';
          pageStyle = pageStyle.trim().replace(/\s+/g, '');
          pageStyle = pageStyle.replace(/min-height(.*?)\;/, '');

          const minHeight = viewport.height - heightHeader - heightFooter;
          const newStyle = minHeight > 0 ? `${pageStyle} min-height: ${minHeight}px;`.trim() : pageStyle;
          if (newStyle) pageContent.setAttribute('style', newStyle);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device, viewport]);

    useEffect(() => {
      setCartRedux();
      setMinHeightContent();
    }, [setCartRedux, setMinHeightContent]);

    return (
      <LayoutPage {...propsLayout}>
        <BaseComponent {...props} />
      </LayoutPage>
    );
  };

  return App;
};

export default withLayout;
