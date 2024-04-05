import styled from 'styled-components';

import { OrderDelivery as OderDeliveryType } from 'interface/Order';

import { minMedia } from 'lib/styles';

const DeliveryWrapper = styled.div`
  ${minMedia.small} {
    border: 1px solid #e3e3e8;
  }
`;
const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};

  ${minMedia.small} {
    padding: 13px 24px;
    background-color: #f4f5f8;
  }
`;
const Content = styled.div`
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  span {
    font-weight: normal;
  }
  p {
    margin-bottom: 8px;
  }
  p:last-child {
    margin-block-end: 0px;
  }

  ${minMedia.small} {
    margin-bottom: 12px;
    padding: 12px 24px;
    font-size: 16px;
  }
`;

type Props = { data: OderDeliveryType };

const OrderDelivery = ({ data }: Props) => {
  return (
    <DeliveryWrapper>
      <Header>Địa chỉ nhận hàng</Header>
      <Content>
        <p>
          {data.name}
          <br />
          {data.phone}
        </p>
        <p>
          {data.street}, {data.ward}, {data.district}, {data.city}
        </p>
        <p>
          <span>Ghi chú đơn hàng:</span>
          <br />
          {data.note}
        </p>
      </Content>
    </DeliveryWrapper>
  );
};

export default OrderDelivery;
