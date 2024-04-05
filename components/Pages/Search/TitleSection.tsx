import { ReactNode } from 'react';
import { styled } from 'styled-components';

const SectionTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.black};
`;

const SearchTitleSection = ({ children }: { children: ReactNode }) => {
  return <SectionTitle>{children}</SectionTitle>;
};

export default SearchTitleSection;
