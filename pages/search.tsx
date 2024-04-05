import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import SearchContainer from 'containers/Search/SearchPage';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Tìm kiếm' />
      <SearchContainer />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  return { props: {} };
};

export default withApollo(withLayout(Index));
