import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import CheckoutContainer from 'containers/Checkout/CheckoutContainer';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Mua hàng'>
        <meta name='robots' content='noindex' />
      </HeadSeo>
      <CheckoutContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
