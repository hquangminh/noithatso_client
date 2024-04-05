import { createGlobalStyle, css } from 'styled-components';

const GlobalCss = css`
  html,
  body {
    height: 100%;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }

  body {
    margin: 0;

    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    word-break: break-word;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  a {
    text-decoration: none;
    color: currentColor;
    &:hover {
      color: currentColor;
    }
  }

  a,
  button,
  input {
    outline: none;
  }

  // Disabled Select Text
  button {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  // Hide Arrows From Input Number
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  //
  .font-weight-bold {
    font-weight: 600;
  }

  .hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      /* Chrome, Safari and Opera */
      display: none;
    }
  }

  .zalo-chat-widget {
    bottom: 36px !important;
    right: 16px !important;
    z-index: 999 !important;
  }
`;
const GlobalStyle = createGlobalStyle`
  ${GlobalCss}
`;

export default GlobalStyle;
