import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DownOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox';

import { useOnClickOutside } from 'lib/hooks';
import { removeEmptyObject } from 'functions';

import * as SC from './Style';

const PriceSelect = () => {
  const { replace, query } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const onSelect = (value: string | null) => {
    const [minPrice, maxPrice] = value ? value.split('-') : [0, 0];
    const page = query.page !== '1' ? undefined : query.page;
    replace({ query: removeEmptyObject({ ...query, minPrice, maxPrice, page }) }, undefined, {
      shallow: true,
    });
  };

  const selected =
    query.minPrice || query.maxPrice ? `${query.minPrice || 0}-${query.maxPrice || ''}` : false;

  return (
    <SC.DropdownWrapper
      ref={dropdownRef}
      $open={open}
      $active={typeof selected === 'string'}
      style={{ width: 210 }}
    >
      <SC.DropdownButton onClick={() => setOpen((open) => !open)}>
        Giá tiền
        {/* {open || !selected ? (
          'Giá tiền'
        ) : (
          <SC.DropdownSelected>{options.find((i) => i.value === selected)?.label}</SC.DropdownSelected>
        )} */}
        <DownOutlined />
      </SC.DropdownButton>
      <SC.DropdownContent $open={open}>
        <Radio.Group value={selected} options={options} onChange={(e) => onSelect(e.target.value)} />
      </SC.DropdownContent>
    </SC.DropdownWrapper>
  );
};

export default PriceSelect;

export const options: CheckboxOptionType[] = [
  {
    label: <SC.SelectDropdownItem>Tất cả</SC.SelectDropdownItem>,
    value: false,
  },
  {
    label: <SC.SelectDropdownItem>0đ đến 10 triệu</SC.SelectDropdownItem>,
    value: '0-10000000',
  },
  {
    label: <SC.SelectDropdownItem>10 triệu đến 50 triệu</SC.SelectDropdownItem>,
    value: '10000000-50000000',
  },
  {
    label: <SC.SelectDropdownItem>50 triệu đến 100 triệu</SC.SelectDropdownItem>,
    value: '50000000-100000000',
  },
  {
    label: <SC.SelectDropdownItem>100 triệu trở lên</SC.SelectDropdownItem>,
    value: '100000000-',
  },
];
