import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { maxMedia } from 'lib/styles';

const Content = styled.div`
  font-size: 16px;
  text-align: justify;
  h1 {
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.2;
    color: ${({ theme }) => theme.palette.common.black};
  }
  h2 {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.common.black};
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.common.black};
  }
  p {
    font-size: 1em;
    font-weight: 500;
    line-height: 1.56;
    color: ${({ theme }) => theme.textColor};
  }
  a {
    text-decoration: underline;
    color: #1890ff;
  }

  ${maxMedia.small} {
    h1 {
      margin-bottom: 24px;
      font-size: 20px;
    }
    h2 {
      font-size: 16px;
    }
    p {
      margin-bottom: 0.5em;
    }
  }
`;

const HelpCenterContent = ({ children }: { children: ReactNode }) => {
  return <Content>{children}</Content>;
};

export default HelpCenterContent;
