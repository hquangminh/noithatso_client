import { createGlobalStyle, css } from 'styled-components';

const AntdCss = css`
  html body:has(.ant-drawer-open, .ant-modal-wrap) {
    overflow: hidden;
  }

  .ant-breadcrumb {
    ol > li:not([class]):not(:last-child) span a {
      font-weight: 500;
    }
    ol > li:not([class]):last-child span {
      font-weight: 600;
    }
  }

  .ant-btn {
    &:has(> a:not(:empty)) {
      a {
        color: currentColor;
        transition: unset;
        &:after {
          position: absolute;
          inset: 0;
          background: transparent;
          content: '';
        }
      }
      &:not(> span.ant-btn-icon):has(span[role='img']) span[role='img'] {
        margin-right: 5px;
      }
    }
    @media only screen and (hover: none) and (pointer: coarse) {
      &:focus,
      &:active {
        /* color: inherit !important;
      border-color: inherit !important;
      background-color: inherit !important; */
      }
    }
  }

  .ant-tag {
    &:has(> a) {
      position: relative;
      a:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: transparent;
        content: '';
      }
    }
  }

  .ant-notification {
    .ant-notification-notice {
      max-width: calc(100vw - 32px) !important;
    }
  }

  .ant-form-item-explain[role='alert'].ant-form-item-explain-connected {
    font-size: 12px;
    & > div,
    .ant-form-item-explain-error {
      line-height: 22px;
    }
  }
`;
const AntDStyle = createGlobalStyle`
  ${AntdCss}
`;

export default AntDStyle;
