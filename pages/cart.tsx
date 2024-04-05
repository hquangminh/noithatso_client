import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import CartContainer from 'containers/Cart/CartContainer';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Giỏ hàng'>
        <meta name='robots' content='noindex' />
      </HeadSeo>
      <CartContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
