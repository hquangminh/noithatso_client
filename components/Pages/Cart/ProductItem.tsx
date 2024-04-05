import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { styled } from 'styled-components';
import { CloseOutlined, PlusOutlined, MinusOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Input, Typography, message } from 'antd';
import type { InputRef } from 'antd';

import { priceFormatter } from 'functions';
import { MaxIntegerPostgreSQL } from 'lib/constants';
import { AddToCart, RemoveCart } from 'store/reducer/cart';

import CartProductVariation from './ProductVariation';

import { ProductCart, ProductCartStatus } from 'interface/Cart';
import { ProductDetail } from 'interface/Product';

import { maxMedia } from 'lib/styles';

const ProductItem = styled.div`
  position: relative;
  padding: 12px 0;
  &:not(:last-child) {
    border-bottom: solid 1px #e3e3e8;
  }

  ${maxMedia.custom(768)} {
    padding: 16px 0;
    grid-template-columns: 80px auto;
    grid-template-rows: repeat(3, auto);
    column-gap: 8px;
  }
`;
const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 136px 0.8fr;
  column-gap: 24px;

  &[aria-disabled='true'] {
    background-color: rgb(198, 198, 207, 0.25);
    .ant-dropdown-trigger {
      background-color: #f4f5f8;
      p {
        color: ${({ theme }) => theme.textColor};
        span {
          color: #c6c6cf;
        }
      }
    }
  }
  &[aria-hidden='true'] {
    .ant-dropdown-trigger p {
      color: #c6c6cf;
    }
  }

  ${maxMedia.custom(768)} {
    position: relative;
    grid-template-columns: 80px auto;
    grid-template-rows: repeat(3, auto);
    column-gap: 8px;
  }
`;
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  img {
    width: 80px;
    height: 100%;
    min-height: 97px;
    object-fit: contain;
  }

  ${ProductContainer}[aria-hidden='true'] & {
    img {
      filter: grayscale(0.6);
    }
  }

  ${maxMedia.custom(768)} {
    grid-area: 1/1/2/3;
    align-items: flex-start;
    padding-left: 92px;
    img {
      height: 97px;
      position: absolute;
      transform: translateX(calc(-100% - 12px));
    }
    & > div {
      display: flex;
      flex-direction: column;
      .ant-dropdown-trigger {
        order: 2;
      }
    }
  }
`;
const ProductName = styled.p`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;

  ${ProductContainer}[aria-disabled='true'] & {
    color: ${({ theme }) => theme.textColor};
  }
  ${ProductContainer}[aria-hidden='true'] & {
    color: #c6c6cf;
  }

  ${maxMedia.custom(768)} {
    padding-right: 20px;
    font-size: 14px;
  }
`;
const ProductPrice = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};

  span {
    display: inline-block;

    &.origin {
      margin-inline-end: 12px;
      font-size: 16px;
      color: #acacba;
      text-decoration: line-through;
    }

    ${ProductContainer}[aria-hidden='true'] & {
      color: #c6c6cf;
    }
  }

  ${ProductContainer}[aria-hidden='true'] & {
    color: #c6c6cf;
  }

  ${maxMedia.custom(768)} {
    order: 3;
    margin-top: 6px;
    span {
      font-size: 14px;
    }
  }
`;
const ProductQuantity = styled.div`
  align-self: center;
  .Product_Quantity {
    display: grid;
    grid-template-columns: 32px auto 32px;
    .ant-btn.ant-btn-text.ant-btn-icon-only {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: 32px;
      aspect-ratio: 1;
      align-self: center;
    }
    .ant-input {
      padding-block: 0;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: ${({ theme }) => theme.textColor};

      ${ProductContainer}[aria-disabled='true'] & {
        color: #c6c6cf;
      }
    }
  }

  ${maxMedia.custom(768)} {
    grid-area: 2/2/3/3;
    .Product_Quantity {
      grid-template-columns: 24px 45px 24px;
      margin: 17px 0;
      padding: 8px 12px;
      .ant-btn.ant-btn-text.ant-btn-icon-only {
        width: 24px;
        height: 24px;
      }
      .ant-input {
        font-size: 16px;
      }

      ${ProductContainer}[aria-disabled='true'] & {
        width: 140px;
        display: inline-flex;
        background-color: #f6f7f8;
        .ant-input {
          color: #717082;
        }
        .ant-btn.ant-btn-text.ant-btn-icon-only .ant-btn-icon {
          color: #c6c6cf;
        }
      }
    }
  }
`;
const ProductTotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: center;
  .product-item-total-price {
    flex: auto;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;

    ${ProductContainer}[aria-disabled='true'] & {
      color: #c6c6cf;
    }
  }
  .product-item-btn-remove {
    margin-inline-end: 4px;
    font-size: 16px;
    color: #bfbfbf;
    cursor: pointer;
    &:hover {
      color: #ea3335;
    }
  }

  ${maxMedia.custom(768)} {
    grid-area: 3/2/4/3;
    .product-item-total-price {
      font-size: 14px;
      text-align: left;
      &:before {
        display: inline-block;
        content: 'Thành tiền';
        margin-right: 8px;
        font-size: 12px;
        font-weight: 500;
        color: #acacba;
      }
    }
    .product-item-btn-remove {
      position: absolute;
      top: 16px;
      right: 0;
      font-size: 14px;
    }
  }
`;

type Props = { productCart: ProductCart; productData?: ProductDetail };

const CartProductItem = ({ productCart, productData }: Props) => {
  const dispatch = useDispatch();

  const inputRef = useRef<InputRef>(null);

  const [quantity, setQuantity] = useState<number | undefined>(productCart.quantity);

  const isPreOrder: boolean = productData?.preparation_time !== null;
  const variation = productData?.product_variations.find((v) => v.id === productCart.variation_id);
  const stock = isPreOrder ? MaxIntegerPostgreSQL : variation?.stock ?? MaxIntegerPostgreSQL;
  const isStock = isPreOrder || (typeof variation !== 'undefined' && variation.stock > 0);
  const isInvalid = ![ProductCartStatus.NORMAL, ProductCartStatus.PRICE_CHANGE].includes(productCart.status);
  const isWarning = productCart.status === ProductCartStatus.PRICE_CHANGE;

  useEffect(() => {
    setQuantity(productCart.quantity);
  }, [productCart]);

  const onUpdateQuantity = (quantity: number) => {
    if (variation)
      if (stock < productCart.quantity + quantity) {
        setQuantity(productCart.quantity);
        message.error({
          key: 'update-cart-product-exceed-stock',
          content: `Rất tiếc, bạn chỉ có thể mua tối đa ${variation.stock} sản phẩm`,
        });
      } else {
        const status =
          productCart.status !== ProductCartStatus.PRICE_CHANGE
            ? ProductCartStatus.NORMAL
            : productCart.status;
        dispatch(AddToCart({ ...productCart, quantity, status }));
      }
  };

  return (
    <ProductItem>
      <ProductContainer
        aria-disabled={isInvalid}
        aria-hidden={productCart.status === ProductCartStatus.HIDDEN}
      >
        <ProductInfo>
          <img
            src={productData?.image ?? productCart.image}
            alt=''
            style={{ backgroundColor: productData?.background_color ?? productCart.background ?? '#eeeeee' }}
          />
          <div>
            <ProductName>{productData?.name ?? productCart.name}</ProductName>
            <ProductPrice>
              {variation && productCart.price !== variation.price && (
                <span className='origin'>{priceFormatter(variation?.price ?? 0)}</span>
              )}
              <span>{priceFormatter(productCart.price ?? 0)}</span>
            </ProductPrice>
            {variation && productData && productData.product_options.length > 0 && (
              <CartProductVariation
                product={productData}
                productCart={productCart}
                variationSelected={variation}
              />
            )}
          </div>
        </ProductInfo>

        <ProductQuantity>
          <div className='Product_Quantity'>
            <Button
              type='text'
              icon={isStock && productCart.quantity > stock ? <SyncOutlined /> : <MinusOutlined />}
              disabled={!isStock || productCart.quantity === 1}
              onClick={() =>
                onUpdateQuantity(
                  variation && productCart.quantity > stock ? stock - productCart.quantity : -1,
                )
              }
            />
            <Input
              ref={inputRef}
              bordered={false}
              disabled={isInvalid}
              value={quantity}
              onClick={() => inputRef.current?.focus({ cursor: 'all' })}
              onChange={(e) => setQuantity(Number(e.target.value.replace(/\D/g, '')) || undefined)}
              onBlur={() => onUpdateQuantity(quantity ? quantity - productCart.quantity : 0)}
            />
            <Button
              type='text'
              icon={<PlusOutlined />}
              disabled={isInvalid || (variation && stock <= productCart.quantity)}
              onClick={() => onUpdateQuantity(1)}
            />
          </div>
        </ProductQuantity>

        <ProductTotalPrice>
          <p className='product-item-total-price'>
            {priceFormatter(productCart.price * productCart.quantity)}
          </p>
          <CloseOutlined
            className='product-item-btn-remove'
            onClick={() => dispatch(RemoveCart([productCart]))}
          />
        </ProductTotalPrice>
      </ProductContainer>

      {(isInvalid || isWarning) && (
        <div style={{ marginBlockStart: 8, fontWeight: 500 }}>
          {productCart.status === ProductCartStatus.HIDDEN && (
            <Typography.Text type='danger'>
              Sản phẩm không khả dụng. Vui lòng xoá hoặc lựa chọn sản phẩm khác.
            </Typography.Text>
          )}
          {productCart.status === ProductCartStatus.VARIATION_OUT_STOCK && (
            <Typography.Text type='danger'>
              Phân loại này đã hết hàng. Vui lòng xoá hoặc lựa chọn một phân loại khác.
            </Typography.Text>
          )}
          {productCart.status === ProductCartStatus.PRODUCT_OUT_STOCK && (
            <Typography.Text type='danger'>
              Sản phẩm này đã hết hàng. Vui lòng xoá hoặc lựa chọn sản phẩm khác.
            </Typography.Text>
          )}
          {productCart.status === ProductCartStatus.NOT_ENOUGH_STOCK && (
            <Typography.Text type='danger'>
              Sản phẩm này không đủ số lượng. Vui lòng cập nhật lại số lượng hoặc chọn sản phẩm khác.
            </Typography.Text>
          )}
          {productCart.status === ProductCartStatus.PRICE_CHANGE && (
            <Typography.Text type='warning'>
              Giá đã được cập nhật. Vui lòng xem lại sản phẩm trước khi đặt hàng.
            </Typography.Text>
          )}
        </div>
      )}
    </ProductItem>
  );
};

export default CartProductItem;
