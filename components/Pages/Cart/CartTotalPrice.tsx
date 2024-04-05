import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled } from 'styled-components';
import { Button, ConfigProvider, Modal } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

import { useDevice } from 'lib/hooks';
import { priceFormatter } from 'functions';

import { maxMedia } from 'lib/styles';

const Wrapper = styled.div`
  padding: 24px;
  border: solid 1px #e3e3e8;
  .ant-btn {
    margin-top: 12px;
    height: 44px;
    font-size: 12px;
    line-height: 1;
    font-weight: 600;
    text-transform: uppercase;
  }

  ${maxMedia.medium} {
    margin-top: 24px;
  }

  ${maxMedia.custom(768)} {
    position: sticky;
    bottom: 0;

    padding: 16px;
    margin-left: -16px;

    width: 100vw;
    background-color: ${({ theme }) => theme.bodyColor};
    border-bottom: 0;

    .ant-btn {
      margin-top: 4px;
      width: calc(50% - 6px) !important;
      &:last-child {
        margin-left: 12px;
      }
    }
  }

  ${maxMedia.tiny} {
    .ant-btn {
      width: 100% !important;
      & + .ant-btn {
        margin-left: 0;
      }
    }
  }
`;
const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.common.black};
  div:last-child {
    font-size: 16px;
    font-weight: bold;
    color: #ea3335;
  }
`;
const ModalConfirm = styled.div`
  .ant-modal-confirm {
    top: 75px;
    .ant-modal-content {
      padding: 12px 16px;
      border-radius: 0;
      border: 1px solid #f1a815;
      background-color: #fff6e4;
      box-shadow: none;

      .ant-modal-body {
        .ant-modal-confirm-body-wrapper {
          .ant-modal-confirm-body {
            .ant-modal-confirm-title,
            .ant-modal-confirm-content {
              color: ${({ theme }) => theme.textColor};
            }
            .ant-modal-confirm-content {
              min-width: 100%;
              margin-block-start: 0;
              font-weight: 500;
            }
          }
          .ant-modal-confirm-btns {
            .ant-btn {
              margin-top: 0;
              height: 35px;
              font-weight: 500;
              border-radius: 0;
              text-transform: none;
              &.ant-btn-default {
                color: ${({ theme }) => theme.palette.common.black};
                border-color: ${({ theme }) => theme.palette.common.black};
                background-color: transparent;
              }

              ${maxMedia.xsmall} {
                width: 100%;
                + .ant-btn {
                  margin-top: 10px;
                  margin-inline-start: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  ${maxMedia.xsmall} {
    .ant-modal-confirm {
      .ant-modal-content {
        text-align: center;
        .ant-modal-confirm-btns {
          text-align: center;
        }
      }
    }
  }
`;

type Props = { total: number; allowCheckout: boolean; isConfirm: boolean; onConfirmedProduct: () => void };

const CartTotalPrice = ({ total, allowCheckout, isConfirm, onConfirmedProduct }: Props) => {
  const router = useRouter();
  const molConfirmRef = useRef<HTMLDivElement>(null);

  const [modal, modalContext] = Modal.useModal();

  const { device } = useDevice();

  const handleCheckout = () => {
    if (isConfirm)
      modal.confirm({
        icon: null,
        mask: device === 'mobile',
        centered: device === 'mobile',
        title: 'Tiến hành đặt hàng',
        content: 'Giỏ hàng của bạn đã có sự thay đổi. Bạn có muốn kiểm tra lại giỏ hàng không?',
        cancelText: 'Kiểm tra giỏ hàng',
        okText: 'Tiến hành đặt hàng',
        onOk: () => router.push('/hoan-tat-dat-hang').then(() => onConfirmedProduct()),
        getContainer: molConfirmRef.current || document.body,
        autoFocusButton: null,
      });
    else router.push('/hoan-tat-dat-hang');
  };

  const token: Partial<AliasToken> = {
    colorPrimary: '#181818',
    colorTextBase: '#181818',
    colorBorder: '#181818',
    borderRadius: 0,
    controlOutline: 'none',
    fontSize: 12,
  };

  return (
    <>
      <Wrapper>
        <TotalPrice>
          <div>Tổng tiền</div>
          <div>{priceFormatter(total)}</div>
        </TotalPrice>

        <ConfigProvider theme={{ token }}>
          <Button block type='primary' disabled={!allowCheckout} onClick={handleCheckout}>
            Đặt hàng
          </Button>
          <Button block>
            <Link href={'/san-pham'}>tiếp tục mua hàng</Link>
          </Button>
        </ConfigProvider>
      </Wrapper>
      <ModalConfirm ref={molConfirmRef}>{modalContext}</ModalConfirm>
    </>
  );
};

export default CartTotalPrice;
