import { ReactNode } from 'react';

import { styled } from 'styled-components';

import { Container, maxMedia } from 'lib/styles';

const Section = styled.section`
  padding: 80px 0;
`;
const SectionTitle = styled.div`
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  color: ${({ theme }) => theme.palette.common.black};

  ${maxMedia.xsmall} {
    margin-bottom: 12px;
    font-size: 24px;
    text-align: left;
  }
`;

type Props = { title: string; children: ReactNode };

const SectionContent = ({ title, children }: Props) => {
  return (
    <Section>
      <Container>
        <SectionTitle>{title}</SectionTitle>
        {children}
      </Container>
    </Section>
  );
};

export default SectionContent;
