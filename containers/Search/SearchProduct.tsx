import { styled } from 'styled-components';

import SearchButtonSeeMore from 'components/Pages/Search/ButtonSeeMore';
import SearchResultSection from 'components/Pages/Search/ResultSection';
import SearchTitleSection from 'components/Pages/Search/TitleSection';
import ProductCard from 'components/Pages/Product/ProductCard';

import { ProductType } from 'interface/Product';

import { maxMedia } from 'lib/styles';

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px 16px;
  ${maxMedia.small} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${maxMedia.xsmall} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${maxMedia.tiny} {
    grid-template-columns: 100%;
  }
`;

type Props = { data?: ProductType[]; total?: number; loading: boolean; onLoadMore: () => void };

const SearchProductContainer = ({ data, total, loading, onLoadMore }: Props) => {
  if (!total) return null;

  return (
    <SearchResultSection>
      <SearchTitleSection>{total} Sản phẩm</SearchTitleSection>
      <ProductList>
        {data?.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </ProductList>
      {data && data.length < total && <SearchButtonSeeMore loading={loading} onLoadMore={onLoadMore} />}
    </SearchResultSection>
  );
};

export default SearchProductContainer;
