import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Checkbox, Radio, Space } from 'antd';

import { useOnClickOutside } from 'lib/hooks';
import { isArrayEmpty, removeEmptyObject } from 'functions';

import { CategoryStyleType } from 'interface/Category';

import * as SC from './Style';

type Props = { multiple?: boolean; loading?: boolean; categories?: CategoryStyleType[] };

const StyleSelect = ({ multiple, loading, categories }: Props) => {
  const { replace, query } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const onSelect = (style?: string | string[]) => {
    const page = query.page !== '1' ? undefined : query.page;
    replace({ query: removeEmptyObject({ ...query, style, page }) }, undefined, { shallow: true });
  };

  const selected = categories?.filter(
    (i) =>
      query.style &&
      (typeof query.style === 'string'
        ? i.id.toString() === query.style
        : query.style.includes(i.id.toString())),
  );
  const active = typeof selected !== 'undefined' && !isArrayEmpty(selected);

  return (
    <SC.DropdownWrapper ref={dropdownRef} $open={open} $active={active} style={{ width: 210 }}>
      <SC.DropdownButton onClick={() => setOpen((open) => !open)}>
        Phong cách
        {/* {open || isArrayEmpty(selected) ? (
          ' Phong cách'
        ) : (
          <SC.DropdownSelected>{selected?.map((i) => i.name).join(', ')}</SC.DropdownSelected>
        )} */}
        {loading ? <LoadingOutlined /> : <DownOutlined />}
      </SC.DropdownButton>
      <SC.DropdownContent $open={open}>
        {!multiple ? (
          <Radio.Group value={query.style || null} onChange={(e) => onSelect(e.target.value)}>
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
        ) : (
          <Checkbox.Group
            value={typeof query.style === 'string' ? [query.style] : query.style}
            onChange={(checkedValue: any) => onSelect(checkedValue)}
          >
            <Space direction='vertical' size={0}>
              {categories?.map((cate) => (
                <Checkbox key={cate.id} value={cate.id.toString()}>
                  <SC.SelectDropdownItem>{cate.name}</SC.SelectDropdownItem>
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        )}
      </SC.DropdownContent>
    </SC.DropdownWrapper>
  );
};

export default StyleSelect;
