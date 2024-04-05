import { Row } from 'antd';
import { styled } from 'styled-components';

export const PanelWrapper = styled(Row)`
  padding-block: 18px;
  position: 'sticky';
  top: 0;
  z-index: 100;
  background: '#fff';
`;
export const ButtonPanel = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 36px;
  padding: 4px 12px;
  color: ${({ theme }) => theme.palette.common.black};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.palette.common.black : '#e3e3e8')};
  cursor: pointer;

  span.anticon {
    color: #bfbfbf;
  }
`;
export const DrawerWrapper = styled.div`
  width: 100%;
  .ant-drawer {
    .ant-drawer-header {
      padding: 13px 16px;
      font-size: 16px;
      border-color: #e3e3e8;
      .ant-drawer-close {
        position: absolute;
        right: 0;
      }
      .ant-drawer-title {
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.common.black};
      }
    }
    .ant-drawer-body {
      padding: 0 16px;
    }
    .ant-drawer-footer {
      padding: 16px 24px;
      border-top: solid 1px #e3e3e8;
    }
  }

  .ant-collapse {
    .ant-collapse-item {
      & + .ant-collapse-item {
        border-top: solid 1px #e3e3e8;
      }
      .ant-collapse-header {
        padding: 12px 0;
        .ant-collapse-header-text {
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme.palette.common.black};
        }
        .ant-collapse-expand-icon {
          color: #bfbfbf;
        }
      }
      .ant-collapse-content {
        .ant-collapse-content-box {
          padding: 0;
          padding-bottom: 12px;
        }
      }
    }
  }

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    .ant-radio-wrapper {
      margin-right: 0;
      & > span:not([class]) {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.textColor};
        span {
          color: #acacba;
        }
      }
    }
  }

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    .ant-checkbox-group-item > span:not([class]) {
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.textColor};
      span {
        color: #acacba;
      }
    }
  }

  .ant-tree {
    .ant-tree-list-holder-inner {
      .ant-tree-treenode {
        width: 100%;
        padding-bottom: 8px;
        &:last-child {
          padding-bottom: 0;
        }
        .ant-tree-switcher {
          order: 3;
          color: #bfbfbf;
          &.ant-tree-switcher-noop {
            display: none;
          }
          .ant-tree-switcher-icon {
            font-size: 12px;
          }
        }
        .ant-tree-node-content-wrapper {
          &:hover {
            background-color: inherit;
          }
          .ant-tree-title {
            font-size: 14px;
            font-weight: 500;
            color: ${({ theme }) => theme.textColor};
            span {
              color: #acacba;
            }
          }
        }
      }
    }
  }
`;
