import { styled } from 'styled-components';
import { Col, Row } from 'antd';

import BlogCard from './BlogCard';

import { BlogType } from 'interface/Blog';

import { maxMedia } from 'lib/styles';

const BlogRelate = styled.div`
  padding-block-start: 40px;
  .blog-article-relate-title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.black};
  }

  ${maxMedia.xsmall} {
    padding-block-start: 0;
    .ant-row {
      flex-flow: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      &::-webkit-scrollbar {
        display: none;
      }
      & > .ant-col {
        flex: 0 0 327px;
        max-width: 100%;
        scroll-snap-align: start;
      }
      &:not(:has(.ant-col:nth-child(2))) .ant-col {
        flex: 0 0 100%;
      }
    }
  }
`;

type Props = { blogs: BlogType[] };

const BlogArticleRelate = ({ blogs }: Props) => {
  return (
    <BlogRelate>
      <h2 className='blog-article-relate-title'>Bài viết liên quan</h2>
      <Row gutter={[16, 32]}>
        {blogs.map((item) => (
          <Col key={item.id} xs={12} sm={8} lg={24}>
            <BlogCard data={item} />
          </Col>
        ))}
      </Row>
    </BlogRelate>
  );
};

export default BlogArticleRelate;
