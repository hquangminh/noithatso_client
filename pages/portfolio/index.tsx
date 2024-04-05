import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';
import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetSeoPage } from 'graphql/seo/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import PortfolioListContainer from 'containers/Portfolio/PortfolioListContainer';

import { PageProps, SeoData } from 'interface/Global';
import { MenuKey } from 'interface/Layout';

const Index = (props: PageProps) => {
  return (
    <Fragment>
      <HeadSeo
        name='Ý tưởng thiết kế'
        title={props.seoData?.title}
        image={props.seoData?.image}
        descriptions={props.seoData?.description}
        keywords={props.seoData?.keyword}
      />
      <PortfolioListContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const seoPage = await graphqlClient.request<{ seo_page: SeoData[] }>(API_GetSeoPage, { page: 'portfolio' });

  return { props: { seoData: seoPage.seo_page[0] || null } };
};

export default withApollo(withLayout(Index, { header: { menuActive: MenuKey.PORTFOLIO } }));
