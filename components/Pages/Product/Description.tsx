import { styled } from 'styled-components';
import BlogArticleContent from '../Blog/BlogArticleContent';

const Wrapper = styled.div`
  margin-top: 40px;
`;
const Title = styled.h5`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
`;

const ProductDescription = ({ content }: { content: string }) => {
  return (
    <Wrapper>
      <Title>Mô tả sản phẩm</Title>
      <BlogArticleContent content={content} />
    </Wrapper>
  );
};

export default ProductDescription;
