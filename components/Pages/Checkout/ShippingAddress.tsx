import { styled } from 'styled-components';
import { Col, ConfigProvider, Form, FormProps, Input, Row, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { AliasToken } from 'antd/es/theme/internal';

import { isArrayEmpty } from 'functions';
import { EmailFormat } from 'lib/constants/Regex';
import VietnamAddress from 'lib/constants/AdministrativeBoundariesVN.json';

import CheckoutSection from './SectionContent';

const Wrapper = styled.div`
  grid-area: address;
  & > div > div:last-child {
    padding-bottom: 0;
  }
  .ant-form-item {
    .ant-form-item-label {
      padding-bottom: 4px;
      label {
        height: unset;
        font-weight: 500;
        color: #161723;
        &.ant-form-item-required {
          flex-direction: row-reverse;
        }
      }
    }
    .ant-form-item-control {
      .ant-input,
      .ant-select,
      .ant-select .ant-select-selection-item {
        font-weight: 500;
      }
      .ant-input,
      .ant-select-selector {
        &:not([class*='error']) {
          border-color: #f9f9f9;
        }
      }
    }
  }
`;

export type VietnamAddressType = {
  Id: string;
  Name: string;
  Districts: Array<{ Id: string; Name: string; Wards: Array<{ Id?: string; Name?: string; Level: string }> }>;
};

type Props = { form: FormInstance<any>; onCheckout: (values: any) => void };

const CheckoutShippingAddress = ({ form, onCheckout }: Props) => {
  const city = Form.useWatch('city', form);
  const district = Form.useWatch('district', form);

  const administrativeBoundaries: VietnamAddressType[] = VietnamAddress;
  const districtList = administrativeBoundaries.find((i) => i.Id === city)?.Districts;
  const wardList = districtList?.find((i) => i.Id === district)?.Wards.filter((i) => i.Name);

  const onFieldsChange = (changedFields: any) => {
    const fieldName = changedFields[0].name[0];
    if (fieldName === 'city') form.resetFields(['district', 'ward']);
    else if (fieldName === 'district') form.resetFields(['ward']);
  };

  const formProps: FormProps = {
    form,
    layout: 'vertical',
    labelAlign: 'left',
    validateMessages: { required: 'Vui lòng nhập ${label}' },
    onFieldsChange,
    onFinish: onCheckout,
  };

  const formStyle: Partial<AliasToken> = {
    fontSizeLG: 14,
    borderRadius: 0,
    controlOutline: 'none',
    colorText: '#424153',
    colorBgContainer: '#f9f9f9',
    colorTextPlaceholder: '#94949c',
  };

  return (
    <Wrapper>
      <CheckoutSection title='Địa chỉ giao hàng'>
        <ConfigProvider theme={{ token: formStyle }}>
          <Form {...formProps}>
            <Form.Item
              name={'name'}
              label='Họ và tên'
              rules={[
                { required: true },
                { whitespace: true, message: '${label} không hợp lệ' },
                { pattern: /^[a-zA-Z\s\u00C0-\u1EF9]*$/, message: '${label} không hợp lệ' },
              ]}
            >
              <Input size='large' maxLength={50} placeholder='Nhập họ và tên' />
            </Form.Item>

            <Row gutter={24}>
              <Col span={24} md={12}>
                <Form.Item name={'phone'} label='Số điện thoại' rules={[{ required: true }]}>
                  <Input
                    size='large'
                    placeholder='Nhập số điện thoại'
                    maxLength={13}
                    onChange={(e) => {
                      form.setFieldValue('phone', e.target.value.replace(/\D+/g, ''));
                      form.validateFields(['phone']);
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name='email'
                  label='Địa chỉ email'
                  rules={[{ required: true }, { pattern: EmailFormat, message: '${label} không hợp lệ' }]}
                >
                  <Input size='large' placeholder='Nhập địa chỉ email' />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name={'city'}
                  label='Tỉnh/Thành phố'
                  rules={[{ required: true, message: 'Vui lòng chọn ${label}' }]}
                >
                  <Select
                    size='large'
                    placeholder='Chọn Tỉnh/Thành phố'
                    showSearch
                    optionFilterProp='label'
                    options={VietnamAddress.map((i) => ({ label: i.Name, value: i.Id }))}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name={'district'}
                  label='Quận/Huyện'
                  rules={[{ required: true, message: 'Vui lòng chọn ${label}' }]}
                >
                  <Select
                    size='large'
                    placeholder='Chọn Quận/Huyện'
                    showSearch
                    optionFilterProp='label'
                    options={districtList?.map((i) => ({ label: i.Name, value: i.Id }))}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name={'ward'}
                  label='Phường/Xã'
                  rules={[
                    { required: !(district && isArrayEmpty(wardList)), message: 'Vui lòng chọn ${label}' },
                  ]}
                >
                  <Select
                    size='large'
                    placeholder='Chọn Phường/Xã'
                    showSearch
                    optionFilterProp='label'
                    options={wardList?.map((i) => ({ label: i.Name, value: i.Id }))}
                  />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name={'street'}
                  label='Số nhà, tên đường'
                  rules={[{ required: true }, { whitespace: true, message: '${label} không hợp lệ' }]}
                >
                  <Input size='large' placeholder='Nhập số nhà, tên đường' />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name={'note'}
              label='Ghi chú đơn hàng'
              rules={[{ whitespace: true, message: '${label} không hợp lệ' }]}
            >
              <Input.TextArea
                autoSize={{ minRows: 9 }}
                maxLength={300}
                placeholder='Viết lưu ý cho đơn hàng của bạn'
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </CheckoutSection>
    </Wrapper>
  );
};

export default CheckoutShippingAddress;
