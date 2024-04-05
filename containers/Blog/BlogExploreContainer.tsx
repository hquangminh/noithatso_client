import { useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';
import { Col, Pagination, Row, Spin } from 'antd';

import { isArrayEmpty } from 'functions';
import { API_GetBlog } from 'graphql/blog/query';

import ResultFragment from 'components/Fragments/Result';
import BlogBannerSearch from 'components/Pages/Blog/BlogBannerSearch';
import BlogCategoryFilter from 'components/Pages/Blog/BlogCategoryFilter';
import BlogCard from 'components/Pages/Blog/BlogCard';

import { BlogCategory, BlogType } from 'interface/Blog';

import { Container } from 'lib/styles';

const BlogExplore = styled.div`
  padding-bottom: 56px;
`;

const pageSize = 16;

type Props = { categories: BlogCategory[] };
type QueryResponse = { blog: BlogType[]; blog_aggregate: { aggregate: { count: number } } };

const BlogExploreContainer = ({ categories }: Props) => {
  const { query, replace } = useRouter();

  const [blogs, setBlog] = useState<{ list: BlogType[]; total: number }>();

  const { loading } = useQuery<QueryResponse>(API_GetBlog, {
    variables: {
      title: query.keyword?.toString().trim()
        ? `%${query.keyword.toString().trim().replace(/\s+/g, ' ')}%`
        : undefined,
      category: query.category !== 'all' ? { _eq: query.category?.toString().split('--')[1] } : undefined,
      offset: query.page ? (parseInt(query.page.toString()) - 1) * pageSize : 0,
      limit: pageSize,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ blog, blog_aggregate }) => {
      if (blog.length === 0 && query.page && query.page !== '1') onChangePage(1);
      else setBlog({ list: blog, total: blog_aggregate.aggregate.count });
    },
  });

  const onChangePage = (page: number) => {
    replace({ query: { ...query, page } }, undefined, { shallow: true });

    const banner = document.getElementById('blog-explore-banner');
    if (banner) window.scrollTo({ top: banner.clientHeight, behavior: 'smooth' });
  };

  return (
    <BlogExplore>
      <BlogBannerSearch />
      <BlogCategoryFilter categories={categories} />
      <Container>
        {loading && (
          <Spin>
            <div style={{ minHeight: 200 }} />
          </Spin>
        )}
        {!loading && !isArrayEmpty(blogs?.list) && (
          <Row gutter={[24, 24]}>
            {blogs?.list.map((article) => (
              <Col sm={12} lg={6} key={article.id}>
                <BlogCard data={article} />
              </Col>
            ))}
          </Row>
        )}
        {!loading && isArrayEmpty(blogs?.list) && (
          <ResultFragment title='Không tìm thấy bài viết phù hợp với lựa chọn của bạn' />
        )}
        {blogs && blogs?.total > pageSize && (
          <Pagination
            style={{ paddingTop: 56, textAlign: 'center' }}
            current={query.page ? parseInt(query.page.toString()) : 1}
            total={blogs.total}
            pageSize={pageSize}
            onChange={onChangePage}
          />
        )}
      </Container>
    </BlogExplore>
  );
};

export default BlogExploreContainer;
