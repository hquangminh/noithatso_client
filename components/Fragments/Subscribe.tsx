import { useRef, useState } from 'react';

import { styled } from 'styled-components';
import { useMutation } from '@apollo/client';
import { Button, ConfigProvider, Input, InputRef, Space, notification } from 'antd';

import { isEmail } from 'functions';
import { useDevice } from 'lib/hooks';
import { API_SubscribeEmail } from 'graphql/subscribe/mutation';

import { Container, maxMedia } from 'lib/styles';

const Wrapper = styled.section`
  padding: 88px 0 64px;
  text-align: center;
  background-image: url('/static/images/subscribe-background.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .subscribe-box {
    margin: 0 auto;
    max-width: 540px;
    ${maxMedia.small} {
      padding-bottom: 78px;
    }
  }
  .subscribe-title {
    margin-bottom: 8px;
    font-size: 40px;
    font-weight: bold;
    line-height: 1.2;
    color: ${({ theme }) => theme.palette.common.white};
    ${maxMedia.small} {
      font-size: 20px;
    }
  }
  .subscribe-caption {
    margin-bottom: 32px;
    font-size: 18px;
    color: ${({ theme }) => theme.palette.common.white};
    ${maxMedia.small} {
      font-size: 14px;
    }
  }
  .subscribe-input {
    border-radius: 0;
    font-weight: 500;
    &::placeholder {
      color: #94949c;
    }
  }
  .subscribe-btn {
    height: 44px;
    text-transform: uppercase;
    box-shadow: none;
  }
`;

const SubscribeFragment = () => {
  const [api, contextHolder] = notification.useNotification();
  const { device } = useDevice();

  const [email, setEmail] = useState<string>();
  const inputRef = useRef<InputRef>(null);

  const [subscribeEmail, { loading }] = useMutation(API_SubscribeEmail);

  const onSubscribe = async () => {
    if (!email) {
      if (device === 'desktop') inputRef.current?.focus();
      api.info({
        key: 'subscribe-email-required',
        message: 'Đăng ký nhận bản tin',
        description: 'Vui lòng nhập địa chỉ Email của bạn để đăng ký',
      });
    } else if (!isEmail(email)) {
      if (device === 'desktop') inputRef.current?.focus();
      api.warning({
        key: 'subscribe-email-format',
        message: 'Đăng ký nhận bản tin',
        description: 'Địa chỉ email không hợp lệ',
      });
    } else {
      subscribeEmail({ variables: { email } })
        .then(() => {
          setEmail('');
          api.success({
            key: 'subscribe-email-success',
            message: 'Đăng ký nhận bản tin',
            description: 'Đã đăng ký thành công',
          });
        })
        .catch((err) => {
          if (err.message.includes('subscribe_email_key'))
            api.info({
              key: 'subscribe-email-exist',
              message: 'Đăng ký nhận bản tin',
              description: 'Email này đã đăng ký trước đó',
            });
          else
            api.info({
              key: 'subscribe-email-error',
              message: 'Đăng ký nhận bản tin',
              description: 'Lỗi của chúng tôi. Vui lòng thử lại sau.',
            });
        });
    }
  };

  return (
    <Wrapper>
      {contextHolder}
      <Container>
        <div className='subscribe-box'>
          <p className='subscribe-title'>Bản tin</p>
          <p className='subscribe-caption'>
            Đăng ký nhận bản tin để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin
            giảm giá khác.
          </p>
          <Space.Compact block style={{ maxWidth: 440, margin: '0 auto' }}>
            <Input
              ref={inputRef}
              value={email}
              placeholder='Nhập email của bạn'
              spellCheck='false'
              className='subscribe-input'
              onChange={(e) => setEmail(e.target.value)}
            />
            <ConfigProvider theme={{ token: { colorPrimary: '#181818', borderRadius: 0 } }}>
              <Button type='primary' loading={loading} className='subscribe-btn' onClick={onSubscribe}>
                Đăng ký
              </Button>
            </ConfigProvider>
          </Space.Compact>
        </div>
      </Container>
    </Wrapper>
  );
};

export default SubscribeFragment;
