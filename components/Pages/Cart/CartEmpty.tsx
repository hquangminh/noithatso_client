import { styled } from 'styled-components';

import ResultFragment from 'components/Fragments/Result';
import { CartEmptyIcon } from 'components/Fragments/Icons';

const Wrapper = styled.div`
  padding: 40px 0;
  text-align: center;
  .cart-empty-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.palette.common.black};
  }
  .ant-result {
    padding-top: 180px;
    padding-bottom: 140px;
  }
`;

const CartEmpty = () => {
  return (
    <Wrapper>
      <div className='cart-empty-title'>Sản phẩm trong giỏ hàng</div>
      <ResultFragment icon={<CartEmptyIcon />} title='Bạn chưa thêm sản phẩm vào giỏ hàng.' />
    </Wrapper>
  );
};

export default CartEmpty;
