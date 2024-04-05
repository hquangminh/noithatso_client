import { ReactNode } from 'react';
import { styled } from 'styled-components';

const SectionWrapper = styled.section`
  margin-bottom: 40px;
`;

const SearchResultSection = ({ children }: { children: ReactNode }) => {
  return <SectionWrapper>{children}</SectionWrapper>;
};

export default SearchResultSection;
