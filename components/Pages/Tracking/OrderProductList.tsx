import { styled } from 'styled-components';
import { ConfigProvider, Table, ThemeConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { priceFormatter } from 'functions';
import { useDevice } from 'lib/hooks';

import ProductItem from './ProductItem';

import { OrderProductItem } from 'interface/Order';

import { maxMedia, minMedia } from 'lib/styles';

const ProductListWrapper = styled.div`
  .ant-table-wrapper {
    .ant-table-body {
      max-height: 461px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        background-color: transparent;
        width: 14px;
        padding: 0 5px;
      }
      &::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        border-radius: 30px;
        background-clip: padding-box;
        background-color: #d9d9d9;
      }
    }
    .ant-table-thead > tr {
      & > th {
        padding-block: 13px;
        border-block-end-width: 0;
      }
      .ant-table-cell-scrollbar {
        border-bottom: none;
      }
    }
    .ant-table-body > tr:last-child > td {
      border-bottom-width: 0;
      &:after {
        display: none;
      }
    }

    ${minMedia.small} {
      border: 1px solid #e3e3e8;
      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
        &:first-child {
          padding-left: 24px;
        }
        &:nth-child(3) {
          padding-right: 24px;
        }
      }
      .ant-table-tbody > tr:not(:last-child) > td {
        position: relative;
        border-bottom-width: 0;
        &:after {
          content: '';
          width: 100%;
          height: 1px;
          background: #e3e3e8;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      .ant-table-tbody > tr > td:nth-child(1):after {
        transform: translateX(24px);
      }
      .ant-table-tbody > tr > td:nth-child(3):after {
        transform: translateX(-24px);
      }
      .ant-table-footer {
        padding-inline: 24px;
      }
      .ant-table-fixed-header .ant-table-footer {
        padding-inline: 38px;
        position: relative;
        &:before {
          position: absolute;
          left: 0;
          top: -1px;
          content: '';
          width: 100%;
          height: 1px;
          background-color: #e3e3e8;
        }
      }
    }
    ${maxMedia.small} {
      .ant-table-footer,
      .ant-table-tbody > tr > td {
        padding: 12px 0;
      }
    }
  }
`;
const OrderAmountWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.common.black};
  text-align: right;
  span {
    font-weight: bold;
    color: #ea3335;
  }

  ${maxMedia.xsmall} {
    display: flex;
    justify-content: space-between;
  }
`;
const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};

  ${minMedia.small} {
    display: none;
  }
`;

type Props = { amount: number; products: OrderProductItem[] };

const OrderProductList = ({ amount, products }: Props) => {
  const { viewport } = useDevice();
  const footer = () => <OrderAmount amount={amount} />;

  const small = viewport.width && viewport.width <= 640;

  const columns: ColumnsType<OrderProductItem> = [
    {
      title: 'Sản phẩm',
      key: 'information',
      render: (_, record) => <ProductItem data={record} />,
    },
    {
      title: 'Số lượng',
      dataIndex: 'delivery_quantity',
      key: 'quantity',
      align: 'center',
      width: small ? 0 : '120px',
      className: 'font-weight-bold',
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (_, record) => priceFormatter(record.product_info.price * record.delivery_quantity),
      align: 'right',
      width: small ? 0 : '170px',
      className: 'font-weight-bold',
    },
  ];

  return (
    <ProductListWrapper>
      <Header>Thông tin đơn hàng</Header>
      <ConfigProvider theme={themeTable}>
        <Table
          columns={columns.filter((i) => i.width !== 0)}
          dataSource={products}
          showHeader={!small}
          pagination={false}
          scroll={{ y: products.length > 4 ? 426 : undefined }}
          footer={footer}
        />
      </ConfigProvider>
    </ProductListWrapper>
  );
};

export default OrderProductList;

const OrderAmount = ({ amount }: { amount: number }) => {
  return (
    <OrderAmountWrapper>
      Tổng tiền: <span>{priceFormatter(amount)}</span>
    </OrderAmountWrapper>
  );
};

const themeTable: ThemeConfig = {
  components: {
    Table: {
      cellPaddingInline: 12,
      cellFontSize: 16,
      headerColor: '#181818',
      headerBg: '#f4f5f8',
      footerBg: '#fffff',
      borderColor: '#e3e3e8',
      lineHeight: 1.4,
    },
  },
  token: { borderRadius: 0, colorText: '#424153' },
};
