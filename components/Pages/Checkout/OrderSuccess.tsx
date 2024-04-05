import Link from 'next/link';

import { styled } from 'styled-components';
import { Button, ConfigProvider, Modal, ModalProps, Typography } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

import { CheckoutSuccessIcon, CopyOutlineIcon } from 'components/Fragments/Icons';

import { OrderDetail } from 'interface/Order';

import { maxMedia } from 'lib/styles';

const Icon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 120px;
  margin-bottom: 16px;
  ${maxMedia.small} {
    font-size: 64px;
  }
`;
const Title = styled.div`
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.common.black};
  text-align: center;
  ${maxMedia.small} {
    font-size: 14px;
  }
`;
const SubTitle = styled.p`
  margin-bottom: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  span {
    font-size: 16px;
    font-weight: 600;
  }

  ${maxMedia.small} {
    font-size: 14px;
  }
`;
const BackHomeButton = styled.div`
  margin-top: 24px;
  text-align: center;
  .ant-btn {
    font-weight: 500;
    text-transform: uppercase;
  }

  ${maxMedia.xsmall} {
    margin-top: 16px;
    .ant-btn {
      width: 100%;
    }
  }
`;
const ShippingInfo = styled.div`
  margin-top: 16px;
  font-size: 16px;
  border: solid 1px #e3e3e8;
  & > div:first-child {
    padding: 12px 16px;
    font-size: inherit;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.black};
    background-color: #f6f7f8;
  }
  & > div:last-child {
    padding: 8px 16px;
    p {
      margin-bottom: 0;
      font-weight: 500;
      color: ${({ theme }) => theme.textColor};
      &:not(:last-child) {
        margin-bottom: 16px;
      }
      & > span {
        font-size: inherit;
        font-weight: 600;
        color: inherit;
      }
      .ant-typography:has(.ant-typography-copy) {
        display: inline-flex;
        align-items: center;
        line-height: 1.4;
        .ant-typography-copy {
          font-size: 20px;
          color: #acacba;
        }
      }
    }
  }

  ${maxMedia.small} {
    font-size: 14px;
    & > div:first-child,
    & > div:last-child {
      padding-inline: 12px;
    }
  }
`;

type Props = { data: OrderDetail };

const CheckoutOrderSuccess = ({ data }: Props) => {
  const { order_no, order_delivery } = data;
  const { name, phone, street, ward, district, city, note } = order_delivery;

  const modalProps: ModalProps = {
    open: true,
    centered: true,
    closable: false,
    width: 874,
    footer: null,
  };

  const buttonStyle: Partial<AliasToken> = {
    paddingContentHorizontal: 65,
    borderRadius: 0,
    controlHeight: 44,
    colorPrimary: '#181818',
    controlOutline: 'none',
    fontSize: 12,
  };

  return (
    <ConfigProvider theme={{ token: { borderRadiusLG: 0, paddingMD: 24 } }}>
      <Modal {...modalProps}>
        <Icon>
          <CheckoutSuccessIcon />
        </Icon>
        <Title>Cảm ơn quý khách đã mua hàng tại Nội thất Số</Title>
        <SubTitle>Nội Thất Số sẽ liên hệ bạn trong thời gian sớm nhất.</SubTitle>
        <ShippingInfo>
          <div>Thông tin khách hàng</div>
          <div>
            <p>
              Mã đơn hàng:{' '}
              <Typography.Text copyable={{ icon: <CopyOutlineIcon />, tooltips: false }}>
                {order_no}
              </Typography.Text>
            </p>
            <p>
              Họ và tên: <span>{name}</span>
            </p>
            <p>
              Số điện thoại: <span>{phone}</span>
            </p>
            <p>
              Địa chỉ nhận hàng: <span>{`${street}, ${ward}, ${district}, ${city}`}</span>
            </p>
            <p>
              Ghi chú đơn hàng: <span>{note}</span>
            </p>
          </div>
        </ShippingInfo>
        <BackHomeButton>
          <ConfigProvider theme={{ token: buttonStyle }}>
            <Button type='primary'>
              <Link href='/'>Về trang chủ</Link>
            </Button>
          </ConfigProvider>
        </BackHomeButton>
      </Modal>
    </ConfigProvider>
  );
};

export default CheckoutOrderSuccess;
