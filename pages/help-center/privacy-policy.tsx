import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import PrivacyPolicyContainer from 'containers/HelpCenter/PrivacyPolicy';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Chính sách bảo mật' />
      <PrivacyPolicyContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
