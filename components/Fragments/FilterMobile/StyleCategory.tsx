import { useQuery } from '@apollo/client';
import { Checkbox } from 'antd';

import { API_GetStyleType } from 'graphql/category/query';

import FilterOption from './Option';

import { CategoryStyleType } from 'interface/Category';

type Props = { value?: string[]; onSelect: (value?: string[]) => void };

const FilterMobileStyle = ({ value, onSelect }: Props) => {
  const { data } = useQuery<{ style_type: CategoryStyleType[] }>(API_GetStyleType, {
    fetchPolicy: 'network-only',
  });

  return (
    <Checkbox.Group
      value={value}
      options={data?.style_type.map((cate) => ({
        label: <FilterOption label={cate.name} />,
        value: cate.id.toString(),
      }))}
      onChange={(checkValue) => onSelect(checkValue as string[])}
    />
  );
};

export default FilterMobileStyle;
