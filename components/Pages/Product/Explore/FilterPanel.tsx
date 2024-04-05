import { styled } from 'styled-components';
import { Col, Row, Space } from 'antd';

import ProductTypeSelect from 'components/Fragments/Filter/ProductTypeSelect';
import PriceSelect from 'components/Fragments/Filter/PriceSelect';
import SortSelect from 'components/Fragments/Filter/SortSelect';
import StyleSelect from 'components/Fragments/Filter/StyleSelect';

import { CategoryProductType, CategoryStyleType } from 'interface/Category';

const Wrapper = styled.div`
  padding-top: 40px;
`;

export type Categories = { style_type: CategoryStyleType[]; product_category: CategoryProductType[] };

const ProductExploreFilterPanel = ({ categories }: { categories: Categories }) => {
  return (
    <Wrapper>
      <Row gutter={[0, 12]} justify='space-between'>
        <Col flex='auto'>
          <Space size={12}>
            {categories?.product_category && <ProductTypeSelect categories={categories.product_category} />}
            {categories?.style_type && <StyleSelect multiple categories={categories?.style_type} />}
            <PriceSelect />
          </Space>
        </Col>
        <Col flex='none'>
          <SortSelect />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ProductExploreFilterPanel;
