import { maxMedia } from 'lib/styles';
import { styled } from 'styled-components';

const Header = styled.div`
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.black};
  text-align: center;

  ${maxMedia.custom(768)} {
    margin-bottom: 16px;
    font-size: 16px;
  }
`;

const CartHeader = ({ total }: { total: number }) => {
  return <Header>{total} Sản phẩm trong giỏ hàng</Header>;
};

export default CartHeader;
