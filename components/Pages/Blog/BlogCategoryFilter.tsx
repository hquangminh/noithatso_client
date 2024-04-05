import { useRouter } from 'next/router';

import { styled } from 'styled-components';

import { convertToSlug, removeEmptyObject } from 'functions';

import { BlogCategory } from 'interface/Blog';

import { Container, maxMedia } from 'lib/styles';

const FilterWrapper = styled.section``;
const CategoryList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 32px;

  ${maxMedia.small} {
    justify-content: flex-start;
    column-gap: 24px;
    overflow-x: auto;
  }
`;
const CategoryItem = styled.div<{ $active: boolean }>`
  padding: 32px 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: ${({ $active, theme }) => ($active ? theme.palette.primary.main : theme.textColor)};
  text-shadow: ${({ $active, theme }) => ($active ? `0 0 ${theme.palette.primary.main}` : 'unset')};
  cursor: pointer;

  ${maxMedia.small} {
    padding: 16px 0 12px;
    flex: none;
    font-size: 14px;
  }
`;

type Props = { categories: BlogCategory[] };

const BlogCategoryFilter = ({ categories }: Props) => {
  const { replace, query } = useRouter();

  const onSelectCategory = (cate: string) =>
    replace({ query: removeEmptyObject({ ...query, category: cate, page: undefined }) }, undefined, {
      shallow: true,
    });

  return (
    <FilterWrapper>
      <Container>
        <CategoryList className='hide-scrollbar'>
          <CategoryItem $active={query.category === 'tat-ca'} onClick={() => onSelectCategory('tat-ca')}>
            Tất cả
          </CategoryItem>
          {categories.map((cate) => (
            <CategoryItem
              key={cate.id}
              $active={query.category?.toString().split('--')[1] === cate.id.toString()}
              onClick={() => onSelectCategory(convertToSlug(cate.name) + '--' + cate.id)}
            >
              {cate.name}
            </CategoryItem>
          ))}
        </CategoryList>
      </Container>
    </FilterWrapper>
  );
};

export default BlogCategoryFilter;
