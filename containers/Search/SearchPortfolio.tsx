import { Col, Row } from 'antd';

import SearchButtonSeeMore from 'components/Pages/Search/ButtonSeeMore';
import SearchResultSection from 'components/Pages/Search/ResultSection';
import SearchTitleSection from 'components/Pages/Search/TitleSection';
import PortfolioCard from 'components/Pages/Portfolio/PortfolioCard';

import { PortfolioType } from 'interface/Portfolio';

type Props = { data: PortfolioType[]; total: number; loading: boolean; onLoadMore: () => void };

const SearchPortfolioContainer = ({ data, total, loading, onLoadMore }: Props) => {
  return (
    <SearchResultSection>
      <SearchTitleSection>{total} Ý tưởng thiết kế</SearchTitleSection>
      <Row gutter={[24, 24]}>
        {data?.map((item) => (
          <Col key={item.id} span={12} md={8}>
            <PortfolioCard data={item} />
          </Col>
        ))}
      </Row>
      {data && data.length < total && <SearchButtonSeeMore loading={loading} onLoadMore={onLoadMore} />}
    </SearchResultSection>
  );
};

export default SearchPortfolioContainer;
