import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';
import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetSeoPage } from 'graphql/seo/query';
import { API_GetBlogCategory } from 'graphql/blog/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import BlogExploreContainer from 'containers/Blog/BlogExploreContainer';

import { PageProps, SeoData } from 'interface/Global';
import { MenuKey } from 'interface/Layout';
import { BlogCategory, GqlBlogCategory } from 'interface/Blog';

type Props = PageProps & { categories: BlogCategory[] };

const Index = ({ seoData, categories }: Props) => {
  return (
    <Fragment>
      <HeadSeo
        name='Bài viết'
        title={seoData?.title}
        image={seoData?.image}
        descriptions={seoData?.description}
        keywords={seoData?.keyword}
      />
      <BlogExploreContainer categories={categories} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const seoPage = await graphqlClient.request<{ seo_page: SeoData[] }>(API_GetSeoPage, { page: 'blog' });
  const categories = await graphqlClient.request<GqlBlogCategory>(API_GetBlogCategory);

  return { props: { seoData: seoPage.seo_page[0] || null, categories: categories.blog_category } };
};

export default withApollo(withLayout(Index, { header: { menuActive: MenuKey.BLOG } }));
