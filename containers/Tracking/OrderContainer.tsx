import styled from 'styled-components';

import OrderHeader from 'components/Pages/Tracking/OrderHeader';
import OrderProductList from 'components/Pages/Tracking/OrderProductList';
import OrderLogs from 'components/Pages/Tracking/OrderLogs';
import OrderDelivery from 'components/Pages/Tracking/OrderDelivery';

import { OrderDetail } from 'interface/Order';

import { maxMedia } from 'lib/styles';

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  grid-template-areas:
    'header header'
    'product summary';
  grid-gap: 14px 16px;
  padding-bottom: 40px;

  ${maxMedia.medium} {
    grid-template-columns: 100%;
    grid-template-areas:
      'header'
      'summary'
      'product';
    grid-row-gap: 16px;
  }
`;
const OrderSummary = styled.div`
  grid-area: summary;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${maxMedia.medium} {
    gap: 16px;
  }
`;

type Props = { data: OrderDetail };

const OrderContainer = ({ data }: Props) => {
  return (
    <OrderGrid>
      <OrderHeader orderNo={data.order_no} status={data.status} />
      <OrderProductList amount={data.amount} products={data.order_products} />
      <OrderSummary>
        <OrderLogs data={data.order_logs} />
        <OrderDelivery data={data.order_delivery} />
      </OrderSummary>
    </OrderGrid>
  );
};

export default OrderContainer;
