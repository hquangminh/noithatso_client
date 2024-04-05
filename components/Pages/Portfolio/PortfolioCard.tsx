import Link from 'next/link';

import { styled } from 'styled-components';

import { convertToSlug } from 'functions';

import { PortfolioType } from 'interface/Portfolio';

import { TextLineClamp } from 'lib/styles';

const Wrapper = styled.div`
  &:hover {
    img {
      transform: scale(1.05);
    }
    p[line] {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
const PortfolioImage = styled.div`
  margin-bottom: 8px;
  aspect-ratio: 1/1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 150ms ease-in-out;
  }
`;
const PortfolioName = styled(TextLineClamp)`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  a,
  a:hover {
    color: currentColor;
    transition: color 150ms ease-in-out;
  }
`;

type Props = { data: PortfolioType };

const PortfolioCard = ({ data }: Props) => {
  const link = '/y-tuong-thiet-ke/' + convertToSlug(data.name) + '--' + data.id;
  return (
    <Wrapper>
      <PortfolioImage>
        <Link href={link} aria-label={`Xem chi tiết bản thiết kế cho ${data.name}`}>
          <img src={data.image} alt='' loading='lazy' />
        </Link>
      </PortfolioImage>
      <PortfolioName line={2}>
        <Link href={link}>{data.name}</Link>
      </PortfolioName>
    </Wrapper>
  );
};

export default PortfolioCard;
