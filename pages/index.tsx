import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';
import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetSeoPage } from 'graphql/seo/query';
import { API_GetHomePage } from 'graphql/homepage/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import HomePageContainer from 'containers/HomePage';

import { PageProps, SeoData } from 'interface/Global';
import { HomePageType } from 'interface/HomePage';
import { MenuKey } from 'interface/Layout';

const Index = (props: PageProps & { homepageData: HomePageType }) => {
  return (
    <Fragment>
      <HeadSeo
        name='Mua Sắm Nội Thất Thông Minh với Chất Lượng Hàng Đầu'
        title={props.seoData?.title}
        descriptions={props.seoData?.description}
        image={props.seoData?.image}
        keywords={props.seoData?.keyword}
      />
      <HomePageContainer data={props.homepageData} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const seoPage = await graphqlClient.request<{ seo_page: SeoData[] }>(API_GetSeoPage, { page: 'index' });
  const dataHomePage = await graphqlClient.request<HomePageType>(API_GetHomePage);

  return { props: { seoData: seoPage.seo_page[0] || null, homepageData: dataHomePage } };
};

export default withApollo(withLayout(Index, { header: { menuActive: MenuKey.HOMEPAGE } }));
