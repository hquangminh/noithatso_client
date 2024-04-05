import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import ObligationsAndPoliciesContainer from 'containers/HelpCenter/ObligationsAndPolicies';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Quy định về nghĩa vụ và chính sách chung' />
      <ObligationsAndPoliciesContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
