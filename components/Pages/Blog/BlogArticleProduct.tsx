import { styled } from 'styled-components';

import ProductCard from 'components/Pages/Product/ProductCard';

import { BlogProducts } from 'interface/Blog';

import { maxMedia } from 'lib/styles';

const Wrapper = styled.section`
  margin-top: 40px;
`;
const TitleSection = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
`;
const ProductList = styled.div`
  margin-top: 16px;
  min-height: 200px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
  ${maxMedia.small} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${maxMedia.xsmall} {
    display: flex;
    column-gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
    & > div {
      flex: 0 0 156px;
      scroll-snap-align: start;
    }
  }
`;

type Props = { products: BlogProducts };

const BlogArticleProduct = ({ products }: Props) => {
  return (
    <Wrapper>
      <TitleSection>Sản phẩm được đề cập</TitleSection>
      <ProductList>
        {products?.map(({ product }) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </ProductList>
    </Wrapper>
  );
};

export default BlogArticleProduct;
