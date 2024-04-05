import { ReactNode } from 'react';

import { styled } from 'styled-components';
import { Col, Row } from 'antd';

import * as MyIcon from 'components/Fragments/Icons';

import { Container, maxMedia } from 'lib/styles';

const OutstandingService = styled.section`
  .list-service {
    ${maxMedia.small} {
      margin: 0 -15px;
    }

    .ant-col {
      display: flex;
      justify-content: center;
    }
  }
`;
const ServiceItem = styled.div`
  max-width: 228px;
  .service-item-icon .anticon {
    font-size: 40px;
  }
  h5 {
    margin: 12px 0 4px;
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.black};
    ${maxMedia.xsmall} {
      margin: 8px 0 2px;
      font-size: 14px;
    }
  }
  p {
    margin-bottom: 0;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
    ${maxMedia.xsmall} {
      font-size: 14px;
    }
  }
`;

const OutstandingServiceContainer = () => {
  return (
    <OutstandingService>
      <Container>
        <Row gutter={[32, 24]} className='list-service'>
          {services.map(({ name, caption, icon }, index) => (
            <Col span={12} lg={6} key={index}>
              <ServiceItem>
                <div className='service-item-icon'>{icon}</div>
                <h5>{name}</h5>
                <p>{caption}</p>
              </ServiceItem>
            </Col>
          ))}
        </Row>
      </Container>
    </OutstandingService>
  );
};

export default OutstandingServiceContainer;

const services: { name: string; caption: string; icon: ReactNode }[] = [
  {
    name: 'Miễn phí giao hàng',
    caption: 'Tùy vào từng sản phẩm trên đơn hàng',
    icon: <MyIcon.DeliveryOutlineIcon />,
  },
  {
    name: 'Đổi hàng 1-1',
    caption: 'Khi lỗi sản xuất hoặc khi vận chuyển',
    icon: <MyIcon.ShieldCheckOutlineIcon />,
  },
  {
    name: 'Hỗ trợ cao cấp',
    caption: 'Hỗ trợ qua điện thoại và email',
    icon: <MyIcon.HeadphoneOutlineIcon />,
  },
  {
    name: 'Thanh toán',
    caption: 'Cho bên vận chuyển khi nhận được hàng',
    icon: <MyIcon.DollarCoinOutlineIcon />,
  },
];
