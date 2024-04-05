import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { ConfigProvider, Space, Tag } from 'antd';

import { removeEmptyObject } from 'functions';

import { Categories } from './FilterPanel';
import { options as priceOptions } from 'components/Fragments/Filter/PriceSelect';

const Wrapper = styled.div`
  margin-top: 24px;
  .ant-tag {
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 500;
    & > span:first-child {
      color: #ffffff;
    }
    .ant-tag-close-icon {
      color: #ffffff;
      &:hover {
        color: currentColor;
        opacity: 0.8;
      }
    }
  }
`;

const ProductExploreFilterApply = ({ categories }: { categories: Categories }) => {
  const { query, replace } = useRouter();

  const product = typeof query.product_cate === 'string' ? [query.product_cate] : query.product_cate;
  const style = typeof query.style === 'string' ? [query.style] : query.style;
  const price = query.minPrice || query.maxPrice ? `${query.minPrice || 0}-${query.maxPrice || ''}` : false;
  const priceSelect = priceOptions.find((i) => i.value === price);

  const onRemoveFilter = (
    e: MouseEvent<HTMLElement>,
    key: 'product_cate' | 'style' | 'price' | 'sort',
    value?: string,
  ) => {
    e.preventDefault();

    const filter = { ...query };

    switch (key) {
      case 'product_cate':
        filter['product_cate'] = product?.filter((i) => i !== value);
        break;
      case 'style':
        filter['style'] = style?.filter((i) => i !== value);
        break;
      case 'price':
        filter['minPrice'] = undefined;
        filter['maxPrice'] = undefined;
        break;
      case 'sort':
        filter['sort_by'] = undefined;
        break;
      default:
        break;
    }

    replace({ query: removeEmptyObject(filter) }, undefined, { shallow: true });
  };

  const onResetFilter = () =>
    replace({ query: removeEmptyObject({ name: query.name, sort_by: query.sort_by }) }, undefined, {
      shallow: true,
    });

  const showFilter = Object.keys(query).some((key) =>
    ['product_cate', 'style', 'minPrice', 'maxPrice'].includes(key),
  );

  if (!showFilter) return null;

  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          token: {
            borderRadiusSM: 0,
            marginXS: 0,
            colorFillTertiary: '#acacba',
            colorError: '#ffffff',
            colorErrorBg: '#ea3335',
            fontSizeIcon: 14,
          },
          components: { Tag: { defaultColor: '#ffffff' } },
        }}
      >
        <Space wrap size={12}>
          {product?.map((id) => {
            const category = categories.product_category.find((i) => i.id === Number(id));
            return category ? (
              <Tag key={id} bordered={false} closable onClose={(e) => onRemoveFilter(e, 'product_cate', id)}>
                {category.name}
              </Tag>
            ) : null;
          })}
          {style?.map((id) => {
            const category = categories.style_type.find((i) => i.id === Number(id));
            return category ? (
              <Tag key={id} bordered={false} closable onClose={(e) => onRemoveFilter(e, 'style', id)}>
                {category.name}
              </Tag>
            ) : null;
          })}
          {price && priceSelect && (
            <Tag bordered={false} closable onClose={(e) => onRemoveFilter(e, 'price')}>
              {priceSelect.label}
            </Tag>
          )}
          <Tag color='error' bordered={false} closable onClose={onResetFilter}>
            Xoá bộ lọc
          </Tag>
        </Space>
      </ConfigProvider>
    </Wrapper>
  );
};

export default ProductExploreFilterApply;
