import React from 'react';

import { Montserrat } from 'next/font/google';

import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import viVN from 'antd/locale/vi_VN';

const montserrat = Montserrat({
  display: 'auto',
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const configProps: ConfigProviderProps = {
  locale: viVN,
  theme: {
    token: {
      colorPrimary: '#e3a070',
      colorTextBase: '#424153',
      fontFamily: montserrat.style.fontFamily,
    },
    components: {
      Pagination: {
        borderRadius: 0,
        colorPrimary: '#181818',
        colorText: '#181818',
        controlHeight: 40,
      },
      Breadcrumb: {
        itemColor: '#424153',
        linkColor: '#424153',
        separatorColor: '#424153',
      },
    },
  },
  pagination: { showSizeChanger: false },
};

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider {...configProps}>{children}</ConfigProvider>;
};

export default AntdConfigProvider;
