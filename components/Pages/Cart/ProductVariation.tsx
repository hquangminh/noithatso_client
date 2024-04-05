import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from 'styled-components';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, Dropdown, Space, message, theme } from 'antd';

import { useWindowSize } from 'lib/hooks';
import { MaxIntegerPostgreSQL } from 'lib/constants';
import { ChangeVariation, GetCart } from 'store/reducer/cart';

import ProductOptionComponent from 'components/Pages/Product/Option';

import { ProductCart, ProductCartStatus } from 'interface/Cart';
import { ProductDetail, ProductVariation } from 'interface/Product';

import { maxMedia } from 'lib/styles';

const DropdownButton = styled.div`
  display: inline-flex;
  align-items: center;
  column-gap: 12px;
  margin-top: 8px;
  padding: 6px;
  background-color: #f4f5f8;
  cursor: pointer;
  p {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 500;
    span {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .anticon {
    font-size: 12px;
    color: #acacba;
  }

  &[aria-hidden='true'] {
    p,
    p span {
      color: #c6c6cf;
    }
  }

  ${maxMedia.custom(768)} {
    margin-top: 6px;
    width: fit-content;
    p {
      font-size: 12px;
    }
  }
`;
const DropdownContent = styled.div``;

type Props = {
  product: ProductDetail;
  productCart: ProductCart;
  variationSelected: ProductVariation;
};

export const CartProductVariation = ({ product, productCart, variationSelected }: Props) => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [screenW] = useWindowSize();

  const [selected, setSelected] = useState<string[]>(product.product_options.map((_) => '0'));
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const cart = useSelector(GetCart);

  const onSelectVariation = useCallback(() => {
    const unicodeArr = variationSelected.combUnicode
      ? variationSelected.combUnicode.split('-').map((i) => i.toString())
      : product.product_options.map(() => '0');
    setSelected(unicodeArr);
  }, [variationSelected, product, setSelected]);

  useEffect(() => {
    onSelectVariation();
  }, [openDrawer, onSelectVariation]);

  const onChangeVariation = () => {
    const variationChoose = product.product_variations.find((i) => i.combUnicode === selected.join('-'));

    if (variationChoose) {
      const isOutStock = product.preparation_time === null && variationChoose.stock === 0;
      const isExistProduct = cart.some(
        (i) =>
          i.product_id === productCart.product_id &&
          i.variation_id === variationChoose.id &&
          i.variation_id !== productCart.variation_id,
      );
      if (isExistProduct)
        message.error({
          key: 'update-cart-product-is-exist',
          content: 'Không thể đổi sang phân loại đã tồn tại',
        });
      else if (variationChoose.id !== variationSelected.id) {
        if (isOutStock)
          return message.error({
            key: 'update-cart-product-out-stock',
            content: 'Không thể thay đổi phân loại vì phân loại bạn chọn đã hết hàng',
          });

        const isExceedStock =
          productCart.quantity > (product.preparation_time ? MaxIntegerPostgreSQL : variationChoose.stock);
        dispatch(
          ChangeVariation({
            old_product: productCart,
            new_product: {
              ...productCart,
              price: variationChoose.promotion_price,
              variation_id: variationChoose.id,
              variation_name: variationChoose.combName,
              quantity: isExceedStock ? variationChoose.stock : productCart.quantity,
              status: ProductCartStatus.NORMAL,
            },
          }),
        );
      }
    }
  };

  const onOpenVariation = () => {
    setOpenDrawer(
      typeof screenW !== 'undefined' && screenW <= 768 && productCart.status !== ProductCartStatus.HIDDEN,
    );
  };

  const contentStyle: CSSProperties = {
    padding: token.paddingSM,
    backgroundColor: token.colorBgElevated,
    boxShadow: token.boxShadowSecondary,
  };

  const DropdownBtn = (
    <DropdownButton aria-hidden={productCart.status === ProductCartStatus.HIDDEN} onClick={onOpenVariation}>
      <p>
        Phân loại: <span>{variationSelected?.combName}</span>
      </p>
      <DownOutlined />
    </DropdownButton>
  );

  if (!screenW) return null;
  else if (screenW <= 768)
    return (
      <>
        {DropdownBtn}
        <Drawer
          open={openDrawer}
          height='auto'
          placement='bottom'
          closable={false}
          title={
            <Space align='start' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space align='start' size={12}>
                <img
                  src={product.image}
                  alt=''
                  width='95px'
                  style={{ backgroundColor: product.background_color }}
                />
                <span>{product.name}</span>
              </Space>
              <CloseOutlined style={{ fontSize: 14 }} onClick={() => setOpenDrawer(false)} />
            </Space>
          }
          headerStyle={{ padding: 16 }}
          bodyStyle={{ padding: '16px 16px 24px' }}
          onClose={() => setOpenDrawer(false)}
        >
          <ProductOptionComponent
            options={product.product_options}
            selected={selected}
            onSelect={setSelected}
          />
          <ConfigProvider theme={{ token: { colorPrimary: '#181818', borderRadius: 0 } }}>
            <Button
              block
              size='large'
              type='primary'
              style={{ marginTop: 16 }}
              onClick={() => {
                setOpenDrawer(false);
                onChangeVariation();
              }}
            >
              Xác nhận
            </Button>
          </ConfigProvider>
        </Drawer>
      </>
    );

  return (
    <Dropdown
      trigger={['click']}
      placement='bottomLeft'
      arrow
      disabled={productCart.status === ProductCartStatus.HIDDEN}
      dropdownRender={() => (
        <DropdownContent style={contentStyle}>
          <ProductOptionComponent
            options={product.product_options}
            selected={selected}
            onSelect={setSelected}
          />
        </DropdownContent>
      )}
      onOpenChange={(open) => (open ? onSelectVariation() : onChangeVariation())}
    >
      {DropdownBtn}
    </Dropdown>
  );
};

export default CartProductVariation;
