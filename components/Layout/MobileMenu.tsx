import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';
import { CloseOutlined } from '@ant-design/icons';
import { Collapse, Drawer, DrawerProps } from 'antd';

import { isArrayEmpty } from 'functions';
import { CheckMenuOpen, CloseMenu } from 'store/reducer/web';
import { API_GetProductCategory } from 'graphql/category/query';

import Logo from 'components/Fragments/Logo';

import { CategoryProductType } from 'interface/Category';
import { MenuKey } from 'interface/Layout';

const MobileMenu_Wrapper = styled.div`
  .ant-collapse {
    .ant-collapse-item {
      .ant-collapse-header {
        align-items: center;
        padding: 0;
        padding-inline-start: 0 !important;
        .ant-collapse-expand-icon .anticon {
          font-size: 16px;
          color: ${({ theme }) => theme.palette.common.black};
        }
      }
      .ant-collapse-content-box {
        padding: 0;
        padding-block: 0 !important;
        .ant-collapse-header {
          padding-right: 10px;
          border-radius: 0;
          .ant-collapse-expand-icon .anticon {
            color: #bfbfbf;
          }
          &:hover {
            background-color: #f4f5f8;
            .ant-collapse-expand-icon .anticon {
              color: ${({ theme }) => theme.palette.primary.main};
            }
          }
        }
      }
    }
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn-close-menu {
    font-size: 18px;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
  }
`;
const MenuItem = styled.div<{ $active?: boolean }>`
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ $active, theme }) => ($active ? theme.palette.primary.main : theme.palette.common.black)};
  a,
  a:hover {
    color: currentColor;
  }
`;
const SubMenuItem = styled.div`
  padding: 6px 16px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  &[aria-level='1']:hover {
    background-color: #f4f5f8;
  }
  &[aria-level='2'] {
    padding: 6px 16px 6px 32px;
    &:hover {
      background-color: #f4f5f8;
    }
  }
`;

type Props = { menuActive?: MenuKey };

const MobileMenu = ({ menuActive }: Props) => {
  const dispatch = useDispatch();
  const { push, replace, pathname, query } = useRouter();

  const isOpen = useSelector(CheckMenuOpen);

  const { data: productCate } = useQuery<{ product_category: CategoryProductType[] }>(API_GetProductCategory);

  const onClickMenuDropdown = (key: string, value: number | number[]) => {
    if (pathname === '/san-pham') {
      replace({ query: { ...query, [key]: value } }, undefined, { shallow: true });
    } else push({ pathname: '/san-pham', query: { [key]: value } }, undefined, { shallow: true });
  };

  const drawerProps: DrawerProps = {
    open: isOpen,
    mask: false,
    closable: false,
    title: <DrawerHeader onClose={() => dispatch(CloseMenu())} />,
    width: '100vw',
    headerStyle: { padding: '20.5px 16px' },
    bodyStyle: { padding: '12px 16px' },
  };

  return (
    <Drawer {...drawerProps}>
      <MobileMenu_Wrapper>
        <MenuItem $active={menuActive === MenuKey.HOMEPAGE}>
          <Link href='/'>Trang chủ</Link>
        </MenuItem>
        <MenuItem $active={menuActive === MenuKey.PORTFOLIO}>
          <Link href='/y-tuong-thiet-ke'>Ý tưởng thiết kế</Link>
        </MenuItem>
        <Collapse ghost expandIconPosition='end'>
          <Collapse.Panel
            collapsible='icon'
            header={
              <MenuItem $active={menuActive === MenuKey.PRODUCT}>
                <Link href='/san-pham'>Sản phẩm</Link>
              </MenuItem>
            }
            key='product-cate'
          >
            {productCate?.product_category
              .filter((i) => !i.parent_id)
              .map((item) => {
                const cateChild = productCate.product_category.filter((i) => i.parent_id === item.id);
                return (
                  <Collapse ghost expandIconPosition='end' key={item.id}>
                    <Collapse.Panel
                      key={item.id}
                      collapsible='icon'
                      showArrow={productCate.product_category.some((i) => i.parent_id === item.id)}
                      header={
                        <SubMenuItem
                          key={item.id}
                          onClick={() =>
                            onClickMenuDropdown(
                              'product_cate',
                              isArrayEmpty(cateChild) ? item.id : cateChild.map((i) => i.id),
                            )
                          }
                        >
                          {item.name}
                        </SubMenuItem>
                      }
                    >
                      {cateChild.map((subCate) => (
                        <SubMenuItem
                          key={subCate.id}
                          aria-level={2}
                          onClick={() => onClickMenuDropdown('product_cate', subCate.id)}
                        >
                          {subCate.name}
                        </SubMenuItem>
                      ))}
                    </Collapse.Panel>
                  </Collapse>
                );
              })}
          </Collapse.Panel>
        </Collapse>
        <MenuItem $active={menuActive === MenuKey.BLOG}>
          <Link href='/bai-viet/tat-ca'>Bài viết</Link>
        </MenuItem>
        <MenuItem $active={menuActive === MenuKey.ORDER_TRACKING}>
          <Link href='/kiem-tra-don-hang'>Kiểm tra đơn hàng</Link>
        </MenuItem>
      </MobileMenu_Wrapper>
    </Drawer>
  );
};

export default MobileMenu;

const DrawerHeader = ({ onClose }: { onClose: () => void }) => (
  <Header>
    <Logo />
    <CloseOutlined className='btn-close-menu' onClick={onClose} />
  </Header>
);
