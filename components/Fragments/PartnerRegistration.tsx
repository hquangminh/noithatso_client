import { Fragment, useState } from 'react';

import { useMutation } from '@apollo/client';
import { styled, useTheme } from 'styled-components';
import {
  Button,
  ConfigProvider,
  Form,
  FormInstance,
  FormProps,
  Input,
  Modal,
  ModalProps,
  notification,
} from 'antd';

import { removeSpaceString } from 'functions';
import { EmailFormat } from 'lib/constants/Regex';
import { API_PartnerRegister } from 'graphql/partner/mutation';

import { maxMedia } from 'lib/styles';
import { CheckoutSuccessIcon } from './Icons';

const FormWrapper = styled.div`
  border: solid 1px #e3e3e8;
  .ant-form-item {
    &:not(.ant-form-item-has-error) {
      input {
        border-color: transparent;
      }
    }
    .ant-form-item-label {
      padding-bottom: 4px;
      label {
        font-size: 12px;
        font-weight: 500;
        color: #161723;
        &.ant-form-item-required {
          &:before {
            display: none !important;
          }
          &:after {
            display: inline-block;
            margin: 0;
            content: '*';
            color: #ff4d4f;
            font-size: 14px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  .ant-input {
    font-size: 14px;
    font-weight: 500;
    background-color: #f9f9f9;
  }

  ${maxMedia.xsmall} {
    border: none;
  }
`;
const FormTitle = styled.div`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.palette.common.black};
  background-color: #f6f7f8;
`;
const FormContent = styled.div`
  padding: 16px 24px 0;

  ${maxMedia.xsmall} {
    padding: 16px 0 0;
  }
`;
const FormFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  margin-top: 24px;
  .ant-btn {
    font-weight: 500;
  }

  ${maxMedia.xsmall} {
    grid-template-columns: 100%;
    row-gap: 16px;
    .ant-btn:last-child {
      order: -1;
    }
  }
`;

type Props = { open: boolean; onClose: () => void };

const PartnerRegistrationModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();

  const modalProps: ModalProps = {
    open,
    width: 650,
    centered: true,
    closable: false,
    footer: null,
    destroyOnClose: true,
    afterClose: form.resetFields,
  };

  return (
    <ConfigProvider theme={{ token: { paddingMD: 24, borderRadius: 0 } }}>
      <Modal {...modalProps}>
        <FormRegister form={form} onClose={onClose} />
      </Modal>
    </ConfigProvider>
  );
};

export default PartnerRegistrationModal;

type FormRegisterProps = { form: FormInstance<any>; onClose: () => void };
const FormRegister = ({ form, onClose }: FormRegisterProps) => {
  const theme = useTheme();

  const [succeed, setSucceed] = useState<boolean>(false);
  const [onRegister, { loading }] = useMutation(API_PartnerRegister);

  if (succeed) return <RegisterSucceed onClose={onClose} />;

  const onSubmit = async (values: Record<string, string>) => {
    const { name, registrant_name } = values;
    const data = {
      ...values,
      name: removeSpaceString(name),
      registrant_name: removeSpaceString(registrant_name),
    };
    await onRegister({ variables: { object: data } })
      .then(() => setSucceed(true))
      .catch(() =>
        notification.error({
          key: 'partner-register-fail',
          message: 'Đăng ký không thành công',
          description: (
            <>
              Lỗi của chúng tôi, không phải của bạn.
              <br />
              Vui lòng liên hệ chúng tôi để được hỗ trợ.
            </>
          ),
        }),
      );
  };

  const formProps: FormProps = {
    form,
    layout: 'vertical',
    validateMessages: { required: 'Vui lòng nhập ${label}', whitespace: 'Vui lòng nhập ${label} hợp lệ' },
    onFinish: onSubmit,
  };

  return (
    <Fragment>
      <FormWrapper>
        <FormTitle>Đăng ký đối tác</FormTitle>
        <FormContent>
          <Form {...formProps}>
            <Form.Item
              name='registrant_name'
              label='Họ và tên'
              rules={[{ required: true }, { whitespace: true }]}
            >
              <Input size='large' placeholder='Nhập họ và tên' />
            </Form.Item>

            <Form.Item
              name='name'
              label='Tên doanh nghiệp'
              rules={[{ required: true }, { whitespace: true }]}
            >
              <Input size='large' placeholder='Nhập tên doanh nghiệp' />
            </Form.Item>

            <Form.Item name='phone_number' label='Số điện thoại' rules={[{ required: true }]}>
              <Input
                size='large'
                maxLength={13}
                placeholder='Nhập số điện thoại'
                onChange={(e) => form.setFieldValue('phone_number', e.target.value.replace(/\D+/g, ''))}
              />
            </Form.Item>

            <Form.Item
              name='email'
              label='Địa chỉ email'
              rules={[
                { required: true },
                { pattern: EmailFormat, message: 'Vui lòng nhập Địa chỉ email hợp lệ' },
              ]}
            >
              <Input size='large' placeholder='Nhập địa chỉ email' />
            </Form.Item>
          </Form>
        </FormContent>
      </FormWrapper>
      <FormFooter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: theme?.palette.common.black,
              colorBorder: theme?.palette.common.black,
              colorText: theme?.palette.common.black,
              controlOutline: 'none',
              fontSizeLG: 12,
            },
          }}
        >
          <Button size='large' disabled={loading} onClick={onClose}>
            HUỶ
          </Button>
          <Button size='large' type='primary' loading={loading} onClick={form.submit}>
            ĐĂNG KÝ
          </Button>
        </ConfigProvider>
      </FormFooter>
    </Fragment>
  );
};

const RegisterSucceed_Wrapper = styled.div`
  text-align: center;
  .register-partner-succeed-icon {
    font-size: 120px;
    ${maxMedia.xsmall} {
      font-size: 64px;
    }
  }
  .register-partner-succeed-title {
    margin: 16px 0 0;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.common.black};
    ${maxMedia.xsmall} {
      font-size: 14px;
    }
  }
  .register-partner-succeed-caption {
    margin: 4px 0 0;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
    ${maxMedia.xsmall} {
      font-size: 12px;
    }
  }
  .register-partner-succeed-button {
    margin-top: 56px;
    font-weight: 500;
    ${maxMedia.xsmall} {
      width: 100%;
      margin-top: 16px;
    }
  }
`;

const RegisterSucceed = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  return (
    <RegisterSucceed_Wrapper>
      <CheckoutSuccessIcon className='register-partner-succeed-icon' />
      <p className='register-partner-succeed-title'>Cảm ơn bạn đã đăng ký đối tác với Nội Thất Số</p>
      <p className='register-partner-succeed-caption'>
        Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất.
      </p>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme?.palette.common.black,
            colorBorder: theme?.palette.common.black,
            colorText: theme?.palette.common.black,
            controlOutline: 'none',
            fontSizeLG: 12,
            paddingContentHorizontal: 63,
          },
        }}
      >
        <Button className='register-partner-succeed-button' size='large' type='primary' onClick={onClose}>
          HOÀN THÀNH
        </Button>
      </ConfigProvider>
    </RegisterSucceed_Wrapper>
  );
};
