import { useState } from 'react';

import { styled } from 'styled-components';
import { Button, Checkbox, ConfigProvider } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';

import { priceFormatter } from 'functions';

import CheckoutSection from './SectionContent';

import { ProductCart } from 'interface/Cart';

import { TextLineClamp } from 'lib/styles';

const Wrapper = styled.div`
  grid-area: order_info;
  & > div > div:last-child {
    padding-top: 0;
  }
  .btn-checkout {
    font-weight: 500;
  }
`;
const ProductList = styled.div`
  padding-right: 24px;
  margin-bottom: 16px;
  width: calc(100% + 24px);
  max-height: 420px;
  overflow-y: auto;
  border-bottom: solid 1px #e3e3e8;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
  }
  &::-webkit-scrollbar-thumb {
    border: 4px solid #fff;
    background-color: #d9d9d9;
    border-radius: 30px;
  }
  &:hover::-webkit-scrollbar-thumb {
  }
`;
const ProductItem = styled.div`
  display: grid;
  grid-template-areas: 'image info';
  grid-template-columns: 95px 1fr;
  align-items: center;
  column-gap: 8px;
  padding: 12px 0;
  color: ${({ theme }) => theme.textColor};
  &:not(:last-child) {
    border-bottom: solid 1px #e3e3e8;
  }
`;
const ProductImage = styled.img`
  grid-area: image;
  width: 100%;
  aspect-ratio: 19/23;
  object-fit: contain;
`;
const ProductInfo = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;
const ProductName = styled(TextLineClamp)`
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
`;
const ProductPrice = styled.p`
  margin-bottom: 0;
  font-size: 14px;
`;
const ProductVariation = styled(ProductPrice)`
  font-weight: 500;
`;
const SummaryItem = styled.div<{ size?: 'large' }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: ${({ size }) => (size === 'large' ? 18 : 14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.common.black};
  p {
    margin-bottom: 0;
    &:last-child {
      font-weight: 400;
    }
  }
`;
const CheckboxTerms = styled.div`
  margin-bottom: 24px;
  font-weight: 500;
  .ant-checkbox-wrapper {
    .ant-checkbox {
      margin-top: 4px;
      align-self: start;
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        &:after {
          inset-inline-start: 28.5%;
        }
      }
    }
  }
  a {
    color: #1890ff;
    text-decoration: underline;
  }
`;

type Props = { products: ProductCart[]; isOrdering: boolean; onCheckout: () => void };

const CheckoutOrderInformation = ({ products, isOrdering, onCheckout }: Props) => {
  const [agree, setAgree] = useState<boolean>(false);

  const totalQuantity = products.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = products.reduce((total, prod) => (total += prod.price * prod.quantity), 0);

  const buttonStyle: Partial<AliasToken> = {
    borderRadius: 0,
    colorPrimary: '#181818',
    controlOutline: 'none',
    fontSizeLG: 12,
  };

  return (
    <Wrapper>
      <CheckoutSection title='Thông tin đơn hàng'>
        <ProductList>
          {products.map((prod, index) => {
            return (
              <ProductItem key={index}>
                <ProductImage src={prod.image} alt={prod.name} style={{ backgroundColor: prod.background }} />
                <ProductInfo>
                  <ProductName>{prod.name}</ProductName>
                  <ProductPrice>
                    {priceFormatter(prod.price)} | Số lượng: {prod.quantity}
                  </ProductPrice>
                  {prod.variation_name && (
                    <ProductVariation>Phân loại hàng: {prod.variation_name}</ProductVariation>
                  )}
                </ProductInfo>
              </ProductItem>
            );
          })}
        </ProductList>

        <SummaryItem>
          <p>Vận chuyển</p>
          <p>Liên hệ phí vận chuyển sau</p>
        </SummaryItem>

        <SummaryItem>
          <p>Số lượng</p>
          <p>{totalQuantity}</p>
        </SummaryItem>

        <SummaryItem size='large'>
          <p>Tổng tiền</p>
          <p style={{ color: '#ea3335' }}>
            <strong>{priceFormatter(totalPrice)}</strong>
          </p>
        </SummaryItem>

        <CheckboxTerms>
          <Checkbox onChange={(e) => setAgree(e.target.checked)}>
            Tôi đã đọc và đồng ý{' '}
            <a href='/nghia-vu-va-chinh-sach-chung' target='_blank'>
              điều kiện đổi trả hàng, giao hàng, điều khoản dịch vụ mua hàng online
            </a>
          </Checkbox>
        </CheckboxTerms>

        <ConfigProvider theme={{ token: buttonStyle }}>
          <Button
            block
            size='large'
            type='primary'
            loading={isOrdering}
            disabled={!agree}
            className='btn-checkout'
            onClick={onCheckout}
          >
            ĐẶT MUA
          </Button>
        </ConfigProvider>
      </CheckoutSection>
    </Wrapper>
  );
};

export default CheckoutOrderInformation;
