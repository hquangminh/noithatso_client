import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { ConfigProvider, ThemeConfig, notification } from 'antd';

import orderServices from 'services/order-services';

import TrackingForm from 'components/Pages/Tracking/Form';
import OrderContainer from 'containers/Tracking/OrderContainer';

import { OrderDetail } from 'interface/Order';

import { Container, maxMedia } from 'lib/styles';

const Header = styled.h1`
  margin-bottom: 0;
  padding-block: 40px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.black};
  text-align: center;

  ${maxMedia.xsmall} {
    padding-block: 16px;
    font-size: 16px;
  }
`;
const NotificationWrapper = styled.div`
  .ant-notification {
    line-height: 1.4;
    font-weight: 500;
    ${maxMedia.small} {
      inset: 65px auto auto 50% !important;
    }
  }
`;

const TrackingContainer = () => {
  const router = useRouter();
  const [notificationAPI, notificationContext] = notification.useNotification({
    top: 74,
    placement: 'top',
    getContainer: () => notificationRef.current || document.body,
  });
  const [searching, setSearching] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderDetail | null>(null);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => setOrder(null));
    return () => router.events.off('routeChangeComplete', () => setOrder(null));
  }, [router]);

  const trackingNotFound = () =>
    notificationAPI.open({
      key: 'order-not-found',
      message: <strong style={{ fontWeight: 600 }}>Không tìm thấy đơn hàng</strong>,
      description: 'Vui lòng kiểm tra mã đơn hàng và thử lại.',
      closeIcon: null,
      style: { border: '1px solid #f1a815' },
    });

  const handelTracking = async (orderCode: string) => {
    setSearching(true);
    await orderServices
      .tracking(orderCode)
      .then(({ status, data }) => {
        if (status === 204) trackingNotFound();
        else setOrder(data);
      })
      .catch(() => setSearching(false));
    setSearching(false);
  };

  return (
    <Container>
      <NotificationWrapper ref={notificationRef}>
        <ConfigProvider theme={notificationTheme}>{notificationContext}</ConfigProvider>
      </NotificationWrapper>
      <Header>Kiểm tra đơn hàng</Header>
      {order && <OrderContainer data={order} />}
      {!order && <TrackingForm searching={searching} onSubmit={handelTracking} />}
    </Container>
  );
};

export default TrackingContainer;

const notificationTheme: ThemeConfig = {
  components: { Notification: {} },
  token: {
    paddingMD: 12,
    paddingContentHorizontalLG: 16,
    borderRadiusLG: 0,
    marginXS: 0,
    colorBgElevated: '#fff6e4',
    colorText: '#424153',
    boxShadow: 'none',
    lineHeight: 1.4,
  },
};
