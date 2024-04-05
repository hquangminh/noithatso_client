import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Radio, Space } from 'antd';

import { useOnClickOutside } from 'lib/hooks';
import { removeEmptyObject } from 'functions';

import { CategoryRoomType } from 'interface/Category';

import * as SC from './Style';

type Props = { width?: number; loading?: boolean; categories?: CategoryRoomType[] };

const RoomSelect = ({ width, loading, categories }: Props) => {
  const { replace, query } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const onSelect = (room?: string) =>
    replace({ query: removeEmptyObject({ ...query, room }) }, undefined, { shallow: true });

  const selected = categories?.find((i) => i.id.toString() === query.room?.toString());
  const active = typeof selected !== 'undefined';

  return (
    <SC.DropdownWrapper ref={dropdownRef} $open={open} $active={active} style={{ width: width ?? 190 }}>
      <SC.DropdownButton onClick={() => setOpen((open) => !open)}>
        Loại phòng {loading ? <LoadingOutlined /> : <DownOutlined />}
      </SC.DropdownButton>
      <SC.DropdownContent $open={open}>
        <Radio.Group value={query.room || null} onChange={(e) => onSelect(e.target.value)}>
          <Space direction='vertical' size={0}>
            <Radio value={null}>
              <SC.SelectDropdownItem>Tất cả</SC.SelectDropdownItem>
            </Radio>
            {categories?.map((cate) => (
              <Radio key={cate.id} value={cate.id.toString()}>
                <SC.SelectDropdownItem>{cate.name}</SC.SelectDropdownItem>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </SC.DropdownContent>
    </SC.DropdownWrapper>
  );
};

export default RoomSelect;
