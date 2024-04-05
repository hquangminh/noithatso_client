import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { ConfigProvider, Input } from 'antd';

import { useDebounce } from 'lib/hooks';
import { removeEmptyObject } from 'functions';

import { SearchSmallOutlinedIcon } from 'components/Fragments/Icons';

import { Container, maxMedia } from 'lib/styles';

const BlogBanner = styled.section`
  padding: 150px 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/static/images/blog-explore-banner.webp') center no-repeat;
  background-size: cover;
  text-align: center;

  .ant-input-affix-wrapper {
    padding: 10.5px 16px;
    max-width: 440px;
    .ant-input-prefix {
      margin-right: 10px;
      font-size: 18px;
    }
    .ant-input {
      font-weight: 500;
      &::placeholder {
        color: #94949c;
      }
    }
  }

  ${maxMedia.custom(1024)} {
    padding-block: 100px;
  }
  ${maxMedia.medium} {
    padding-block: 46px;
  }
  ${maxMedia.xsmall} {
    padding-block: 50px;
  }
`;
const Title = styled.h1`
  max-width: 740px;
  margin: 0 auto 24px;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
  color: ${({ theme }) => theme.palette.common.white};
  ${maxMedia.custom(1024)} {
    font-size: 40px;
  }
  ${maxMedia.medium} {
    font-size: 32px;
  }
  ${maxMedia.small} {
    font-size: 24px;
    line-height: 1.35;
    br {
      display: none;
    }
  }
`;

const BlogBannerSearch = () => {
  const router = useRouter();

  const [keywords, setKeywords] = useState<string | undefined>(router.query.keyword?.toString());
  const keywordDebounce = useDebounce<string | undefined>(keywords, 500);

  const onChangeQuerySearch = useCallback(() => {
    if (typeof keywordDebounce !== 'undefined') {
      let query = removeEmptyObject({ ...router.query, keyword: keywordDebounce.trim() || undefined });
      router.replace({ query }, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordDebounce]);

  useEffect(() => {
    onChangeQuerySearch();
  }, [onChangeQuerySearch]);

  return (
    <BlogBanner id='blog-explore-banner'>
      <Container>
        <Title>
          Cẩm nang cập nhật mẹo vặt,
          <br /> xu hướng nội thất
        </Title>
        <ConfigProvider theme={{ token: { borderRadius: 0, fontSizeLG: 14 } }}>
          <Input
            value={keywords}
            size='large'
            prefix={<SearchSmallOutlinedIcon />}
            placeholder='Tìm kiếm bài viết'
            onChange={(e) => setKeywords(e.target.value)}
          />
        </ConfigProvider>
      </Container>
    </BlogBanner>
  );
};

export default BlogBannerSearch;
