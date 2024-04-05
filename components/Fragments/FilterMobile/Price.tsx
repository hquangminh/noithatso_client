import { Radio } from 'antd';

type Props = { value?: string | number; onSelect: (value: string) => void };

const FilterMobilePrice = ({ value, onSelect }: Props) => {
  return (
    <Radio.Group
      value={value || 0}
      options={[
        { label: 'Tất cả', value: 0 },
        { label: '0đ đến 10 triệu', value: '0-10000000' },
        { label: '10 triệu đến 50 triệu', value: '10000000-50000000' },
        { label: '50 triệu đến 100 triệu', value: '50000000-100000000' },
        { label: '100 triệu trở lên', value: '100000000-' },
      ]}
      onChange={(e) => onSelect(e.target.value)}
    />
  );
};

export default FilterMobilePrice;
