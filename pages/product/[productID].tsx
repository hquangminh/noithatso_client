import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import { removeHtmlTag } from 'functions';
import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetProductDetail } from 'graphql/product/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import ProductDetailContainer from 'containers/Product/ProductDetailContainer';

import { GqlProduct, ProductDetail } from 'interface/Product';

type Props = { product: ProductDetail };

const Index = ({ product }: Props) => {
  return (
    <Fragment>
      <HeadSeo
        name={product.name}
        image={product.image}
        descriptions={removeHtmlTag(
          product.description ??
            'Trải nghiệm ngay sản phẩm với chế độ xem AR tại Nội Thất Số. Giờ đây chỉ cần một chiếc Smart Phone bạn đã có thể xem trực tiếp sản phẩm trong không gian thực tế chỉ bằng một cú chạm.',
        )}
        twitter_card='summary_large_image'
      >
        <meta property='product:price:amount' content={product.product_variations.at(0)?.price.toString()} />
        <meta property='product:price:currency' content='VND' />
      </HeadSeo>
      <ProductDetailContainer data={product} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const productData = await graphqlClient.request<GqlProduct>(API_GetProductDetail, {
    id: content.query.productID?.toString().split('--')[1],
  });

  if (!productData.product[0]) return { notFound: true };

  return { props: { product: productData.product[0] } };
};

export default withApollo(withLayout(Index));
