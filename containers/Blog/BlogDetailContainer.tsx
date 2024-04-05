import { styled } from 'styled-components';

import { isArrayEmpty } from 'functions';

import BlogArticleHeader from 'components/Pages/Blog/BlogArticleHeader';
import BlogArticleContent from 'components/Pages/Blog/BlogArticleContent';
import BlogArticleRelate from 'components/Pages/Blog/BlogArticleRelate';
import BlogArticleProduct from 'components/Pages/Blog/BlogArticleProduct';

import { BlogDetail, BlogType } from 'interface/Blog';

import { Container, maxMedia } from 'lib/styles';

const BlogPage = styled.div`
  padding-bottom: 52px;
  overflow-x: hidden;
`;
const BlogLayout = styled.div<{ $isColumn: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isColumn }) => ($isColumn ? 'calc(100% - 318px - 40px) 318px' : '100%')};
  gap: 48px 40px;
  ${maxMedia.medium} {
    grid-template-columns: 100%;
  }
`;
const BlogArticle = styled.article``;

type Props = { blog: BlogDetail; relate?: BlogType[] };

const BlogDetailContainer = ({ blog, relate }: Props) => {
  const isHaveRelate = relate && !isArrayEmpty(relate);

  return (
    <BlogPage>
      <Container>
        <BlogLayout $isColumn={isHaveRelate || false}>
          <BlogArticle>
            <BlogArticleHeader
              title={blog.title}
              summary={blog.summary}
              category={blog.blog_category}
              createdAt={blog.publish_date}
            />
            <BlogArticleContent content={blog.content} />
          </BlogArticle>
          {isHaveRelate && <BlogArticleRelate blogs={relate} />}
        </BlogLayout>
        {blog.blog_products && blog.blog_products.length > 0 && (
          <BlogArticleProduct products={blog.blog_products} />
        )}
      </Container>
    </BlogPage>
  );
};

export default BlogDetailContainer;
