import { Montserrat } from 'next/font/google';
import { ThemeConfig } from 'antd';

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'auto',
});

const AntDesignTheme: ThemeConfig = {
  token: {
    colorPrimary: '#e3a070',
    colorTextBase: '#424153',
    fontFamily: montserrat.style.fontFamily,
    lineHeight: 1.4,
  },
};

export default AntDesignTheme;

export const PaginationTheme: ThemeConfig = {
  token: { controlHeight: 40, borderRadius: 0, colorPrimary: '#181818', colorText: '#181818' },
};
