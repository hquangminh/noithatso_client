import { DefaultTheme } from 'styled-components';

const StyledComponentTheme: DefaultTheme = {
  name: 'default',
  borderRadius: '6px',
  borderColor: '#d9d9d9',
  bodyColor: '#ffffff',
  textColor: '#424153',

  colorError: '#ff4d4f',

  palette: {
    common: {
      black: '#181818',
      white: '#ffffff',
      gray: '#acacba',
    },
    primary: {
      main: '#e3a070',
      mainBg: '#cedbd4',
      contrastText: '#ffffff',
    },
  },
};

export default StyledComponentTheme;
