import React, { ReactNode, useState } from 'react';
import Link from 'next/link';

import { styled } from 'styled-components';
import { Col, Collapse, Row } from 'antd';

import { useWindowSize } from 'lib/hooks';

import Logo from 'components/Fragments/Logo';
import PartnerRegistrationModal from 'components/Fragments/PartnerRegistration';
import { FacebookFillIcon } from 'components/Fragments/Icons';

import { Container, maxMedia, minMedia } from 'lib/styles';

const Footer = styled.footer`
  padding: 64px 0;
  color: ${({ theme }) => theme.palette.common.white};
  background-color: ${({ theme }) => theme.palette.common.black};
  overflow: hidden;

  .Logo_Main {
    color: ${({ theme }) => theme.palette.common.white};
  }

  .ant-collapse.ant-collapse-ghost {
    border-radius: 0;

    ${maxMedia.medium} {
      border-bottom: solid 1px rgba(227, 227, 232, 0.18);
    }

    .ant-collapse-item {
      .ant-collapse-header {
        padding: 0;
        padding-bottom: 16px;
        .ant-collapse-expand-icon {
          color: #e3e3e8;
        }
        ${minMedia.medium} {
          cursor: auto;
        }
        ${maxMedia.medium} {
          padding-top: 12px;
          padding-bottom: 12px;
        }
      }
      .ant-collapse-content .ant-collapse-content-box {
        padding: 0;
      }
    }
  }

  ${maxMedia.xsmall} {
    padding: 32px 0;
  }
`;
const Introduction = styled.div`
  margin-top: 12px;
  font-size: 16px;

  ${maxMedia.medium} {
    margin-bottom: 24px;
  }
`;
const MenuHeader = styled.h4`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.white};

  ${maxMedia.xsmall} {
    font-size: 14px;
  }
`;
const MenuList = styled.ul`
  padding-left: 0;
`;
const MenuItem = styled.li`
  display: block;
  color: ${({ theme }) => theme.palette.common.white};
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  span {
    cursor: pointer;
  }
  a,
  a:hover {
    color: currentColor;
  }
`;
const Social = styled.ul`
  margin-top: 24px;
  margin-bottom: 0;
  padding-left: 0;

  ${maxMedia.xsmall} {
    margin-top: 32px;
    display: flex;
    justify-content: center;
  }
`;
const SocialItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .anticon {
    font-size: 24px;
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const FooterGlobal = () => {
  const [screenW] = useWindowSize();
  const [openPartnerRegister, setOpenPartnerRegister] = useState<boolean>(false);

  const isDesktop = screenW && screenW > 1024;
  const isMobile = screenW && screenW < 992;

  return (
    <Footer>
      <Container>
        <Row justify='space-between'>
          <Col md={24} flex={isDesktop ? '310px' : undefined}>
            <Logo footer />
            <Introduction>
              Website thương mại điện tử chuyên cung cấp về các sản phẩm nội thất hàng đầu Việt Nam
            </Introduction>
            {isDesktop && <SocialContainer />}
          </Col>
          <Col span={24} flex={isDesktop ? 'calc(100% - 310px)' : undefined}>
            <Row justify='end' gutter={isDesktop ? [120, 0] : undefined}>
              <Col span={24} flex={isDesktop ? '376px' : undefined}>
                <CollapseMenu title='Liên hệ chúng tôi' keyPanel='contact'>
                  <MenuList>
                    <MenuItem>
                      Tầng 1, Số 179 Trần Hưng Đạo, Phường An Hải Bắc, Quận Sơn Trà, Thành phố Đà Nẵng, Việt
                      Nam.
                    </MenuItem>
                    <MenuItem>
                      <a href='tel:+84 90 593 01 63'>+84 90 593 01 63</a>
                    </MenuItem>
                    <MenuItem>
                      <a href='mailto:contact@noithatso.com.vn'>contact@noithatso.com.vn</a>
                    </MenuItem>
                    <MenuItem>
                      <span onClick={() => setOpenPartnerRegister(true)}>Đăng ký đối tác</span>
                    </MenuItem>
                  </MenuList>
                </CollapseMenu>
              </Col>
              <Col span={24} flex={isDesktop ? 'none' : undefined}>
                <CollapseMenu title='Điều khoản' keyPanel='terms'>
                  <MenuList>
                    <MenuItem>
                      <Link href='/dieu-khoan-su-dung'>Điều khoản sử dụng</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/chinh-sach-bao-mat'>Chính sách bảo mật</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/phuong-cham-ban-hang'>Phương châm bán hàng</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/thoa-thuan-nguoi-dung'>Thỏa thuận người dùng</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/nghia-vu-va-chinh-sach-chung'>Nghĩa vụ và chính sách chung</Link>
                    </MenuItem>
                  </MenuList>
                </CollapseMenu>
              </Col>
            </Row>
          </Col>
          {isMobile && (
            <Col span={24}>
              <SocialContainer />
            </Col>
          )}
        </Row>
      </Container>

      <PartnerRegistrationModal open={openPartnerRegister} onClose={() => setOpenPartnerRegister(false)} />
    </Footer>
  );
};

export default FooterGlobal;

type CollapseMenuProps = { title: string; keyPanel: string; children: ReactNode };
const CollapseMenu = ({ title, keyPanel, children }: CollapseMenuProps) => {
  const [screenW] = useWindowSize();
  const isDesktop = typeof screenW === 'number' && screenW > 1024;
  const isMobile = typeof screenW === 'number' && screenW < 992;
  return (
    <Collapse ghost activeKey={isDesktop ? [keyPanel] : undefined} expandIconPosition='end'>
      <Collapse.Panel header={<MenuHeader>{title}</MenuHeader>} key={keyPanel} showArrow={isMobile}>
        {children}
      </Collapse.Panel>
    </Collapse>
  );
};

const SocialContainer = () => {
  return (
    <Social>
      <SocialItem>
        <a href='https://www.facebook.com/noithatso' target='_blank'>
          <FacebookFillIcon />
        </a>
      </SocialItem>
    </Social>
  );
};
