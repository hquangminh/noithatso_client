import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled } from 'styled-components';

import { useWindowSize } from 'lib/hooks';
import { convertToSlug } from 'functions';

import { BlogType } from 'interface/Blog';

import { TextLineClamp } from 'lib/styles';

const Wrapper = styled.div``;
const BlogImage = styled.div`
  position: relative;
  margin-bottom: 8px;
  img {
    width: 100%;
    aspect-ratio: 1.34;
    object-fit: cover;
  }
`;
const BlogCategory = styled.div`
  position: absolute;
  left: 12px;
  top: 12px;

  padding: 5px 10px;
  margin-bottom: 0;

  font-size: 12px;
  font-weight: 500;

  color: ${({ theme }) => theme.palette.common.white};
  background-color: rgba(24, 24, 24, 0.71);

  cursor: pointer;
`;
const BlogName = styled(TextLineClamp)`
  margin: 12px 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
  a,
  a:hover {
    color: currentColor;
  }
`;
const BlogSummary = styled(TextLineClamp)`
  margin-bottom: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
`;

type BlogCardProps = { data: BlogType };

const BlogCard = ({ data }: BlogCardProps) => {
  const { push, pathname } = useRouter();
  const [screenWidth] = useWindowSize();

  const category = data.blog_category;
  const linkToDetail = `/bai-viet/${convertToSlug(category.name)}/${convertToSlug(data.title)}--${data.id}`;

  const goToCategory = () => {
    if (pathname === '/bai-viet/[category]')
      push({ query: { category: convertToSlug(category.name) + '--' + category.id } }, undefined, {
        shallow: true,
      });
    else push('/bai-viet/' + convertToSlug(category.name) + '--' + category.id);
  };

  return (
    <Wrapper>
      <BlogImage>
        <Link href={linkToDetail} aria-label={`Xem đầy đủ nội dung của bài viết ${data.title}`}>
          <img src={data.image} alt='' loading='lazy' />
        </Link>

        {!(screenWidth && screenWidth <= 991 && pathname === '/search') && (
          <BlogCategory onClick={goToCategory}>{data.blog_category.name}</BlogCategory>
        )}
      </BlogImage>
      <BlogName line={2} title={data.title}>
        <Link href={linkToDetail}>{data.title}</Link>
      </BlogName>
      <BlogSummary line={3}>{data.summary}</BlogSummary>
    </Wrapper>
  );
};

export default BlogCard;
