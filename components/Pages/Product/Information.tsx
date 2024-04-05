import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { styled } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, ConfigProvider, Modal, QRCode, Row, Space, Spin, message } from 'antd';

import { useDevice, useWindowSize } from 'lib/hooks';
import { MaxIntegerPostgreSQL } from 'lib/constants';
import { isArrayEmpty, priceFormatter } from 'functions';
import { AppState } from 'store/type';
import { AddToCart, GetProductQuantityCart } from 'store/reducer/cart';

import ProductOptionComponent from './Option';
import ProductAddToCard from './AddToCard';
import ProductButtonShare from './Share';

import { ProductDetail, ProductVariationType } from 'interface/Product';
import { ProductCart, ProductCartStatus } from 'interface/Cart';

import { maxMedia } from 'lib/styles';

const ProductInformation = styled.div`
  margin-top: 40px;

  ${maxMedia.small} {
    margin-top: 32px;
  }
`;
const ProductPreview = styled.div`
  aspect-ratio: 1.27;
  ${maxMedia.xsmall} {
    aspect-ratio: 1;
  }
  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100%;
  }
  object {
    width: 100%;
    height: 100%;
    border: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 1px solid #eee;
  }
  .product-preview-btn-ar.ant-btn {
    position: absolute;
    z-index: 1;
    top: 60px;
    right: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;

    border-radius: 8px;
    border: 4px solid rgba(255, 255, 255, 0.8);
    background: rgba(205, 205, 205, 0.8);
    backdrop-filter: blur(4px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px;
    color: rgba(0, 0, 0, 0.64);
    &:hover {
      background: rgb(195, 195, 195) !important;
    }
    .ant-btn-icon {
      font-size: 12px;
      font-weight: 700;
    }
  }
`;
const ProductName = styled.h2`
  margin-bottom: 12px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.black};

  ${maxMedia.small} {
    font-size: 16px;
  }
`;
const ProductPrice = styled.div`
  margin-bottom: 16px;
  font-size: 20px;
  line-height: 1.2;
  color: ${({ theme }) => theme.textColor};

  .product-old-price {
    margin-right: 16px;
    color: #acacba;
    text-decoration: line-through;
  }

  ${maxMedia.small} {
    font-size: 18px;
  }
`;
const ProductInfoItem = styled.div`
  margin-top: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  strong {
    font-weight: 500;
    color: #ea3335;
  }
  span {
    font-weight: 500;
    a {
      color: currentColor;
    }
    a:hover {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
const QRForViewAR = styled.div`
  position: relative;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  & > button.ant-btn.ant-btn-text {
    position: absolute;
    right: 0;
    top: 0;
  }
  .ant-qrcode {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 8px;
  }
`;

type Props = { data: ProductDetail };

const ProductInformationComponent = ({ data }: Props) => {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();

  const [screenWidth] = useWindowSize();
  const { device } = useDevice();

  const [isLoadingPreview, setLoadingPreview] = useState<boolean>(false);
  const [variationUnicode, setVariationUnicode] = useState<string[]>(data.product_options.map(() => '0'));
  const [quantity, setQuantity] = useState<number>(1);

  const iframe = useRef<HTMLObjectElement>(null);

  const variationSelected =
    data.product_variations.find((i) => i.combUnicode === variationUnicode.join('-')) ??
    data.product_variations.find((i) => i.type === ProductVariationType.ByProduct) ??
    data.product_variations[0];
  const minPrice = data.product_variations.sort((a, b) => a.price - b.price)[0].price;
  const maxPrice = data.product_variations.sort((a, b) => b.price - a.price)[0].price;
  const totalStock = data.product_variations.reduce((stock: number, variation) => stock + variation.stock, 0);
  const isPreOrder = typeof data.preparation_time === 'number' && data.preparation_time > 0;

  const productQuantityCart = useSelector((state: AppState) =>
    GetProductQuantityCart(state, { id: data.id, variation_id: variationSelected?.id ?? 0 }),
  );

  useEffect(() => {
    setVariationUnicode(data.product_options.map(() => '0'));
  }, [data]);

  useEffect(() => {
    if (iframe.current && variationSelected) {
      setLoadingPreview(true);
      iframe.current.data = variationSelected.link;
    }
  }, [iframe, variationSelected]);

  const onAddToCart = () => {
    if (variationSelected)
      if (quantity + productQuantityCart <= (isPreOrder ? MaxIntegerPostgreSQL : variationSelected.stock)) {
        const product: ProductCart = {
          product_id: data.id,
          name: data.name,
          image: data.image,
          background: data.background_color,
          variation_name: variationSelected.combName,
          variation_id: variationSelected.id,
          price: variationSelected.promotion_price ?? variationSelected.price,
          quantity,
          status: ProductCartStatus.NORMAL,
        };
        dispatch(AddToCart(product));
        message.success({ key: 'add-to-cart-success', content: 'Sản phẩm đã được thêm vào giỏ hàng' });
      } else {
        const modalConfirm = modal.confirm({
          icon: null,
          centered: true,
          bodyStyle: { textAlign: 'center' },
          footer: (
            <Button type='primary' style={{ marginTop: 10 }} onClick={() => modalConfirm.destroy()}>
              Đồng ý
            </Button>
          ),
          content: `Bạn đã có ${productQuantityCart} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn mua hàng.`,
        });
      }
  };

  const onOpenAR = () => {
    const modalAR = modal.confirm({
      icon: null,
      centered: true,
      footer: null,
      content: (
        <QRForViewAR>
          <Button type='text' size='small' icon={<CloseOutlined />} onClick={() => modalAR.destroy()} />
          <Space>
            <QRCode value={location.href} size={140} color='#181818' />
            <div>Quét mã QR để sử dụng chế độ xem AR trên thiết bị di động</div>
          </Space>
        </QRForViewAR>
      ),
    });
  };

  return (
    <ProductInformation>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={14}>
          <ProductPreview>
            {variationSelected && !isLoadingPreview && device && device === 'desktop' && (
              <Button className='product-preview-btn-ar' type='text' icon='AR' onClick={onOpenAR} />
            )}
            {variationSelected ? (
              <Spin spinning={isLoadingPreview}>
                <object
                  ref={iframe}
                  type='text/html'
                  style={{ opacity: isLoadingPreview ? 0 : 1 }}
                  onLoad={() => setLoadingPreview(false)}
                />
              </Spin>
            ) : (
              <img src={data.image} alt='' loading='lazy' />
            )}
          </ProductPreview>
        </Col>
        <Col span={24} lg={10}>
          <ProductName>{data.name}</ProductName>

          <ProductPrice>
            {variationSelected.promotion_price &&
              variationSelected.promotion_price !== variationSelected.price && (
                <span className='product-old-price'>{priceFormatter(variationSelected.price)}</span>
              )}
            {priceFormatter(variationSelected.promotion_price ?? variationSelected.price)}
          </ProductPrice>

          {screenWidth && screenWidth <= 991 && (
            <ProductAddToCard
              isPreOrder={typeof data.preparation_time === 'number'}
              variationSelected={variationSelected}
              quantity={quantity}
              onChangeQuantity={setQuantity}
              onAddToCard={onAddToCart}
            />
          )}

          <ProductOptionComponent
            options={data.product_options}
            selected={variationUnicode}
            onSelect={setVariationUnicode}
          />

          <ProductInfoItem>
            Vật liệu: <span> {!isArrayEmpty(data.material) ? data.material?.join(', ') : '-'}</span>
          </ProductInfoItem>

          <ProductInfoItem>
            Kích thước: <span>{variationSelected?.size ?? '-'}</span>
          </ProductInfoItem>

          <ProductInfoItem>
            Mã sản phẩm: <span>{variationSelected?.sku ?? '-'}</span>
          </ProductInfoItem>

          <ProductInfoItem>
            Danh mục:{' '}
            <span>
              {data.product_category_relations?.map((category, index) => (
                <>
                  {index !== 0 && ', '}
                  <Link key={category.category_id} href={`/san-pham?product_cate=${category.category_id}`}>
                    {category.product_category.name}
                  </Link>
                </>
              ))}
            </span>
          </ProductInfoItem>

          <ProductInfoItem>
            {isPreOrder ? (
              <span>
                <strong>Hàng đặt trước</strong> (thời gian chuẩn bị hàng từ {data.preparation_time} ngày)
              </span>
            ) : (
              `${variationSelected ? variationSelected.stock : totalStock} sản phẩm có sẵn hàng`
            )}
          </ProductInfoItem>

          {screenWidth && screenWidth > 991 && (
            <ProductAddToCard
              isPreOrder={isPreOrder}
              variationSelected={variationSelected}
              quantity={quantity}
              onChangeQuantity={setQuantity}
              onAddToCard={onAddToCart}
            />
          )}

          <ProductButtonShare />
        </Col>
      </Row>

      <ConfigProvider theme={{ token: { paddingMD: 16, paddingContentHorizontalLG: 16 } }}>
        {contextHolder}
      </ConfigProvider>
    </ProductInformation>
  );
};

export default ProductInformationComponent;
