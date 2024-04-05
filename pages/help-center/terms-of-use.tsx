import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import TermsOfUseContainer from 'containers/HelpCenter/TermsOfUse';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Điều khoản sử dụng' />
      <TermsOfUseContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
