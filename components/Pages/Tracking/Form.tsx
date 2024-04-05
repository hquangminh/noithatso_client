import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { Button, ConfigProvider, Input, Space } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

import { isStringEmpty } from 'functions';

import { maxMedia } from 'lib/styles';

export const FormWrap = styled.div`
  padding-block: 40px;

  ${maxMedia.xsmall} {
    padding-block: 32px;
  }
`;
export const FormContainer = styled.div`
  margin: 0 auto;
  padding: 16px;
  max-width: 480px;
  border: solid 1px #e3e3e8;
`;
export const FormTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
  text-align: center;

  ${maxMedia.xsmall} {
    font-size: 14px;
  }
`;

export type Props = { searching: boolean; onSubmit: (code: string) => void };

const TrackingForm = ({ searching, onSubmit }: Props) => {
  const { query } = useRouter();

  const [orderCode, setOrderCode] = useState<string>();

  useEffect(() => {
    if (typeof query.order_code === 'string') onSubmit(query.order_code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.order_code]);

  return (
    <FormWrap>
      <FormContainer>
        <FormTitle>Vui lòng nhập mã đơn hàng của bạn</FormTitle>
        <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <ConfigProvider theme={{ token: inputDesignToken }}>
              <Input
                style={{ fontWeight: 500 }}
                size='large'
                placeholder='Nhập mã đơn hàng'
                disabled={searching}
                value={query.order_code?.toString() || orderCode}
                onChange={({ target }) => setOrderCode(target.value)}
              />
            </ConfigProvider>

            <ConfigProvider theme={{ token: buttonDesignToken }}>
              <Button
                style={{ fontWeight: 600 }}
                type='primary'
                block
                size='large'
                loading={searching}
                disabled={isStringEmpty(orderCode)}
                onClick={() => orderCode && onSubmit(orderCode.trim())}
              >
                KIỂM TRA
              </Button>
            </ConfigProvider>
          </Space>
        </ConfigProvider>
      </FormContainer>
    </FormWrap>
  );
};

export default TrackingForm;

export const inputDesignToken: Partial<AliasToken> = {
  colorBgContainer: '#f4f5f8',
  colorText: '#424153',
  colorTextPlaceholder: '#94949c',
  lineWidth: 0,
  fontSizeLG: 14,
};
export const buttonDesignToken: Partial<AliasToken> = {
  colorPrimary: '#191919',
  controlOutline: 'none',
  colorTextDisabled: '#ffffff',
  colorBorder: '#c6c6cf',
  colorBgContainerDisabled: '#c6c6cf',
  fontSizeLG: 12,
};
