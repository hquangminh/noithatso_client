import { styled } from 'styled-components';
import { TextLineClamp, maxMedia } from 'lib/styles';

export const SelectDropdownItem = styled.span`
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  span {
    color: ${({ theme }) => theme.palette.common.gray};
  }
`;

export const DropdownWrapper = styled.div<{ $open: boolean; $active?: boolean; $hideRadio?: boolean }>`
  position: relative;
  border: solid 1px;
  border-bottom-width: 0;
  border-color: ${({ $open, $active, theme }) => ($open || $active ? theme.palette.common.black : '#e3e3e8')};
  transition: all 100ms;

  ${({ $active, theme }) => {
    if ($active) return `& > div:last-child { border-color: ${theme.palette.common.black};}`;
  }}

  .ant-radio-group,
  .ant-checkbox-group {
    width: 100%;
    .ant-space {
      width: 100%;
    }
  }

  .ant-radio-group {
    .ant-radio-wrapper {
      display: grid;
      grid-template-columns: ${({ $hideRadio }) => ($hideRadio ? '100%' : '16px auto')};
      padding: 6px 12px;
      margin-inline-end: 0;
      &:after {
        display: none;
      }
      .ant-radio.ant-wave-target > div,
      .ant-radio.ant-wave-target .ant-radio-inner {
        display: ${({ $hideRadio }) => ($hideRadio ? 'none' : 'block')};
      }
      & > span:not([class]) {
        padding-left: ${({ $hideRadio }) => ($hideRadio ? 0 : '8px')};
        align-self: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        background-color: #f6f7f8;
      }
    }
  }

  .ant-checkbox-group {
    .ant-checkbox-wrapper {
      width: 100%;
      padding: 6px 12px;
      &:hover {
        background-color: #f6f7f8;
      }
    }
  }

  .ant-tree {
    .ant-tree-list-holder-inner {
      .ant-tree-treenode {
        width: 100%;
        padding: 4px 4px 4px 12px;
        &:hover {
          background-color: #f6f7f8;
        }
        .ant-tree-switcher {
          order: 3;
          &.ant-tree-switcher-noop {
            display: none;
          }
        }
        .ant-tree-node-content-wrapper:hover {
          background-color: inherit;
        }
      }
    }
  }
`;
export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  height: 42px;
  padding: 4px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.common.black};
  cursor: pointer;
  .anticon {
    font-size: 12px;
    color: #bfbfbf;
  }

  ${maxMedia.medium} {
    height: 34px;
  }
`;
export const DropdownContent = styled.div<{ $open: boolean }>`
  position: absolute;
  left: -1px;
  z-index: ${({ $open: open }) => (open ? 10 : 1)};

  display: grid;

  width: calc(100% + 2px);
  max-height: ${({ $open: open }) => (open ? '190px' : 0)};
  overflow-x: hidden;
  overflow-y: auto;

  border: solid 1px;
  border-top-width: 0;
  border-color: ${({ $open: open, theme }) => (open ? theme.palette.common.black : '#e3e3e8')};
  background-color: ${({ theme }) => theme.palette.common.white};
  transition: all 100ms;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 40px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
  }
`;
export const DropdownSelected = styled(TextLineClamp)`
  margin-bottom: 0;
  font-size: 14px;
  word-break: break-all;
  span {
    color: inherit;
    font-weight: inherit;
  }
`;
