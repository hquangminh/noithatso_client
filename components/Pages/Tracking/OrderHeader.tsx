import styled from 'styled-components';

import { OrderStatus } from 'lib/constants';

import { OrderStatusEnum } from 'interface/Order';

import { maxMedia } from 'lib/styles';

const HeaderWrapper = styled.div`
  grid-area: header;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  row-gap: 4px;

  padding: 17px 24px;
  font-size: 16px;
  font-weight: 600;
  background-color: #f4f5f8;

  ${maxMedia.small} {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 16px;
    font-size: 14px;
  }
`;
const OrderCode = styled.p`
  margin-bottom: 0;
  color: ${({ theme }) => theme.palette.common.black};
`;
const OrderStatusTitle = styled.div`
  color: #1890ff;
`;

type Props = { orderNo: string; status: OrderStatusEnum };

const OrderHeader = ({ orderNo, status }: Props) => {
  return (
    <HeaderWrapper>
      <OrderCode>Mã đơn hàng: {orderNo}</OrderCode>
      <OrderStatusTitle>{OrderStatus[status]}</OrderStatusTitle>
    </HeaderWrapper>
  );
};

export default OrderHeader;
