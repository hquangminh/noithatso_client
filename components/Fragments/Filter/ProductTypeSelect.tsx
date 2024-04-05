import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';

import { useOnClickOutside } from 'lib/hooks';
import { isArrayEmpty, removeEmptyObject } from 'functions';

import { CategoryProductType } from 'interface/Category';

import * as SC from './Style';

type Props = { loading?: boolean; categories?: CategoryProductType[] };

const ProductTypeSelect = ({ loading, categories }: Props) => {
  const { replace, query } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cateParent = categories?.filter((i) => !i.parent_id) || [];

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const onSelect = (products: string[]) => {
    let currentProductFilter =
      typeof query.product_cate === 'string' ? [query.product_cate] : query.product_cate ?? [];
    currentProductFilter = [...currentProductFilter].filter((i) => products.includes(i));

    let newProductFilter = products.filter((i) => !currentProductFilter.includes(i));
    if (newProductFilter.length)
      newProductFilter = [...newProductFilter].filter((i) => {
        const isChild = !cateParent.some((c) => c.id.toString() === i);
        const isParentNotHaveChild = !categories?.some((c) => c.parent_id?.toString() === i);
        return isChild || isParentNotHaveChild;
      });

    const allProductFilter = [...currentProductFilter, ...newProductFilter];
    const page = query.page !== '1' ? undefined : query.page;
    replace({ query: removeEmptyObject({ ...query, product_cate: allProductFilter, page }) }, undefined, {
      shallow: true,
    });
  };

  const treeData: DataNode[] | undefined = cateParent.map((cate) => {
    const cateChild = categories?.filter((i) => i.parent_id === cate.id);
    return {
      title: <SC.SelectDropdownItem>{cate.name}</SC.SelectDropdownItem>,
      key: cate.id.toString(),
      children: cateChild
        ? cateChild.map((subCate) => ({
            title: <SC.SelectDropdownItem>{subCate.name}</SC.SelectDropdownItem>,
            key: subCate.id.toString(),
          }))
        : undefined,
    };
  });

  const checkedKeys = typeof query.product_cate === 'string' ? [query.product_cate] : query.product_cate;
  const expandedKeys = categories?.reduce(
    (arr: string[], item) =>
      checkedKeys?.includes(item.id.toString()) && item.parent_id
        ? arr.concat([item.parent_id.toString()])
        : arr,
    [],
  );

  const selected = categories?.filter((i) => checkedKeys?.includes(i.id.toString()));
  const active = typeof selected !== 'undefined' && !isArrayEmpty(selected);

  return (
    <SC.DropdownWrapper ref={dropdownRef} $open={open} $active={active} style={{ width: 210 }}>
      <SC.DropdownButton onClick={() => setOpen((open) => !open)}>
        Loại sản phẩm
        {/* {open || isArrayEmpty(selected) ? (
          'Loại sản phẩm'
        ) : (
          <SC.DropdownSelected>{selected?.map((i) => i.name).join(', ')}</SC.DropdownSelected>
        )} */}
        {loading ? <LoadingOutlined /> : <DownOutlined />}
      </SC.DropdownButton>
      <SC.DropdownContent $open={open}>
        {!isArrayEmpty(categories) && (
          <Tree
            checkedKeys={checkedKeys}
            checkable
            blockNode
            selectable={false}
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            onCheck={(checked: any) => onSelect(checked)}
          />
        )}
      </SC.DropdownContent>
    </SC.DropdownWrapper>
  );
};

export default ProductTypeSelect;
