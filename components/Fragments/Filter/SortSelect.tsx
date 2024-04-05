import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DownOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox';

import { useOnClickOutside } from 'lib/hooks';
import { removeEmptyObject } from 'functions';

import * as SC from './Style';

const SortSelect = ({ width }: { width?: number | string }) => {
  const { replace, query } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const onSelect = (sort_by: string | null) =>
    replace({ query: removeEmptyObject({ ...query, sort_by }) }, undefined, { shallow: true });

  const selected = query.sort_by || 'bestseller';

  return (
    <SC.DropdownWrapper
      ref={dropdownRef}
      $open={open}
      $active={typeof selected !== 'undefined'}
      $hideRadio
      style={{ width: width ?? 210 }}
    >
      <SC.DropdownButton onClick={() => setOpen((open) => !open)}>
        {open ? (
          'Sắp xếp theo'
        ) : (
          <SC.DropdownSelected>{options.find((i) => i.value === selected)?.label}</SC.DropdownSelected>
        )}
        <DownOutlined />
      </SC.DropdownButton>
      <SC.DropdownContent $open={open}>
        <Radio.Group value={selected} options={options} onChange={(e) => onSelect(e.target.value)} />
      </SC.DropdownContent>
    </SC.DropdownWrapper>
  );
};

export default SortSelect;

export const options: CheckboxOptionType[] = [
  {
    label: <SC.SelectDropdownItem>Bán chạy nhất</SC.SelectDropdownItem>,
    value: 'bestseller',
  },
  {
    label: <SC.SelectDropdownItem>Mới nhất</SC.SelectDropdownItem>,
    value: 'newest',
  },
  {
    label: <SC.SelectDropdownItem>Theo giá: Thấp đến cao</SC.SelectDropdownItem>,
    value: 'price-low-to-hight',
  },
  {
    label: <SC.SelectDropdownItem>Theo giá: Cao đến thấp</SC.SelectDropdownItem>,
    value: 'price-hight-to-low',
  },
];
