import React from 'react';
import { styled } from 'styled-components';
import { maxMedia } from 'lib/styles';

const Wrapper = styled.div`
  border: solid 1px #e3e3e8;
`;
const Header = styled.div`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.palette.common.black};
  background-color: #f6f7f8;
`;
const Content = styled.div`
  padding: 12px 24px 24px;

  ${maxMedia.medium} {
    padding: 12px 16px 24px;
  }
`;

type Props = { title: string; children: React.ReactNode };

const CheckoutSection = ({ title, children }: Props) => {
  return (
    <Wrapper>
      <Header>{title}</Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default CheckoutSection;
