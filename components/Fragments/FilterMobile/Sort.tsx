import { Radio } from 'antd';

type Props = { value?: string; onSelect: (value: string) => void };

const FilterMobileSort = ({ value, onSelect }: Props) => {
  return (
    <Radio.Group
      value={value || 'bestseller'}
      options={[
        { label: 'Bán chạy nhất', value: 'bestseller' },
        { label: 'Mới nhất', value: 'newest' },
        { label: 'Theo giá: Thấp đến cao', value: 'price-low-to-hight' },
        { label: 'Theo giá: Cao đến thấp', value: 'price-hight-to-low' },
      ]}
      onChange={(e) => onSelect(e.target.value)}
    />
  );
};

export default FilterMobileSort;
