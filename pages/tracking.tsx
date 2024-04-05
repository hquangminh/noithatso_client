import { Fragment } from 'react';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import HeadSeo from 'components/Fragments/HeadSeo';
import TrackingContainer from 'containers/Tracking/TrackingContainer';

import { MenuKey } from 'interface/Layout';

const Index = () => {
  return (
    <Fragment>
      <HeadSeo name='Kiểm tra đơn hàng' title='Kiểm tra đơn hàng'>
        <meta name='robots' content='noindex' />
      </HeadSeo>
      <TrackingContainer />
    </Fragment>
  );
};

export default withApollo(withLayout(Index, { header: { menuActive: MenuKey.ORDER_TRACKING } }));
