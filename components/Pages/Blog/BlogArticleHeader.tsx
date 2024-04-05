import Link from 'next/link';

import dayjs from 'dayjs';
import { styled } from 'styled-components';
import { Divider, Space } from 'antd';

import { convertToSlug } from 'functions';

import { maxMedia } from 'lib/styles';

const Wrapper = styled.section`
  padding: 40px 0 32px;
  ${maxMedia.small} {
    padding: 24px 0 12px;
  }
  .blog-article {
    &-title {
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;
      color: ${({ theme }) => theme.palette.common.black};
      ${maxMedia.small} {
        font-size: 20px;
      }
    }
    &-summary {
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 500;
      text-align: justify;
      color: ${({ theme }) => theme.textColor};
    }
    &-category {
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.primary.main};
      a,
      a:hover {
        color: currentColor;
      }
    }
  }
  .ant-space {
    align-items: start;
    .ant-space-item:has(time) {
      flex: none;
    }
  }
`;

type Props = { title: string; summary: string; createdAt: string; category: { id: number; name: string } };

const BlogArticleHeader = ({ title, summary, createdAt, category }: Props) => {
  return (
    <Wrapper>
      <h1 className='blog-article-title'>{title}</h1>
      <p className='blog-article-summary'>{summary}</p>
      <Space split={<Divider type='vertical' />}>
        <p className='blog-article-category'>
          <Link href={`/bai-viet/${convertToSlug(category.name)}--${category.id}`}>{category.name}</Link>
        </p>
        <time dateTime={dayjs(createdAt).format('DD/MM/YYYY')}>{dayjs(createdAt).format('DD/MM/YYYY')}</time>
      </Space>
    </Wrapper>
  );
};

export default BlogArticleHeader;
