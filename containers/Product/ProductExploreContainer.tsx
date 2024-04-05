import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useLazyQuery, useQuery } from '@apollo/client';
import { styled } from 'styled-components';
import { Pagination, Spin } from 'antd';

import { useWindowSize } from 'lib/hooks';
import { isArrayEmpty, removeEmptyObject, removeSpaceString } from 'functions';
import { API_GetProduct, API_GetProductFilterCategory } from 'graphql/product/query';

import ResultFragment from 'components/Fragments/Result';
import ProductExploreBanner from 'components/Pages/Product/Explore/Banner';
import ProductExploreFilterPanel, { Categories } from 'components/Pages/Product/Explore/FilterPanel';
import FilterPanelMobile from 'components/Fragments/FilterMobile';
import ProductExploreFilterApply from 'components/Pages/Product/Explore/FilterApply';
import ProductCard from 'components/Pages/Product/ProductCard';

import { ProductType } from 'interface/Product';

import { Container, maxMedia } from 'lib/styles';

const Wrapper = styled.div``;
const ProductList = styled.div`
  padding: 40px 0;
  min-height: 200px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 32px 24px;

  ${maxMedia.custom(1024)} {
    gap: 24px 16px;
  }
  ${maxMedia.custom(768)} {
    padding-top: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${maxMedia.xsmall} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${maxMedia.tiny} {
    grid-template-columns: 100%;
  }
`;

const pageSize = 30;

type QueryResponse = {
  product: ProductType[];
  product_aggregate: { aggregate: { count: number } };
};

const ProductExploreContainer = () => {
  const { replace, query } = useRouter();
  const [width] = useWindowSize();

  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProduct] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const { data: categories } = useQuery<Categories>(API_GetProductFilterCategory);
  const [fetchProduct] = useLazyQuery<QueryResponse>(API_GetProduct, {
    variables: { page_size: pageSize },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ product, product_aggregate }) => {
      if (product.length === 0 && query.page && query.page !== '1') onChangePage(1);
      setProduct(product);
      setTotal(product_aggregate.aggregate.count);
      setLoading(false);
    },
  });

  const onChangePage = (page?: number) => {
    replace({ query: { ...query, page } }, undefined, { shallow: true });

    const banner = document.getElementById('product-explore-banner');
    if (banner) window.scrollTo({ top: banner.clientHeight, behavior: 'smooth' });
  };

  const onFilterProduct = useCallback(async () => {
    setLoading(true);

    const { name: keywords = '', product_cate, style, sort_by, minPrice, maxPrice, page } = query;

    const filter: Record<string, any> = {
      name: { _ilike: `%${removeSpaceString(keywords?.toString()) ?? ''}%` },
      status: { _eq: true },
      product_category_relations: {
        product_category: {
          status: { _eq: true },
          _or: [{ product_category: { status: { _eq: true } } }, { parent_id: { _is_null: true } }],
        },
      },
      product_variations: {
        promotion_price: { _gte: minPrice || 0, _lte: maxPrice || Number.MAX_SAFE_INTEGER },
      },
    };

    if (product_cate)
      filter.product_category_relations = {
        _or:
          typeof product_cate === 'string'
            ? [{ category_id: { _eq: product_cate }, product_category: { status: { _eq: true } } }]
            : product_cate.map((i) => ({
                category_id: { _eq: i },
                product_category: { status: { _eq: true } },
              })),
      };
    if (style)
      filter.product_styles = {
        _or:
          typeof style === 'string'
            ? [{ style_id: { _eq: style } }]
            : style.map((i) => ({ style_id: { _eq: i } })),
      };

    let order_by: Record<string, string> | Record<string, any>[] | undefined = undefined;
    if (!sort_by || sort_by === 'bestseller')
      order_by = [
        { order_products_aggregate: { sum: { delivery_quantity: 'desc_nulls_last' } } },
        { name: 'asc' },
      ];
    else if (sort_by === 'newest') order_by = { created_at: 'desc' };
    else if (sort_by === 'price-low-to-hight')
      order_by = [
        { product_variations_aggregate: { min: { promotion_price: 'asc_nulls_last' } } },
        { name: 'asc' },
      ];
    else if (sort_by === 'price-hight-to-low')
      order_by = [
        { product_variations_aggregate: { max: { promotion_price: 'desc_nulls_last' } } },
        { name: 'asc' },
      ];

    await fetchProduct({ variables: { filter, order_by, offset: (Number(page) - 1) * pageSize } });
  }, [fetchProduct, query]);

  useEffect(() => {
    onFilterProduct();
  }, [onFilterProduct]);

  return (
    <Wrapper>
      <ProductExploreBanner />
      <Container>
        {width && width <= 920 && <FilterPanelMobile options={['price', 'product-category', 'style']} />}
        {width && width > 920 && categories && <ProductExploreFilterPanel categories={categories} />}
        {width && width > 920 && categories && !isArrayEmpty(Object.keys(removeEmptyObject(query))) && (
          <ProductExploreFilterApply categories={categories} />
        )}
        <RenderResult loading={loading} products={products} />
        {total > pageSize && (
          <Pagination
            style={{ paddingBottom: 40, textAlign: 'center' }}
            total={total}
            pageSize={pageSize}
            current={query.page ? Number(query.page) : 1}
            onChange={onChangePage}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default ProductExploreContainer;

const RenderResult = ({ loading, products }: { loading: boolean; products: ProductType[] }) => {
  if (loading)
    return (
      <Spin>
        <div style={{ height: 400 }} />
      </Spin>
    );
  else if (isArrayEmpty(products))
    return <ResultFragment title='Không tìm thấy sản phẩm phù hợp với lựa chọn của bạn' />;

  return (
    <ProductList>
      {products.map((prod) => (
        <ProductCard key={prod.id} data={prod} />
      ))}
    </ProductList>
  );
};
