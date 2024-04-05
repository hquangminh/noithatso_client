import { styled } from 'styled-components';
import { Carousel, CarouselProps } from 'antd';

import BannerCarouselItem from 'components/Pages/HomePage/BannerCarouselItem';

import { HomePageBannerType } from 'interface/HomePage';

import { minMedia } from 'lib/styles';

const BannerWrapper = styled.section`
  .ant-carousel {
    .slick-slide.slick-active div:has(h2),
    .slick-slide.slick-active img {
      transform: unset;
      opacity: 1;
      ${minMedia.xsmall} {
        transition: transform 1s ease;
        transition-delay: 0.5s;
      }
    }
    .slick-slide.slick-active img {
      transition: transform 0.5s ease;
      transition-delay: 0.5s;
    }
    .slick-dots {
      li {
        width: 8px;
        margin-inline: 8px;
        button {
          height: 8px;
          border-radius: 50%;
          background: ${({ theme }) => theme.palette.common.gray};
        }
        &.slick-active {
          width: 30px;
          button {
            background: ${({ theme }) => theme.palette.common.gray};
            border-radius: 100px;
          }
        }
      }
    }
  }
`;

const HomePageBannerCarouselContainer = ({ data }: { data: HomePageBannerType[] }) => {
  const carouselProps: CarouselProps = {
    infinite: true,
    draggable: true,
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <BannerWrapper>
      <Carousel {...carouselProps}>
        {data.map((item, index) => (
          <BannerCarouselItem key={index} data={item} />
        ))}
      </Carousel>
    </BannerWrapper>
  );
};

export default HomePageBannerCarouselContainer;
