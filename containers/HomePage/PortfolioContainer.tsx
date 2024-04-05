import { useRef, useState } from 'react';
import Link from 'next/link';

import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Spin } from 'antd';

import { useWindowSize } from 'lib/hooks';
import { API_GetPortfolio, API_GetPortfolioRoom, API_GetPortfolioStyle } from 'graphql/homepage/query';

import SectionContent from 'components/Pages/HomePage/SectionContent';
import PortfolioCard from 'components/Pages/Portfolio/PortfolioCard';

import { CategoryRoomType, CategoryStyleType } from 'interface/Category';
import { PortfolioType } from 'interface/Portfolio';

import { maxMedia } from 'lib/styles';

const RoomList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 32px;
  margin-bottom: 40px;
  padding-left: 0;
  list-style: none;
  overflow-x: auto;

  ${maxMedia.medium} {
    justify-content: flex-start;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
const RoomTab = styled.li<{ $active: boolean }>`
  flex: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? theme.palette.primary.main : theme.textColor)};
  text-shadow: ${({ $active, theme }) => ($active ? `0 0 ${theme.palette.primary.main}` : 'none')};
  cursor: pointer;
`;
const PortfolioList = styled.div`
  ${maxMedia.medium} {
    .ant-row {
      margin-inline: 0 !important;
      display: grid;
      grid-gap: 16px;
      grid-auto-flow: column;
      grid-auto-columns: 327px;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      &::-webkit-scrollbar {
        display: none;
      }
      & > .ant-col {
        max-width: 100%;
        padding-inline: 0 !important;
        scroll-snap-align: start;
      }
    }
  }
`;
const ButtonSeeAll = styled.div`
  margin-top: 40px;
  text-align: center;
  .ant-btn {
    height: 44px;
    padding: 2px 32px;
    font-size: 12px;
    line-height: 1;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.black};
    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.palette.common.black};
    border-radius: 0;
  }
`;

type Props = { type: 'room' | 'style' };
type Category = { room_type: CategoryRoomType[]; style_type: CategoryStyleType[] };

const PortfolioContainer = ({ type }: Props) => {
  const [categories, setCategory] = useState<CategoryRoomType[] | CategoryStyleType[]>();
  const [selected, setSelected] = useState<number>();
  const [portfolios, setPortfolios] = useState<PortfolioType[]>();
  const [total, setTotal] = useState<number>(0);

  const listRef = useRef<HTMLDivElement>(null);

  const QueryCategory = type === 'room' ? API_GetPortfolioRoom : API_GetPortfolioStyle;
  const tableFilter = type === 'room' ? 'portfolio_rooms' : 'portfolio_styles',
    fieldFilter = type === 'room' ? 'room_id' : 'style_id';

  const { loading: fetchingCategory } = useQuery<Category>(QueryCategory, {
    fetchPolicy: 'network-only',
    onCompleted: ({ room_type, style_type }) => setCategory(type === 'room' ? room_type : style_type),
  });
  const { loading } = useQuery<{
    portfolio: PortfolioType[];
    portfolio_aggregate: { aggregate: { count: number } };
  }>(API_GetPortfolio, {
    variables: { where: selected ? { [tableFilter]: { [fieldFilter]: { _eq: selected } } } : undefined },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ portfolio, portfolio_aggregate }) => {
      setPortfolios(portfolio);
      setTotal(portfolio_aggregate.aggregate.count);
      listRef.current?.scroll({ left: 0 });
    },
  });

  if (fetchingCategory) return null;

  return (
    <SectionContent title={'Nội thất theo ' + (type === 'room' ? 'không gian' : 'phong cách')}>
      <RoomList>
        <RoomTab $active={typeof selected === 'undefined'} onClick={() => setSelected(undefined)}>
          Tất cả
        </RoomTab>
        {categories?.map((cate) => (
          <RoomTab key={cate.id} $active={selected === cate.id} onClick={() => setSelected(cate.id)}>
            {cate.name}
          </RoomTab>
        ))}
      </RoomList>
      <PortfolioList>
        <Spin spinning={loading}>
          <Row gutter={[16, 32]} ref={listRef}>
            {portfolios?.map((item) => (
              <Col sm={12} md={8} key={item.id}>
                <PortfolioCard data={item} />
              </Col>
            ))}
          </Row>
        </Spin>
      </PortfolioList>
      {total > 9 && (
        <ButtonSeeAll>
          <Button>
            <Link href={'/y-tuong-thiet-ke' + (selected ? `?${type}=${selected}` : '')}>XEM TẤT CẢ</Link>
          </Button>
        </ButtonSeeAll>
      )}
    </SectionContent>
  );
};

export default PortfolioContainer;
