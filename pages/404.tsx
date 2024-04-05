import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { styled } from 'styled-components';
import { Button, Result } from 'antd';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Index = () => (
  <Fragment>
    <Head>
      <title>Trang bạn truy cập không tồn tại.</title>
    </Head>
    <Wrapper>
      <Result
        status='404'
        title='404'
        subTitle='Trang bạn truy cập không tồn tại.'
        extra={
          <Button type='primary'>
            <Link href='/'>Quay về Trang chủ</Link>
          </Button>
        }
      />
    </Wrapper>
  </Fragment>
);

export default Index;
