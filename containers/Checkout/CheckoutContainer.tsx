import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { Button, Form, Modal } from 'antd';

import { isArrayEmpty } from 'functions';
import { GetCart, RemoveCart } from 'store/reducer/cart';

import VietnamAddress from 'lib/constants/AdministrativeBoundariesVN.json';

import CheckoutShippingAddress, { VietnamAddressType } from 'components/Pages/Checkout/ShippingAddress';
import CheckoutOrderInformation from 'components/Pages/Checkout/OrderInformation';
import CheckoutOrderSuccess from 'components/Pages/Checkout/OrderSuccess';

import { OrderDetail } from 'interface/Order';
import { ProductCartStatus } from 'interface/Cart';

import { Container, maxMedia } from 'lib/styles';

const CheckoutWrapper = styled.div`
  padding: 40px 0;

  ${maxMedia.medium} {
    padding: 24px 0;
  }
`;
const CheckoutContent = styled(Container)`
  display: grid;
  grid-template-areas: 'address gap order_info';
  grid-template-columns: 1fr 32px 428px;

  ${maxMedia.medium} {
    grid-template-areas: 'address' 'order_info';
    grid-template-columns: 100%;
    row-gap: 24px;
  }
`;

const CheckoutContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const [isCheckCart, setCheckCart] = useState<boolean>(false);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderDetail>();

  const productCart = useSelector(GetCart).filter((i) =>
    [ProductCartStatus.NORMAL, ProductCartStatus.PRICE_CHANGE].includes(i.status),
  );

  useEffect(() => {
    if (isArrayEmpty(productCart)) router.replace('/gio-hang');
    else setCheckCart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notificationCantCheckout = (message: string) => {
    modal.confirm({
      icon: null,
      content: message,
      bodyStyle: { textAlign: 'center' },
      footer: (
        <Button type='primary' style={{ marginTop: 10 }} onClick={() => router.replace('/gio-hang')}>
          Đồng ý
        </Button>
      ),
    });
  };

  const onCheckout = async (values: Record<string, string>) => {
    try {
      setIsOrdering(true);

      const administrativeBoundaries: VietnamAddressType[] = [...VietnamAddress];
      const city = administrativeBoundaries.find((i) => i.Id === values.city);
      const district = city?.Districts.find((i) => i.Id === values.district);
      const ward = district?.Wards.find((i) => i.Id === values.ward);
      const shipping_info = { ...values, city: city?.Name, district: district?.Name, ward: ward?.Name };
      const body = { shipping_info, products: productCart };

      const resOrder = await fetch('/api/order', { method: 'POST', body: JSON.stringify(body) });
      const { error, error_code, data } = await resOrder.json();

      if (!error && data) {
        setOrderData(data);
        dispatch(RemoveCart(productCart));
      } else if (error_code === 'PRODUCT_CHANGED')
        notificationCantCheckout(
          'Đơn hàng bạn đặt đã có sản phẩm bị thay đổi. Vui lòng quay lại giỏ hàng và kiểm tra.',
        );

      setIsOrdering(false);
    } catch (error) {
      setIsOrdering(false);
    }
  };

  if (!isCheckCart) return <div style={{ height: '100vh' }} />;
  else if (orderData)
    return (
      <>
        <div style={{ height: '100vh' }} />
        <CheckoutOrderSuccess data={orderData} />
      </>
    );

  return (
    <CheckoutWrapper>
      <CheckoutContent>
        <CheckoutShippingAddress form={form} onCheckout={onCheckout} />
        <CheckoutOrderInformation products={productCart} isOrdering={isOrdering} onCheckout={form.submit} />
      </CheckoutContent>

      {contextHolder}
    </CheckoutWrapper>
  );
};

export default CheckoutContainer;
