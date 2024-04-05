import Link from 'next/link';

import { styled } from 'styled-components';
import { Breadcrumb } from 'antd';

import ProductInformationComponent from 'components/Pages/Product/Information';
import ProductRelate from 'components/Pages/Product/Relate';

import { ProductDetail } from 'interface/Product';

import { Container, maxMedia } from 'lib/styles';
import ProductDescription from 'components/Pages/Product/Description';

const ProductDetail_Wrapper = styled.div`
  padding: 40px 0;

  ${maxMedia.small} {
    padding: 24px 0 40px;
  }
`;

type Props = { data: ProductDetail };

const ProductDetailContainer = ({ data }: Props) => {
  return (
    <ProductDetail_Wrapper>
      <Container>
        <Breadcrumb
          separator='>'
          items={[
            { title: <Link href='/'>Trang chủ</Link> },
            { title: <Link href='/san-pham'>Sản phẩm</Link> },
            { title: data.name },
          ]}
        />
        <ProductInformationComponent data={data} />
        <ProductDescription content={data.description ?? 'Không có mô tả'} />
        <ProductRelate
          productID={data.id}
          categoriesID={data.product_category_relations.map((i) => i.category_id)}
        />
      </Container>
    </ProductDetail_Wrapper>
  );
};

export default ProductDetailContainer;
