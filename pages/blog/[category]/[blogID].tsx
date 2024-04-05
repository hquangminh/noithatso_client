import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetBlogDetail, APT_GetBlogRelate } from 'graphql/blog/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import BlogDetailContainer from 'containers/Blog/BlogDetailContainer';

import { BlogDetail, BlogType, GqlBlog } from 'interface/Blog';

type Props = { blog: BlogDetail; relate?: BlogType[] };

const Index = ({ blog, relate }: Props) => {
  return (
    <Fragment>
      <HeadSeo
        name={blog.title}
        title={blog.seo_title}
        image={blog.image}
        descriptions={blog.seo_description ?? blog.summary}
        type='article'
        twitter_card='summary_large_image'
      />
      <BlogDetailContainer blog={blog} relate={relate} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const blogData = await graphqlClient.request<GqlBlog>(API_GetBlogDetail, {
    id: content.query.blogID?.toString().split('--')[1],
  });

  if (!blogData.blog[0]) return { notFound: true };

  const blogRelate = await graphqlClient.request<GqlBlog>(APT_GetBlogRelate, {
    blogID: blogData.blog[0]?.id,
    categoryID: blogData.blog[0]?.blog_category.id,
  });

  return { props: { blog: blogData.blog[0], relate: blogRelate.blog } };
};

export default withApollo(withLayout(Index));
