import { Dispatch, SetStateAction } from 'react';

import { styled } from 'styled-components';
import { Space } from 'antd';

import { ProductOption } from 'interface/Product';

const OptionItem = styled.div``;
const OptionName = styled.p`
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.common.black};
`;
const VariationItem = styled.div<{ $active: boolean }>`
  padding: 8px 16px;
  color: ${({ $active, theme }) => ($active ? theme.palette.primary.contrastText : theme.textColor)};
  background-color: ${({ $active, theme }) => ($active ? theme.palette.primary.main : '#f6f7f8')};
  cursor: pointer;
`;

type Props = { options: ProductOption[]; selected: string[]; onSelect: Dispatch<SetStateAction<string[]>> };

const ProductOptionComponent = ({ options, selected, onSelect }: Props) => {
  const handleSelect = (index: number, unicode: number) => {
    let selectCurrent = [...selected];
    selectCurrent.splice(index, 1, unicode.toString());
    onSelect(selectCurrent);
  };

  return (
    <Space direction='vertical' size={16}>
      {options.map((option, index) => (
        <OptionItem key={index}>
          <OptionName>{option.name}:</OptionName>
          <Space size={12} wrap>
            {option.options.map((variation, index1) => (
              <VariationItem
                key={index1}
                $active={selected[index] === index1.toString()}
                onClick={() => handleSelect(index, index1)}
              >
                {variation}
              </VariationItem>
            ))}
          </Space>
        </OptionItem>
      ))}
    </Space>
  );
};

export default ProductOptionComponent;
