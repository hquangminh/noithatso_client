import { styled } from 'styled-components';

import { useWindowSize } from 'lib/hooks';

import CartProductItem from './ProductItem';

import { ProductDetail } from 'interface/Product';
import { ProductCart, ProductCartStatus } from 'interface/Cart';

import { maxMedia } from 'lib/styles';

const Table = styled.div`
  border: solid 1px #e3e3e8;
`;
const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 136px 0.8fr;
  column-gap: 24px;
  padding: 10px 24px;
  background-color: #f6f7f8;
`;
const TableHeaderMobile = styled(TableHeader)`
  display: block;
  text-align: center;
`;
const TableTitle = styled.p`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};
`;
const TableBody = styled.div`
  padding: 0 24px;
  max-height: 426px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
    padding: 0 5px;
  }
  &::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    border-radius: 30px;
    background-clip: padding-box;
    background-color: #d9d9d9;
  }
  &:hover::-webkit-scrollbar-thumb {
  }

  ${maxMedia.custom(768)} {
    padding: 0 12px;
  }
`;

type Props = { cart: ProductCart[]; products: ProductDetail[] };

const CartProductList = ({ cart, products }: Props) => {
  const [screenW] = useWindowSize();
  const isMobile = screenW && screenW <= 768;

  return (
    <Table>
      {!isMobile ? (
        <TableHeader>
          <TableTitle>Sản phẩm</TableTitle>
          <TableTitle style={{ textAlign: 'center' }}>Số lượng</TableTitle>
          <TableTitle style={{ textAlign: 'center', marginRight: 16 }}>Tổng phụ</TableTitle>
        </TableHeader>
      ) : (
        <TableHeaderMobile>
          <TableTitle>Thông tin sản phẩm</TableTitle>
        </TableHeaderMobile>
      )}
      <TableBody>
        {[
          ...cart.filter((i) =>
            [ProductCartStatus.NORMAL, ProductCartStatus.PRICE_CHANGE].includes(i.status),
          ),
          ...cart.filter(
            (i) => ![ProductCartStatus.NORMAL, ProductCartStatus.PRICE_CHANGE].includes(i.status),
          ),
        ].map((item, index) => {
          const productData = products.find((i) => i.id === item.product_id);
          return <CartProductItem key={index} productCart={item} productData={productData} />;
        })}
      </TableBody>
    </Table>
  );
};

export default CartProductList;
