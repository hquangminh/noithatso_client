import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled, useTheme } from 'styled-components';
import { useQuery } from '@apollo/client';
import { DownOutlined } from '@ant-design/icons';
import { Badge, ConfigProvider, Dropdown, MenuProps, ThemeConfig } from 'antd';

import { useWindowScroll, useWindowSize } from 'lib/hooks';
import { isArrayEmpty } from 'functions';
import { OpenMenu } from 'store/reducer/web';
import { GetCartTotal } from 'store/reducer/cart';
import { API_GetCategory } from 'graphql/homepage/query';

import Logo from 'components/Fragments/Logo';
import { CartOutlinedIcon, MenuMobileIcon, SearchOutlinedIcon } from 'components/Fragments/Icons';

import { MenuKey } from 'interface/Layout';
import { CategoryProductType, CategoryRoomType } from 'interface/Category';

import { Container, maxMedia } from 'lib/styles';

const Header = styled.header<{ $fixed: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 18px 0;
  background-color: ${({ theme }) => theme.bodyColor};
  border-bottom: solid ${({ $fixed }) => ($fixed ? 0 : 1)}px #e3e3e8;
  box-shadow: 0 1px 4px ${({ $fixed }) => ($fixed ? 'rgba(227, 227, 232, 50%)' : 'transparent')};

  ${maxMedia.xsmall} {
    padding: 15px 0;
  }

  .ant-dropdown,
  .ant-dropdown-menu-submenu {
    .ant-dropdown-menu {
      width: 228px;
      max-height: calc(100vh - 200px);
      padding: 0;
      overflow-y: auto;
      &::-webkit-scrollbar {
        background-color: #fff;
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 40px;
      }
      &:hover::-webkit-scrollbar-thumb {
        background-color: #bfbfbf;
      }
    }
    .ant-dropdown-menu-item.ant-dropdown-menu-item-only-child,
    .ant-dropdown-menu-submenu .ant-dropdown-menu-submenu-title {
      display: flex;
      padding: 12px;
      font-weight: 500;
      &:hover .ant-dropdown-menu-submenu-expand-icon .ant-dropdown-menu-submenu-arrow-icon {
        color: ${({ theme }) => theme.palette.primary.main};
      }
      .ant-dropdown-menu-title-content {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:has(.ant-dropdown-menu-submenu-expand-icon.ant-dropdown-menu-submenu-arrow)
        .ant-dropdown-menu-title-content {
        max-width: calc(100% - 20px);
      }
    }
    .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-open {
      background-color: #f4f5f8;
      .ant-dropdown-menu-submenu-arrow .ant-dropdown-menu-submenu-arrow-icon {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Menu = styled.nav`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 40px;

  ${maxMedia.custom(1024)} {
    column-gap: 30px;
  }
`;
const MenuItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: ${({ $active, theme }) => ($active ? theme.palette.primary.main : theme.palette.common.black)};
  cursor: pointer;

  .icon-menu-dropdown {
    font-size: 12px;
  }

  &.ant-dropdown-open,
  &:hover,
  &:hover .icon-menu-dropdown {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 28px;
  ${maxMedia.medium} {
    column-gap: 20px;
  }
`;
const ActionItem = styled.div`
  display: inline-flex;
  font-size: 24px;
  color: ${({ theme }) => theme.palette.common.black};
  cursor: pointer;

  a,
  a:hover {
    color: currentColor;
  }
`;

type Props = { menuActive?: MenuKey; handelOpenSearch: () => void };
type Category = { room_type: CategoryRoomType[]; product_category: CategoryProductType[] };

const HeaderGlobal = ({ menuActive, handelOpenSearch }: Props) => {
  const dispatch = useDispatch();
  const { push, replace, pathname, query } = useRouter();
  const theme = useTheme();
  const pageYOffset = useWindowScroll();
  const [screenW] = useWindowSize();
  const headerRef = useRef<HTMLElement>(null);

  const cartTotal = useSelector(GetCartTotal);

  const isMobile = typeof screenW === 'number' && screenW < 992;

  const { data: categories } = useQuery<Category>(API_GetCategory, { fetchPolicy: 'network-only' });

  const onSelectMenuDropdown = (key: string, value: number | number[]) => {
    if (pathname === '/san-pham')
      replace({ query: { ...query, [key]: value } }, undefined, { shallow: true });
    else push({ pathname: '/san-pham', query: { [key]: value } }, undefined, { shallow: true });
  };

  const menuProduct: MenuProps['items'] = categories
    ? categories.product_category
        .filter((i) => !i.parent_id)
        .map((cate) => {
          const subCategories = categories.product_category.filter((i) => i.parent_id === cate.id);
          const arrCate = subCategories.map((i) => i.id);
          return {
            key: cate.id,
            label: cate.name,
            onClick: () => isArrayEmpty(arrCate) && onSelectMenuDropdown('product_cate', cate.id),
            onTitleClick: () => onSelectMenuDropdown('product_cate', arrCate),
            children:
              subCategories.length > 0
                ? subCategories.map((subCate) => ({
                    key: subCate.id,
                    label: subCate.name,
                    onClick: () => onSelectMenuDropdown('product_cate', subCate.id),
                  }))
                : undefined,
          };
        })
    : [];

  const themeMenuDropdown: ThemeConfig = {
    token: {
      colorText: theme?.palette.common.black,
      fontSize: 16,
      lineHeight: 1.4,
      borderRadiusLG: 0,
      lineWidthFocus: 0,
      colorTextDescription: '#bfbfbf',
      controlItemBgHover: '#f4f5f8',
      boxShadowSecondary:
        '0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12)',
    },
  };

  return (
    <Header ref={headerRef} $fixed={pageYOffset > 0}>
      <Container>
        <Content>
          <Logo />
          {!isMobile && (
            <Menu>
              <MenuItem $active={menuActive === MenuKey.HOMEPAGE}>
                <Link href='/'>Trang chủ</Link>
              </MenuItem>
              <MenuItem $active={menuActive === MenuKey.PORTFOLIO}>
                <Link href='/y-tuong-thiet-ke'>Ý tưởng thiết kế</Link>
              </MenuItem>
              <ConfigProvider theme={themeMenuDropdown}>
                <Dropdown
                  overlayStyle={{ paddingTop: 22 }}
                  menu={{
                    items: menuProduct,
                    getPopupContainer: (triggerNode) => headerRef.current || triggerNode,
                  }}
                  getPopupContainer={(triggerNode) => triggerNode}
                >
                  <MenuItem $active={menuActive === MenuKey.PRODUCT}>
                    <Link href='/san-pham'>
                      Sản phẩm <DownOutlined className='icon-menu-dropdown' />
                    </Link>
                  </MenuItem>
                </Dropdown>
              </ConfigProvider>
              <MenuItem $active={menuActive === MenuKey.BLOG}>
                <Link href={'/bai-viet/tat-ca'}>Bài viết</Link>
              </MenuItem>
              <MenuItem $active={menuActive === MenuKey.ORDER_TRACKING}>
                <Link href={'/kiem-tra-don-hang'}>Kiểm tra đơn hàng</Link>
              </MenuItem>
            </Menu>
          )}
          <ActionGroup>
            <ActionItem onClick={handelOpenSearch}>
              <SearchOutlinedIcon />
            </ActionItem>
            <Badge count={cartTotal} offset={[5, 0]}>
              <ActionItem>
                <Link href={'/gio-hang'}>
                  <CartOutlinedIcon />
                </Link>
              </ActionItem>
            </Badge>
            {isMobile && (
              <ActionItem onClick={() => dispatch(OpenMenu())}>
                <MenuMobileIcon />
              </ActionItem>
            )}
          </ActionGroup>
        </Content>
      </Container>
    </Header>
  );
};

export default HeaderGlobal;
