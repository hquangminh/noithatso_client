import Link from 'next/link';

import { styled } from 'styled-components';
import { Button, Col, Row } from 'antd';

import { useDevice } from 'lib/hooks';

import { HomePageBannerType } from 'interface/HomePage';

import { Container, maxMedia, minMedia } from 'lib/styles';

const BannerItem = styled.div<{ backgroundImage?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 80px 0;
  line-height: 1.4;
  background-color: #f1f1f1;

  ${minMedia.custom(1024)} {
    max-height: 864px;
  }
  ${minMedia.small} {
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: min(calc(100% - 32px), 1440px) auto;
  }

  ${maxMedia.medium} {
    text-align: center;
  }
`;
const BannerContainer = styled(Row)`
  ${maxMedia.medium} {
    row-gap: 24px !important;
  }
`;
const BannerContent = styled.div`
  transform: translateY(30px);
  opacity: 0;
  transition: all 0s ease;
`;
const BannerTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 60px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.common.black};
  white-space: pre-wrap;
  span {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  ${maxMedia.custom(1024)} {
    font-size: 40px;
  }
  ${maxMedia.medium} {
    margin-bottom: 15px;
    font-size: 32px;
  }
  ${maxMedia.small} {
    font-size: 28px;
    white-space: normal;
  }
  ${maxMedia.xsmall} {
    margin-bottom: 4px;
  }
`;
const BannerCaption = styled.p`
  margin-bottom: 56px;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.common.black};

  ${maxMedia.medium} {
    margin-bottom: 32px;
    font-size: 16px;
  }
  ${maxMedia.xsmall} {
    font-size: 14px;
  }
`;
const BannerButton = styled(Button)`
  &.ant-btn {
    height: 44px;
    padding: 2px 32px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    color: ${({ theme }) => theme.palette.common.black};
    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.palette.common.black};
    border-radius: 0;
  }
`;
const BannerImage = styled.img`
  width: 100%;
  opacity: 0;
  transition: transform 0s ease;

  ${maxMedia.medium} {
    max-width: 600px;
    margin: 0 auto;
  }
  ${maxMedia.xsmall} {
    max-width: 320px;
    margin: 0 auto;
  }
`;

const BannerCarouselItem = ({ data }: { data: HomePageBannerType }) => {
  const { device, viewport } = useDevice();

  return (
    <BannerItem backgroundImage={data.background}>
      <Container>
        <BannerContainer
          align='middle'
          gutter={[72, 48]}
          style={{ flexDirection: viewport.width && viewport.width >= 991 ? 'row' : 'column-reverse' }}
        >
          <Col span={24} lg={13}>
            <BannerContent>
              <BannerTitle dangerouslySetInnerHTML={{ __html: data.title }} />
              <BannerCaption>{data.caption}</BannerCaption>
              {data.link && (
                <BannerButton>
                  <Link href={data.link}>KHÁM PHÁ NGAY</Link>
                </BannerButton>
              )}
            </BannerContent>
          </Col>

          <Col span={24} lg={11}>
            <BannerImage src={data.image} alt='' loading='lazy' />
          </Col>
        </BannerContainer>
      </Container>
    </BannerItem>
  );
};

export default BannerCarouselItem;
