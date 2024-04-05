import { CSSProperties } from 'react';

import { styled } from 'styled-components';
import { Dropdown, Space, message, theme } from 'antd';

import { ShareOutlineIcon } from 'components/Fragments/Icons';

import { maxMedia } from 'lib/styles';
import { useDevice } from 'lib/hooks';

const FB_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

const Wrapper = styled.div`
  margin-top: 18px;
  .product-btn-share {
    display: inline-flex;
    align-items: center;
    column-gap: 4px;
    cursor: pointer;
  }
  .anticon {
    font-size: 20px;
  }
  span:not([class]) {
    display: inline-block;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    color: #121212;
  }

  ${maxMedia.small} {
    margin-bottom: 16px;
  }
`;
const ShareDropdown = styled.div`
  img {
    width: 35px;
    cursor: pointer;
  }
`;

const ProductButtonShare = () => {
  const { token } = theme.useToken();
  const { device } = useDevice();

  const handleShare = (social: 'facebook' | 'messenger' | 'pinterest') => {
    switch (social) {
      case 'facebook':
        window.open(
          'https://www.facebook.com/dialog/share?' +
            `app_id=${FB_APP_ID}` +
            `&href=${encodeURIComponent(location.href)}`,
          'share-facebook',
        );
        break;
      case 'messenger':
        window.open(
          'https://www.facebook.com/dialog/send?' +
            `app_id=${FB_APP_ID}` +
            `&link=${encodeURIComponent(location.href)}` +
            `&redirect_uri=${encodeURIComponent(window.location.host)}`,
          'send-messenger',
        );
        break;
      case 'pinterest':
        window.open('http://pinterest.com/pin/create/link/?' + `url=${encodeURIComponent(location.href)}`);
        break;
      default:
        break;
    }
  };

  const handleCopyClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => message.success({ key: 'product-share-copy', content: 'Liên kết đã được sao chép' }));
  };

  const handleShareByDevice = () => {
    if (navigator.share) navigator.share({ title: document.title, url: window.location.href });
  };

  const contentStyle: CSSProperties = {
    padding: token.paddingSM,
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <Wrapper className='product-share'>
      <Dropdown
        trigger={['click']}
        placement='bottom'
        arrow={{ pointAtCenter: true }}
        dropdownRender={() => (
          <ShareDropdown style={contentStyle}>
            <Space size={12}>
              <img src='/static/icons/facebook.webp' alt='' onClick={() => handleShare('facebook')} />
              {device && device === 'desktop' && (
                <img src='/static/icons/messenger.png' alt='' onClick={() => handleShare('messenger')} />
              )}
              <img src='/static/icons/pinterest.png' alt='' onClick={() => handleShare('pinterest')} />
              <img src='/static/icons/copy-link.png' alt='' onClick={handleCopyClipboard} />
              {device && (device === 'mobile' || device === 'tablet') && (
                <img src='/static/icons/share-more.webp' alt='' onClick={handleShareByDevice} />
              )}
            </Space>
          </ShareDropdown>
        )}
      >
        <div className='product-btn-share'>
          <ShareOutlineIcon />
          <span>Chia sẻ</span>
        </div>
      </Dropdown>
    </Wrapper>
  );
};

export default ProductButtonShare;
