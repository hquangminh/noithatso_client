import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';
import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetSeoPage } from 'graphql/seo/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import ProductExploreContainer from 'containers/Product/ProductExploreContainer';

import { PageProps, SeoData } from 'interface/Global';
import { MenuKey } from 'interface/Layout';

const Index = (props: PageProps) => {
  return (
    <Fragment>
      <HeadSeo
        name='Sản phẩm'
        title={props.seoData?.title}
        image={props.seoData?.image}
        descriptions={props.seoData?.description}
        keywords={props.seoData?.keyword}
      />
      <ProductExploreContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const seoPage = await graphqlClient.request<{ seo_page: SeoData[] }>(API_GetSeoPage, { page: 'product' });

  return { props: { seoData: seoPage.seo_page[0] || null } };
};

export default withApollo(withLayout(Index, { header: { menuActive: MenuKey.PRODUCT } }));
