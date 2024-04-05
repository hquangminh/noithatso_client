import { Col, Row } from 'antd';

import SearchButtonSeeMore from 'components/Pages/Search/ButtonSeeMore';
import SearchResultSection from 'components/Pages/Search/ResultSection';
import SearchTitleSection from 'components/Pages/Search/TitleSection';
import BlogCard from 'components/Pages/Blog/BlogCard';

import { BlogType } from 'interface/Blog';

type Props = { data?: BlogType[]; total?: number; loading: boolean; onLoadMore: () => void };

const SearchBlogContainer = ({ data, total, loading, onLoadMore }: Props) => {
  if (!total) return null;

  return (
    <SearchResultSection>
      <SearchTitleSection>{total} Bài viết</SearchTitleSection>
      <Row gutter={[24, 24]}>
        {data?.map((item) => (
          <Col key={item.id} span={12} md={6}>
            <BlogCard data={item} />
          </Col>
        ))}
      </Row>
      {data && data.length < total && <SearchButtonSeeMore loading={loading} onLoadMore={onLoadMore} />}
    </SearchResultSection>
  );
};

export default SearchBlogContainer;
