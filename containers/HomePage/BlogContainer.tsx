import Link from 'next/link';

import { styled } from 'styled-components';
import { Button, Col, Row } from 'antd';

import { useWindowSize } from 'lib/hooks';

import SectionContent from 'components/Pages/HomePage/SectionContent';
import BlogCard from 'components/Pages/Blog/BlogCard';

import { BlogType } from 'interface/Blog';

import { maxMedia } from 'lib/styles';

const BlogList = styled.div`
  margin-top: 40px;
  ${maxMedia.medium} {
    .ant-row {
      margin-inline: 0 !important;
      column-gap: 16px;
      flex-flow: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      &::-webkit-scrollbar {
        display: none;
      }
      & > .ant-col {
        padding-inline: 0 !important;
        scroll-snap-align: start;
      }
    }
  }
`;
const ButtonSeeAll = styled.div`
  margin-top: 40px;
  text-align: center;
  .ant-btn {
    height: 44px;
    padding: 2px 32px;
    font-size: 12px;
    line-height: 1;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.black};
    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.palette.common.black};
    border-radius: 0;
  }
`;

type Props = { data: BlogType[] };

const BlogContainer = ({ data }: Props) => {
  const [screenW] = useWindowSize();

  const isMobile = typeof screenW === 'number' && screenW < 992;

  return (
    <SectionContent title='Bài viết mới nhất'>
      <BlogList>
        <Row gutter={[16, 0]}>
          {data.map((item) => (
            <Col flex={isMobile ? '327px' : undefined} lg={6} key={item.id}>
              <BlogCard data={item} />
            </Col>
          ))}
        </Row>
      </BlogList>
      <ButtonSeeAll>
        <Button>
          <Link href='/bai-viet/tat-ca'>XEM TẤT CẢ</Link>
        </Button>
      </ButtonSeeAll>
    </SectionContent>
  );
};

export default BlogContainer;
