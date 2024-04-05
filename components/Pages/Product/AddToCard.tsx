import { Dispatch, SetStateAction, useEffect } from 'react';

import { styled } from 'styled-components';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, InputNumber } from 'antd';

import { MaxIntegerPostgreSQL } from 'lib/constants';

import { ProductVariation } from 'interface/Product';

import { maxMedia } from 'lib/styles';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  column-gap: 16px;
  margin-top: 16px;

  ${maxMedia.medium} {
    margin-bottom: 16px;
  }
  ${maxMedia.small} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const ProductBuyQuantity = styled.div`
  display: flex;
  align-items: center;
  background-color: #e3e3e8;
  & > .ant-btn[type='button'].ant-btn-icon-only {
    width: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    &:not(:disabled) {
      color: ${({ theme }) => theme.palette.common.black};
    }
    .ant-btn-icon {
      color: currentColor;
    }
  }
  .ant-input-number {
    width: 72px;
    .ant-input-number-input {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.63;
      text-align: center;
      color: #121212;
    }

    ${maxMedia.custom(768)} {
      flex: auto;
    }
  }
`;
const ButtonAddCart = styled.div`
  button.ant-btn[type='button'] {
    width: 100%;
    padding: 6px 24px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    box-shadow: none;
    ${maxMedia.custom(768)} {
      padding: 6px 14px;
    }
  }
`;

type Props = {
  isPreOrder: boolean;
  variationSelected?: ProductVariation;
  quantity: number;
  onChangeQuantity: Dispatch<SetStateAction<number>>;
  onAddToCard: () => void;
};

const ProductAddToCard = (props: Props) => {
  const { isPreOrder, variationSelected, quantity, onChangeQuantity, onAddToCard } = props;
  const disabledDecrease =
    !variationSelected || (!isPreOrder && variationSelected.stock === 0) || quantity === 1;
  const disabledIncrease =
    !isPreOrder &&
    (!variationSelected || variationSelected.stock === 0 || quantity === variationSelected.stock);

  useEffect(() => {
    if (variationSelected) {
      if (isPreOrder) onChangeQuantity(1);
      else onChangeQuantity(variationSelected.stock === 0 ? 0 : 1);
    }
  }, [isPreOrder, onChangeQuantity, variationSelected]);

  const onChange = (type: 'up' | 'down') => {
    onChangeQuantity((quantity) => {
      if (type === 'down') return quantity - 1 || 0;
      if (type === 'up') return quantity + 1;
      else return 1;
    });
  };

  return (
    <Wrapper>
      <ProductBuyQuantity>
        <ConfigProvider theme={{ token: { colorBgTextHover: '', colorBgTextActive: '' } }}>
          <Button
            type='text'
            size='large'
            icon={<MinusOutlined />}
            disabled={disabledDecrease}
            onClick={() => onChange('down')}
          />
          <InputNumber
            value={quantity}
            max={isPreOrder ? MaxIntegerPostgreSQL : variationSelected?.stock}
            size='large'
            controls={false}
            bordered={false}
            onChange={(value) => {
              if (variationSelected && value) {
                const stock = variationSelected.stock;
                onChangeQuantity((quantity) => Math.ceil(value > stock || value <= stock ? value : quantity));
              }
            }}
          />
          <Button
            type='text'
            size='large'
            icon={<PlusOutlined />}
            disabled={disabledIncrease}
            onClick={() => onChange('up')}
          />
        </ConfigProvider>
      </ProductBuyQuantity>
      <ButtonAddCart>
        <ConfigProvider theme={{ token: { colorPrimary: '#181818', borderRadius: 0 } }}>
          <Button type='primary' size='large' disabled={quantity === 0} onClick={onAddToCard}>
            thêm vào giỏ hàng
          </Button>
        </ConfigProvider>
      </ButtonAddCart>
    </Wrapper>
  );
};

export default ProductAddToCard;
