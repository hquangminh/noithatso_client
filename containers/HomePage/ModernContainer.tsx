import { styled } from 'styled-components';
import { Button, Col, Row } from 'antd';

import { Container as ContainerStyle, maxMedia, minMedia } from 'lib/styles';

const Modern = styled.section`
  position: relative;
  padding-top: 50px;
  background: linear-gradient(180deg, #303030 calc(100% - 80px), ${({ theme }) => theme.bodyColor} 80px);
  overflow: hidden;

  .style-modern-product {
    width: 100%;
    ${minMedia.medium} {
      animation: 6.4s ease-in-out 0s infinite normal none running Animation;
      @keyframes Animation {
        0% {
          transform: translateY(-20px);
        }
        50% {
          transform: translateY(0px);
        }
        100% {
          transform: translateY(-20px);
        }
      }
    }
    ${maxMedia.medium} {
      max-width: 400px;
    }
  }
`;
const Container = styled(ContainerStyle)`
  ${minMedia.custom(1024)} {
    position: relative;
    z-index: 1;
    &:after {
      position: absolute;
      content: '';
      top: 45px;
      left: 17px;
      z-index: -1;
      height: 200px;
      width: 100vw;
      background-image: url('/static/images/homepage-modern-background.webp');
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
  }
`;
const Content = styled.div`
  padding: 60px 0 110px;
  .style-modern-btn-explore {
    height: 44px;
    padding: 2px 32px;
    font-size: 12px;
    line-height: 1;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border-radius: 0;
    background-color: transparent;
  }

  ${maxMedia.custom(768)} {
    padding: 0 0 50px;
    text-align: center;
  }
`;
const Title = styled.div`
  margin-bottom: 30px;
  max-width: 690px;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.43;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  span {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  ${maxMedia.medium} {
    font-size: 20px;
    br {
      display: none;
    }
  }
`;

const ModernContainer = () => {
  return (
    <Modern>
      <Container>
        <Row>
          <Col span={24} md={15}>
            <Content>
              <Title>
                Sắp xếp ngôi nhà của bạn theo phong cách <span>nội thất hiện đại</span> <br />
                của chúng tôi
              </Title>
              <Button className='style-modern-btn-explore'>KHÁM PHÁ NGAY</Button>
            </Content>
          </Col>
          <Col span={24} md={9} style={{ textAlign: 'center' }}>
            <img
              className='style-modern-product'
              src='/static/images/homepage-modern-product.webp'
              alt=''
              loading='lazy'
            />
          </Col>
        </Row>
      </Container>
    </Modern>
  );
};

export default ModernContainer;
