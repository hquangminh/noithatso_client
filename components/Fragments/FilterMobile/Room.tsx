import { useQuery } from '@apollo/client';
import { CheckboxOptionType, Radio } from 'antd';

import { API_GetRoomType } from 'graphql/category/query';

import FilterOption from './Option';

import { CategoryRoomType } from 'interface/Category';

type Props = { value?: string; onSelect: (value?: string) => void };

const FilterMobileRoom = ({ value, onSelect }: Props) => {
  const { data } = useQuery<{ room_type: CategoryRoomType[] }>(API_GetRoomType, {
    fetchPolicy: 'network-only',
  });

  return (
    <Radio.Group
      value={value || 0}
      options={data?.room_type.reduce(
        (options: CheckboxOptionType[], cate) => {
          const label = <FilterOption label={cate.name} />;
          return options.concat([{ label, value: cate.id.toString() }]);
        },
        [{ label: 'Tất cả', value: 0 }],
      )}
      onChange={(e) => onSelect(e.target.value)}
    />
  );
};

export default FilterMobileRoom;
