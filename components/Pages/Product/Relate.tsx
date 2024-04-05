import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';

import { isArrayEmpty } from 'functions';
import { API_GetProductRelate } from 'graphql/product/query';

import ProductCard from './ProductCard';

import { ProductType } from 'interface/Product';

import { maxMedia } from 'lib/styles';

const Wrapper = styled.div`
  margin-top: 40px;
`;
const Title = styled.div`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
`;
const ProductList = styled.div`
  min-height: 200px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px 16px;
  ${maxMedia.small} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${maxMedia.xsmall} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${maxMedia.tiny} {
    grid-template-columns: 100%;
  }
`;

type Props = { productID: number; categoriesID: number[] };

const ProductRelate = ({ productID, categoriesID }: Props) => {
  const { data, loading, error } = useQuery<{ product: ProductType[] }>(API_GetProductRelate, {
    variables: { productID, categories: categoriesID.map((i) => ({ category_id: { _eq: i } })) },
  });

  if (loading || error || isArrayEmpty(data?.product)) return null;

  return (
    <Wrapper>
      <Title>Những sản phẩm tương tự</Title>
      <ProductList>
        {data?.product?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </ProductList>
    </Wrapper>
  );
};

export default ProductRelate;
