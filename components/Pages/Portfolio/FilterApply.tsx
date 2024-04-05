import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { ConfigProvider, Space, Tag } from 'antd';

import { removeEmptyObject } from 'functions';

import { CategoryRoomType, CategoryStyleType } from 'interface/Category';

const Wrapper = styled.div`
  margin-bottom: 24px;
  .ant-tag {
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 500;
    & > span:first-child {
      color: #ffffff;
    }
    .ant-tag-close-icon {
      color: #ffffff;
      &:hover {
        color: currentColor;
        opacity: 0.8;
      }
    }
  }
`;

type Props = { categories: { room: CategoryRoomType[]; style: CategoryStyleType[] } };
const PortfolioFilterApply = ({ categories }: Props) => {
  const { query, replace } = useRouter();

  const room = typeof query.room === 'string' ? [query.room] : query.room;
  const style = typeof query.style === 'string' ? [query.style] : query.style;

  const onRemoveFilter = (e: MouseEvent<HTMLElement>, key: 'room' | 'style', value?: string) => {
    e.preventDefault();

    const filter = { ...query };

    switch (key) {
      case 'room':
        filter['room'] = room?.filter((i) => i !== value);
        break;
      case 'style':
        filter['style'] = style?.filter((i) => i !== value);
        break;
    }

    replace({ query: removeEmptyObject(filter) }, undefined, { shallow: true });
  };

  const onResetFilter = () =>
    replace({ query: removeEmptyObject({ name: query.name, sort_by: query.sort_by }) }, undefined, {
      shallow: true,
    });

  const showFilter = Object.keys(query).some((key) => ['room', 'style'].includes(key));

  if (!showFilter) return null;

  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          token: {
            borderRadiusSM: 0,
            marginXS: 0,
            colorFillTertiary: '#acacba',
            colorError: '#ffffff',
            colorErrorBg: '#ea3335',
            fontSizeIcon: 14,
          },
          components: { Tag: { defaultColor: '#ffffff' } },
        }}
      >
        <Space wrap size={12}>
          {room?.map((id) => {
            const category = categories.room.find((i) => i.id === Number(id));
            return category ? (
              <Tag key={id} bordered={false} closable onClose={(e) => onRemoveFilter(e, 'room', id)}>
                {category.name}
              </Tag>
            ) : null;
          })}
          {style?.map((id) => {
            const category = categories.style.find((i) => i.id === Number(id));
            return category ? (
              <Tag key={id} bordered={false} closable onClose={(e) => onRemoveFilter(e, 'style', id)}>
                {category.name}
              </Tag>
            ) : null;
          })}
          <Tag color='error' bordered={false} closable onClose={onResetFilter}>
            Xoá bộ lọc
          </Tag>
        </Space>
      </ConfigProvider>
    </Wrapper>
  );
};

export default PortfolioFilterApply;
