import { useEffect, useRef, useState } from 'react';

import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';
import { Carousel, CarouselProps } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

import { useElementSize, useIsFirstRender } from 'lib/hooks';
import { API_GetPartner } from 'graphql/partner/query';

import { Container } from 'lib/styles';

const OurPartner = styled.section<{ $CarouselCenter: boolean }>`
  padding-top: 80px;
  ${({ $CarouselCenter }) => {
    if ($CarouselCenter)
      return `
        .slick-track {
          width: 100% !important;
          display: flex !important;
          justify-content: center;
          transform: unset !important;
        }
      `;
  }}
`;
const PartnerItem = styled.div`
  width: 152px !important;
  text-align: center;
  img {
    display: inline-block !important;
    width: 120px;
    height: 60px;
    object-fit: contain;
  }
`;

const OurPartnerContainer = () => {
  const [carouselPlay, setCarouselPlay] = useState<boolean>(false);
  const [containerRef, { width }] = useElementSize();
  const isFirstRender = useIsFirstRender();
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    if (carouselRef.current && !isFirstRender) {
      const { slideCount } = carouselRef.current?.innerSlider.state;
      if (width - 32 < slideCount * 152) setCarouselPlay(true);
    }
  }, [carouselRef, isFirstRender, width]);

  const { loading, error, data } = useQuery<{ partner: { name: string; logo: string }[] }>(API_GetPartner, {
    fetchPolicy: 'network-only',
  });

  if (loading || error) return null;

  const carouselProps: CarouselProps = {
    dots: false,
    autoplay: carouselPlay,
    infinite: carouselPlay,
    // centerMode: carouselPlay,
    variableWidth: true,
    centerPadding: '0px',
  };

  return (
    <OurPartner $CarouselCenter={!carouselPlay}>
      <Container ref={containerRef}>
        <Carousel ref={carouselRef} {...carouselProps}>
          {data?.partner.map((item, index) => (
            <PartnerItem key={index} title={item.name}>
              <img src={item.logo} alt={item.name} loading='lazy' />
            </PartnerItem>
          ))}
        </Carousel>
      </Container>
    </OurPartner>
  );
};

export default OurPartnerContainer;
