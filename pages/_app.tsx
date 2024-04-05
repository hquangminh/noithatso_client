import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';

import { setCookie } from 'cookies-next';
import { ThemeProvider } from 'styled-components';
import { StyleProvider } from '@ant-design/cssinjs';

import store from 'store';

import LoadingPage from 'components/Fragments/LoadingPage';
import ZaloWidgetChat from 'components/Fragments/ZaloWidgetChat';

import AntdConfigProvider from 'lib/AntdConfigProvider';
import StyledComponentTheme from 'lib/theme/StyledComponent';
import { GlobalStyle, AntDStyle } from 'lib/styles';

import 'antd/dist/reset.css';

const montserrat = Montserrat({
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const referrer = router.query.ref?.toString();
    if (referrer) setCookie('referrer', referrer, { maxAge: 60 * 60 * 24 * 7 });
  }, [router.query.ref]);

  return (
    <div className={montserrat.className}>
      <Provider store={store}>
        <StyleProvider hashPriority='high'>
          <AntdConfigProvider>
            <ThemeProvider theme={StyledComponentTheme}>
              <GlobalStyle />
              <AntDStyle />
              <Component {...pageProps} />
              <LoadingPage />
              <ZaloWidgetChat />
            </ThemeProvider>
          </AntdConfigProvider>
        </StyleProvider>
      </Provider>
    </div>
  );
}
