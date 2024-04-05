import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled, useTheme } from 'styled-components';
import { Breadcrumb, ConfigProvider, Input } from 'antd';

import { useDebounce } from 'lib/hooks';
import { removeEmptyObject, removeSpaceString } from 'functions';

import { SearchSmallOutlinedIcon } from 'components/Fragments/Icons';

import { Container, maxMedia } from 'lib/styles';

const Wrapper = styled.div`
  padding: 153px 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/static/images/blog-explore-banner.webp') center no-repeat;
  background-size: cover;
  text-align: center;
  .ant-breadcrumb ol {
    justify-content: center;
  }
  .ant-input-affix-wrapper {
    padding: 10.5px 16px;
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
const Box = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 440px;
`;
const Title = styled.h1`
  margin: 16px 0 24px;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.white};
  ${maxMedia.custom(1024)} {
    font-size: 40px;
  }
  ${maxMedia.medium} {
    font-size: 32px;
  }
  ${maxMedia.xsmall} {
    font-size: 24px;
  }
`;

const ProductExploreBanner = () => {
  const router = useRouter();
  const theme = useTheme();

  const [keywords, setKeywords] = useState<string>();
  const keywordDebounce = useDebounce<string | undefined>(keywords, 500);

  useEffect(() => {
    if (router.query.name !== keywords) setKeywords(router.query.name?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.name]);

  const onChangeQuerySearch = useCallback(() => {
    if (typeof keywordDebounce !== 'undefined') {
      let query = removeEmptyObject({ ...router.query, name: removeSpaceString(keywordDebounce) });
      router.replace({ query }, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordDebounce]);

  useEffect(() => {
    onChangeQuerySearch();
  }, [onChangeQuerySearch]);

  const colorWhite = theme?.palette.common.white;

  return (
    <Wrapper id='product-explore-banner'>
      <Container>
        <Box>
          <ConfigProvider
            theme={{
              token: { colorText: colorWhite, colorTextDescription: colorWhite },
              components: { Breadcrumb: { linkColor: '#ffffff80', separatorColor: colorWhite } },
            }}
          >
            <Breadcrumb
              separator='>'
              items={[{ title: <Link href='/'>Trang chủ</Link> }, { title: 'Sản phẩm' }]}
            />
          </ConfigProvider>
          <Title>Tất cả sản phẩm</Title>
          <ConfigProvider theme={{ token: { borderRadius: 0, fontSizeLG: 14 } }}>
            <Input
              value={keywords ?? router.query.name}
              size='large'
              prefix={<SearchSmallOutlinedIcon />}
              placeholder='Tìm kiếm sản phẩm'
              onChange={(e) => setKeywords(e.target.value)}
            />
          </ConfigProvider>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default ProductExploreBanner;
