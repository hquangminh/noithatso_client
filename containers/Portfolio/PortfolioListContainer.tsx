import { useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';
import { Col, Pagination, Row, Space, Spin } from 'antd';

import { useWindowSize } from 'lib/hooks';
import { isArrayEmpty } from 'functions';
import { API_GetPortfolio, API_GetPortfolioFilterCategory } from 'graphql/portfolio/query';

import ResultFragment from 'components/Fragments/Result';
import RoomSelect from 'components/Fragments/Filter/RoomSelect';
import StyleSelect from 'components/Fragments/Filter/StyleSelect';
import PortfolioCard from 'components/Pages/Portfolio/PortfolioCard';
import FilterPanelMobile from 'components/Fragments/FilterMobile';

import { PortfolioType } from 'interface/Portfolio';
import { CategoryRoomType, CategoryStyleType } from 'interface/Category';

import { Container, maxMedia } from 'lib/styles';
import PortfolioFilterApply from 'components/Pages/Portfolio/FilterApply';

const PortfolioWrapper = styled.div`
  padding: 40px 0;

  ${maxMedia.xsmall} {
    padding: 24px 0;
    .ant-row {
      row-gap: 24px !important;
    }
  }
`;
const PortfolioHeader = styled.section`
  margin-bottom: 24px;
  .portfolio-page-name {
    margin-bottom: 0;
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.black};
  }

  ${maxMedia.xsmall} {
    margin-bottom: 24px;
    .ant-row {
      justify-content: center;
    }
    .portfolio-page-name {
      text-align: center;
      font-size: 18px;
    }
  }
`;
const PortfolioTotal = styled.div`
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};

  ${maxMedia.small} {
    margin-bottom: 16px;
    font-size: 16px;
  }
`;

const pageSize = 12;

type FilterResponse = {
  portfolio: PortfolioType[];
  portfolio_aggregate: { aggregate: { count: number } };
};

const PortfolioListContainer = () => {
  const { replace, query } = useRouter();

  const [width] = useWindowSize();

  const [total, setTotal] = useState<number>(0);
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([]);

  const { data: categories, loading: fetchingCategory } = useQuery<{
    room_type: CategoryRoomType[];
    style_type: CategoryStyleType[];
  }>(API_GetPortfolioFilterCategory);

  const { room, style, page } = query;

  const { loading } = useQuery<FilterResponse>(API_GetPortfolio, {
    variables: {
      offset: (Number(page || 1) - 1) * pageSize,
      where: {
        portfolio_rooms: room ? { room_id: { _eq: room } } : undefined,
        portfolio_styles:
          typeof style === 'string'
            ? { style_id: { _eq: style } }
            : typeof style === 'object'
            ? { _or: style.map((i) => ({ style_id: { _eq: i } })) }
            : undefined,
      },
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ portfolio, portfolio_aggregate }) => {
      setPortfolios(portfolio);
      setTotal(portfolio_aggregate.aggregate.count);
      if (isArrayEmpty(portfolio) && query.page && query.page !== '1') onChangePage(1);
    },
  });

  const onChangePage = (page?: number) => {
    replace({ query: { ...query, page } }, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PortfolioWrapper>
      <Container>
        <PortfolioHeader>
          <Row justify='space-between'>
            <Col
              flex='auto'
              md={{ flex: 'none' }}
              style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}
            >
              <h1 className='portfolio-page-name'>Ý tưởng thiết kế</h1>
            </Col>
            <Col flex='none'>
              {width && width > 640 ? (
                <Space style={{ marginLeft: 'auto' }} size={12}>
                  <RoomSelect width={210} loading={fetchingCategory} categories={categories?.room_type} />
                  <StyleSelect loading={fetchingCategory} categories={categories?.style_type} multiple />
                </Space>
              ) : (
                <FilterPanelMobile options={['room', 'style']} isSort={false} />
              )}
            </Col>
          </Row>
        </PortfolioHeader>
        {categories && (
          <PortfolioFilterApply categories={{ room: categories.room_type, style: categories.style_type }} />
        )}
        {!isArrayEmpty(portfolios) && (
          <PortfolioTotal>Có {total} ý tưởng thiết kế được tìm thấy</PortfolioTotal>
        )}
        <ResultRender loading={loading} portfolios={portfolios} />
        {total > pageSize && (
          <Pagination
            style={{ marginTop: 40, textAlign: 'center' }}
            current={query.page ? Number(query.page) : 1}
            pageSize={pageSize}
            total={total}
            onChange={onChangePage}
          />
        )}
      </Container>
    </PortfolioWrapper>
  );
};

export default PortfolioListContainer;

const ResultRender = ({ loading, portfolios }: { loading: boolean; portfolios: PortfolioType[] }) => {
  if (loading)
    return (
      <Spin>
        <div style={{ height: 400 }} />
      </Spin>
    );
  else if (isArrayEmpty(portfolios))
    return <ResultFragment title='Không tìm thấy thiết kế phù hợp với lựa chọn của bạn.' />;

  return (
    <Row gutter={[24, 32]}>
      {portfolios?.map((item) => (
        <Col key={item.id} span={24} md={8}>
          <PortfolioCard data={item} />
        </Col>
      ))}
    </Row>
  );
};
