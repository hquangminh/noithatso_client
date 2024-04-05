import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import SalesMottoContainer from 'containers/HelpCenter/SalesMotto';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Phương châm bán hàng' />
      <SalesMottoContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
