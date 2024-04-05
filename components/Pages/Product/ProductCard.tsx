import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled } from 'styled-components';

import { convertToSlug, priceFormatter } from 'functions';

import { ProductType } from 'interface/Product';

import { TextLineClamp, maxMedia } from 'lib/styles';

const Wrapper = styled.div`
  position: relative;
`;
const ProductBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  background-color: #ea3335;

  cursor: default;

  ${maxMedia.xsmall} {
    top: 12px;
    right: 12px;
  }
`;
const ProductImage = styled.div`
  aspect-ratio: 0.76;
  background-color: #eee;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const ProductName = styled(TextLineClamp)`
  margin: 16px 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};

  a,
  a:hover {
    color: currentColor;
    transition: color 0.1s;
  }
  ${Wrapper}:hover & {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
const ProductPrice = styled.p`
  margin-bottom: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
`;
const ProductOldPrice = styled.p`
  margin-bottom: 0;
  font-size: 14px;
  color: #acacba;
  text-decoration: line-through;
`;

type Props = { data: ProductType };

const ProductCard = ({ data }: Props) => {
  const { query } = useRouter();
  const { id, name, image, background_color, variation_price, price_min_max } = data;
  const link = `/san-pham/${convertToSlug(name)}--${id}${query.room ? `?room=${query.room}` : ''}`;
  const price = [price_min_max.aggregate.min.price, price_min_max.aggregate.max.price];
  const promotionPrice = [
    price_min_max.aggregate.min.promotion_price,
    price_min_max.aggregate.max.promotion_price,
  ];
  const isPromotion = variation_price.some((i) => i.price !== i.promotion_price);

  return (
    <Wrapper>
      {isPromotion && <ProductBadge>SALE</ProductBadge>}
      <ProductImage style={{ backgroundColor: background_color }}>
        <Link href={link}>
          <img src={image} alt='' loading='lazy' />
        </Link>
      </ProductImage>
      <ProductName title={name}>
        <Link href={link}>{name}</Link>
      </ProductName>
      <ProductPrice>
        {promotionPrice[0] !== promotionPrice[1] || price[0] !== price[1]
          ? `${priceFormatter(promotionPrice[0] ?? price[0])} - ${priceFormatter(
              promotionPrice[1] ?? price[1],
            )}`
          : priceFormatter(promotionPrice[0] ?? price[0])}
      </ProductPrice>
      {isPromotion && (
        <ProductOldPrice>
          {price[0] !== price[1]
            ? `${priceFormatter(price[0])} - ${priceFormatter(price[1])}`
            : priceFormatter(price[0])}
        </ProductOldPrice>
      )}
    </Wrapper>
  );
};

export default ProductCard;
