import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLazyQuery } from '@apollo/client';
import { styled } from 'styled-components';
import { Spin } from 'antd';

import { isArrayEmpty } from 'functions';
import { MaxIntegerPostgreSQL } from 'lib/constants';
import { GetCart, GetCartTotal, SetDataCart } from 'store/reducer/cart';
import { API_GetProductCart } from 'graphql/cart/query';

import CartHeader from 'components/Pages/Cart/Header';
import CartProductList from 'components/Pages/Cart/ProductList';
import CartTotalPrice from 'components/Pages/Cart/CartTotalPrice';
import CartEmpty from 'components/Pages/Cart/CartEmpty';

import { ProductDetail, ProductVariationType } from 'interface/Product';
import { ProductCart, ProductCartStatus } from 'interface/Cart';

import { Container, maxMedia } from 'lib/styles';

const Wrapper = styled.main`
  padding: 44px 0 90px;

  ${maxMedia.custom(768)} {
    padding: 24px 0 0;
  }
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: auto 318px;
  align-items: start;
  column-gap: 16px;

  ${maxMedia.medium} {
    display: block;
  }
`;

const CartContainer = () => {
  const dispatch = useDispatch();
  const cart = useSelector(GetCart);

  const cartCount = useSelector(GetCartTotal);

  const [productCart, setProductCart] = useState<ProductDetail[]>([]);
  const [isCheckedCart, setCheckedCart] = useState<boolean>(false);

  const [getProductCart] = useLazyQuery<{ product: ProductDetail[] }>(API_GetProductCart, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => onCheckProduct(data.product),
  });

  useEffect(() => {
    if (!isCheckedCart && cart) getProductCart({ variables: { ids: cart.map((i) => i.product_id) } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const onCheckProduct = (products: ProductDetail[]) => {
    try {
      const cartProducts = cart.reduce((listProduct: ProductCart[], item) => {
        const product = products.find((i) => i.id === item.product_id);
        const variation = product?.product_variations.find((i) => i.id === item.variation_id);
        const variation_name = variation?.combName ?? item.variation_name;
        const stock =
          product && product.preparation_time !== null
            ? MaxIntegerPostgreSQL
            : variation?.stock ?? MaxIntegerPostgreSQL;
        const price =
          variation && (variation.promotion_price ?? variation.price) !== item.price
            ? variation.promotion_price ?? variation.price
            : item.price;

        let status: ProductCartStatus = ProductCartStatus.NORMAL;
        if (item.status === ProductCartStatus.PRICE_CHANGE) status = ProductCartStatus.PRICE_CHANGE;
        if (product && variation) {
          if (!product.status) {
            status = ProductCartStatus.HIDDEN;
          } else if (stock === 0) {
            if (
              variation.type === ProductVariationType.ByProduct ||
              product.product_variations.length === 1
            ) {
              status = ProductCartStatus.PRODUCT_OUT_STOCK;
            } else if (variation.type === ProductVariationType.ByOption) {
              status = ProductCartStatus.VARIATION_OUT_STOCK;
            }
          } else if (stock < item.quantity) {
            status = ProductCartStatus.NOT_ENOUGH_STOCK;
          } else if ((variation.promotion_price ?? variation.price) !== item.price) {
            status = ProductCartStatus.PRICE_CHANGE;
          }
        } else status = ProductCartStatus.HIDDEN;

        return listProduct.concat([{ ...item, variation_name, status, price }]);
      }, []);

      setTimeout(() => dispatch(SetDataCart(cartProducts)));
      setCheckedCart(true);
      setProductCart(products);
    } catch (error) {
      console.error(error);
      setCheckedCart(true);
    }
  };

  const onRemoveWarningPriceChange = () => {
    if (cart.some((i) => i.status === ProductCartStatus.PRICE_CHANGE)) {
      const products = cart.map((i) => {
        const status = i.status === ProductCartStatus.PRICE_CHANGE ? ProductCartStatus.NORMAL : i.status;
        return { ...i, status };
      });
      dispatch(SetDataCart(products));
    }
  };

  if (!isCheckedCart) return <LoadingPage />;
  else if (isArrayEmpty(cart)) return <CartEmpty />;

  return (
    <Wrapper>
      <Container>
        <CartHeader total={cartCount} />
        <Content>
          <CartProductList cart={cart} products={productCart} />
          <CartTotalPrice
            allowCheckout={cart.some((i) =>
              [ProductCartStatus.NORMAL, ProductCartStatus.PRICE_CHANGE].includes(i.status),
            )}
            isConfirm={cart.some((i) => i.status !== ProductCartStatus.NORMAL)}
            total={cart
              .filter((i) => [ProductCartStatus.NORMAL, ProductCartStatus.PRICE_CHANGE].includes(i.status))
              .reduce((total, prod) => total + prod.price * prod.quantity, 0)}
            onConfirmedProduct={onRemoveWarningPriceChange}
          />
        </Content>
      </Container>
    </Wrapper>
  );
};

export default CartContainer;

const LoadingPage = () => (
  <Spin>
    <div style={{ height: 450 }} />
  </Spin>
);
