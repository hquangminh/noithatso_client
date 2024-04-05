import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import UserAgreementContainer from 'containers/HelpCenter/UserAgreement';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Thỏa thuận người dùng' />
      <UserAgreementContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
