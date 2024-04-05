import { useState } from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { ConfigProvider, Drawer, ThemeConfig, Timeline } from 'antd';

import { useDevice } from 'lib/hooks';
import { OrderStatus } from 'lib/constants';

import { DotTimelineIcon } from 'components/Fragments/Icons';

import { OrderChangeLogItem } from 'interface/Order';

import { maxMedia, minMedia } from 'lib/styles';

const Wrapper = styled.div`
  .ant-drawer {
    position: fixed;
    top: 76px;
    .ant-drawer-header-title {
      .ant-drawer-close {
        padding: 0px;
      }
    }
    ${maxMedia.xsmall} {
      top: 56px;
      border-top: 1px solid #e3e3e8;
    }
  }
  ${minMedia.small} {
    border: 1px solid #e3e3e8;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.common.black};

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  ${minMedia.small} {
    padding: 13px 24px;
    background-color: #f4f5f8;
  }
`;
const Content = styled.div`
  padding-top: 8px;
  .ant-timeline {
    transform: translateY(12px);
    .ant-timeline-item {
      .ant-timeline-item-content {
        transform: translateY(-25%);
      }
      &.ant-timeline-item-last {
        padding-bottom: 0px;
        .ant-timeline-item-content {
          min-height: auto;
        }
      }
      ${maxMedia.small} {
        padding-bottom: 12px;
      }
    }
  }

  ${minMedia.small} {
    padding: 12px 24px 12px;
  }
`;
const Item = styled.div`
  p {
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
  }
  span {
    font-size: 12px;
    font-weight: 500;
    color: #acacba;
  }
`;

type Props = { data: OrderChangeLogItem[] };

const OrderLogs = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { viewport } = useDevice();
  const isMobile = viewport.width && viewport.width <= 640;
  return (
    <Wrapper>
      <Header>
        Trạng thái đơn hàng{isMobile && <span onClick={() => setOpen(true)}>Xem chi tiết</span>}
      </Header>
      <Content>
        <ConfigProvider theme={themeTimeline}>
          <Timeline
            items={data.slice(0, isMobile ? 1 : data.length).map((i, index) => ({
              color: index !== 0 ? 'gray' : 'blue',
              dot: <DotTimelineIcon style={{ fontSize: 16 }} />,
              children: <TimelineItem data={i} />,
            }))}
          />
        </ConfigProvider>

        <ConfigProvider theme={drawerTheme}>
          <Drawer
            open={open}
            width='100%'
            title='Trạng thái đơn hàng'
            closeIcon={<LeftOutlined />}
            mask={false}
            getContainer={false}
            contentWrapperStyle={{ boxShadow: 'none' }}
            headerStyle={{ paddingBottom: 0, borderBottom: 'none', textAlign: 'center' }}
            onClose={() => setOpen(false)}
          >
            <Timeline
              items={data.map((i, index) => ({
                color: index !== 0 ? 'gray' : 'blue',
                dot: <DotTimelineIcon style={{ fontSize: 16 }} />,
                children: <TimelineItem data={i} />,
              }))}
            />
          </Drawer>
        </ConfigProvider>
      </Content>
    </Wrapper>
  );
};

export default OrderLogs;

const TimelineItem = ({ data }: { data: OrderChangeLogItem }) => {
  return (
    <Item>
      <p>{OrderStatus[data.type]}</p>
      <span>{dayjs(data.created_at).format('DD/MM/YYYY | hh:mm A')}</span>
    </Item>
  );
};

const themeTimeline: ThemeConfig = {
  components: { Timeline: { itemPaddingBottom: 24 } },
  token: { lineType: 'dashed', lineHeight: 1.4 },
};

const drawerTheme: ThemeConfig = {
  token: { paddingLG: 16, lineType: 'dashed', colorIcon: '#181818', colorText: '#181818' },
};
