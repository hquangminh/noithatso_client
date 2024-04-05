import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';

import FilterOption from './Option';

import { CategoryProductType } from 'interface/Category';

type Props = { categories: CategoryProductType[]; value?: string[]; onSelect: (value: string[]) => void };

const FilterMobileProductCategory = ({ categories, value, onSelect }: Props) => {
  const cateParent = categories.filter((i) => !i.parent_id) || [];
  const treeData: DataNode[] | undefined = cateParent.map((cate) => {
    const cateChild = categories.filter((i) => i.parent_id === cate.id);
    return {
      title: <FilterOption label={cate.name} />,
      key: cate.id.toString(),
      children: cateChild
        ? cateChild.map((subCate) => ({
            title: <FilterOption label={subCate.name} />,
            key: subCate.id.toString(),
          }))
        : undefined,
    };
  });
  const expandedKeys = categories.reduce(
    (arr: string[], item) =>
      value?.includes(item.id.toString()) && item.parent_id ? arr.concat([item.parent_id.toString()]) : arr,
    [],
  );

  return (
    <Tree
      checkable
      blockNode
      selectable={false}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      checkedKeys={value}
      defaultExpandedKeys={expandedKeys}
      onCheck={(checked) => onSelect(checked as string[])}
    />
  );
};

export default FilterMobileProductCategory;
