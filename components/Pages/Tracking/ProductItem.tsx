import { styled } from 'styled-components';
import { priceFormatter } from 'functions';
import { OrderProductItem } from 'interface/Order';
import { maxMedia, minMedia } from 'lib/styles';

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-template-areas:
    'image name'
    'image information';
  grid-gap: 4px 12px;

  font-size: 16px;

  ${maxMedia.small} {
    font-size: 14px;
  }
`;
const ProductImage = styled.img`
  grid-area: image;
  align-self: center;
  width: 64px;
  height: 78px;
  object-fit: contain;
  background-color: #f8f8f8;
`;
const ProductName = styled.p`
  grid-area: name;
  align-self: flex-end;
  margin-bottom: 0px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;
const ProductInfo = styled.div`
  grid-area: information;
  color: ${({ theme }) => theme.textColor};

  ${minMedia.small} {
    .quantity,
    br {
      display: none;
    }
  }
  ${maxMedia.small} {
    .variation {
      margin-top: 8px;
      span {
        display: none;
      }
    }
  }
`;

type Props = { data: OrderProductItem };

const ProductItem = ({ data }: Props) => {
  return (
    <ProductWrapper>
      <ProductImage src={data.product_info.image} />
      <ProductName>{data.product_info.name}</ProductName>
      <ProductInfo>
        {priceFormatter(data.product_info.price)}
        <span className='quantity'>&nbsp;x{data.delivery_quantity}</span>
        <br />
        {data.product_info.variation && (
          <span className='variation'>
            <span>&nbsp;|&nbsp;</span>Phân loại: {data.product_info.variation}
          </span>
        )}
      </ProductInfo>
    </ProductWrapper>
  );
};
export default ProductItem;
