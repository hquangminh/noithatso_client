import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

// prettier-ignore
import { Badge, Button, Col, Collapse, CollapseProps, ConfigProvider, Drawer, DrawerProps, Row, Space } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';
import { useTheme } from 'styled-components';
import { useLazyQuery } from '@apollo/client';

import { removeEmptyObject } from 'functions';

import SortSelect from '../Filter/SortSelect';
import FilterMobileSort from './Sort';
import FilterMobileRoom from './Room';
import FilterMobilePrice from './Price';
import FilterMobileStyle from './StyleCategory';
import FilterMobileProductCategory from './ProductCategory';
import { FilterOutlineIcon } from '../Icons';

import { ButtonPanel, DrawerWrapper, PanelWrapper } from './Style';
import { CategoryProductType } from 'interface/Category';
import { API_GetProductCategory } from 'graphql/category/query';

type Props = {
  isSort?: boolean;
  options?: ('room' | 'style' | 'product-category' | 'price' | 'sort')[];
};

type Filter = {
  sort?: string;
  room?: string;
  style?: string[];
  product_cate?: string[];
  minPrice?: string;
  maxPrice?: string;
};

const FilterPanelMobile = ({ options, isSort = true }: Props) => {
  const { replace, query } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({});

  const [getProductCategory, { data: productCategories }] = useLazyQuery<{
    product_category: CategoryProductType[];
  }>(API_GetProductCategory, { fetchPolicy: 'network-only' });

  const themeSC = useTheme();

  const drawerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!options || options.includes('product-category')) getProductCategory();
  }, [getProductCategory, options]);

  const priceFilter = Object.keys(query).filter((i) => i === 'minPrice' || i === 'maxPrice');
  const totalFilter =
    Object.entries(query).reduce((total, [key, value]) => {
      if (key === 'product_cate' && value) {
        if (typeof value === 'string') {
          return total + 1;
        } else if (productCategories) {
          const prodCate = [...productCategories.product_category];
          const cateSelect = prodCate.filter((i) => {
            const isChild = i.parent_id;
            const isSingle = !i.parent_id && !prodCate.some((y) => y.parent_id === i.id);
            return (isChild || isSingle) && value.includes(i.id.toString());
          });
          return total + cateSelect.length;
        }
      } else if (!['sort_by', 'page', 'name', 'minPrice', 'maxPrice'].includes(key) && value) {
        return total + (typeof value === 'string' ? 1 : value.length);
      }
      return total;
    }, 0) + (priceFilter.length === 2 ? 1 : priceFilter.length);

  const onSetFilter = useCallback(() => {
    if (open) {
      let filter = { ...query };
      for (const key in query) {
        if (query[key]) {
          if (key === 'product_cate' || key === 'style') {
            filter[key] = Array.isArray(query[key]) ? query[key] : ([query[key]] as string[]);
            break;
          }
          filter[key] = query[key];
        }
      }
      setFilter(filter);
    } else setFilter({});
  }, [open, query]);

  useEffect(() => onSetFilter(), [onSetFilter]);

  const onFilter = () => {
    const page = query.page !== '1' ? undefined : query.page;
    replace({ query: removeEmptyObject({ ...filter, page }) }, undefined, { shallow: true });
    setOpen(false);
  };

  const onReset = () => {
    replace({ query: undefined }, undefined, { shallow: true });
    setOpen(false);
  };

  const items: CollapseProps['items'] = [
    {
      key: 'sort',
      role: !options || options.includes('sort') ? 'show' : 'hide',
      label: 'Sắp xếp theo',
      children: (
        <FilterMobileSort value={filter.sort} onSelect={(sort) => setFilter((f) => ({ ...f, sort }))} />
      ),
    },
    {
      key: 'room',
      role: !options || options.includes('room') ? 'show' : 'hide',
      label: 'Loại phòng',
      children: (
        <FilterMobileRoom value={filter.room} onSelect={(room) => setFilter((f) => ({ ...f, room }))} />
      ),
    },
    {
      key: 'product_cate',
      role: !options || options.includes('product-category') ? 'show' : 'hide',
      label: 'Loại sản phẩm',
      children: (
        <FilterMobileProductCategory
          categories={productCategories?.product_category ?? []}
          value={filter.product_cate}
          onSelect={(product_cate) => setFilter((f) => ({ ...f, product_cate }))}
        />
      ),
    },
    {
      key: 'style',
      role: !options || options.includes('style') ? 'show' : 'hide',
      label: 'Phong cách',
      children: (
        <FilterMobileStyle value={filter.style} onSelect={(style) => setFilter((f) => ({ ...f, style }))} />
      ),
    },
    {
      key: 'price',
      role: !options || options.includes('price') ? 'show' : 'hide',
      label: 'Giá tiền',
      children: (
        <FilterMobilePrice
          value={filter.minPrice || filter.maxPrice ? `${filter.minPrice || 0}-${filter.maxPrice || ''}` : 0}
          onSelect={(value) => {
            const [minPrice, maxPrice] = value ? value.split('-') : [undefined, undefined];
            setFilter((f) => ({ ...f, minPrice, maxPrice }));
          }}
        />
      ),
    },
  ];

  const drawerProps: DrawerProps = {
    open,
    title: 'Bộ lọc',
    placement: 'bottom',
    maskClosable: false,
    height: '100%',
    footer: <DrawerFooter onReset={onReset} onFilter={onFilter} />,
    onClose: () => setOpen(false),
    getContainer: () => drawerWrapperRef.current || document.body,
  };

  return (
    <Fragment>
      {isSort ? (
        <PanelWrapper gutter={12}>
          <Col span={12}>
            <ButtonPanel $active={totalFilter > 0} onClick={() => setOpen(true)}>
              <Space size={5} style={{ lineHeight: 1 }}>
                Bộ lọc
                <Badge
                  size='small'
                  count={totalFilter}
                  style={{ backgroundColor: themeSC?.palette.primary.main }}
                />
              </Space>
              <FilterOutlineIcon />
            </ButtonPanel>
          </Col>
          <Col span={12}>
            <SortSelect width='100%' />
          </Col>
        </PanelWrapper>
      ) : (
        <div style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
          <ConfigProvider
            theme={{
              token: { colorError: themeSC?.palette.primary.main, colorText: themeSC?.palette.common.black },
            }}
          >
            <Badge count={totalFilter}>
              <FilterOutlineIcon style={{ fontSize: 24 }} />
            </Badge>
          </ConfigProvider>
        </div>
      )}

      <DrawerWrapper ref={drawerWrapperRef}>
        <Drawer {...drawerProps}>
          <Collapse
            ghost
            items={items.filter((i) => !i.role || i.role === 'show')}
            expandIconPosition='end'
            defaultActiveKey={items.reduce(
              (active: (string | number)[], item) => (item.key ? active.concat([item.key]) : active),
              [],
            )}
          />
        </Drawer>
      </DrawerWrapper>
    </Fragment>
  );
};

export default FilterPanelMobile;

type DrawerFooterProps = { onReset: () => void; onFilter: () => void };
const DrawerFooter = ({ onReset, onFilter }: DrawerFooterProps) => {
  const token: Partial<AliasToken> = {
    colorPrimary: '#181818',
    colorTextBase: '#181818',
    colorBorder: '#181818',
    borderRadius: 0,
    controlOutline: 'none',
    fontSize: 12,
  };

  return (
    <ConfigProvider theme={{ token }}>
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Button block size='large' style={{ fontWeight: 500 }} onClick={onReset}>
            Xoá lọc
          </Button>
        </Col>
        <Col span={12}>
          <Button block type='primary' size='large' style={{ fontWeight: 500 }} onClick={onFilter}>
            Lọc
          </Button>
        </Col>
      </Row>
    </ConfigProvider>
  );
};
