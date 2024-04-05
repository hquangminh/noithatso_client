import { Fragment } from 'react';
import { GetServerSideProps } from 'next';

import withApollo from 'lib/withApollo';
import withLayout from 'lib/withLayout';

import { graphqlClient } from 'server/configs/graphqlClient';
import { API_GetPortfolioDetail } from 'graphql/portfolio/query';

import HeadSeo from 'components/Fragments/HeadSeo';
import PortfolioDetailContainer from 'containers/Portfolio/PortfolioDetailContainer';

import { GqlPortfolio, PortfolioDetail } from 'interface/Portfolio';

type Props = { portfolio: PortfolioDetail };

const Index = ({ portfolio }: Props) => {
  return (
    <Fragment>
      <HeadSeo
        name={portfolio.name}
        image={portfolio.image}
        descriptions={portfolio.seo_description}
        twitter_card='summary_large_image'
      />
      <PortfolioDetailContainer data={portfolio} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (content) => {
  const portfolioData = await graphqlClient.request<GqlPortfolio>(API_GetPortfolioDetail, {
    id: content.query.portfolioID?.toString().split('--')[1],
  });

  return { props: { portfolio: portfolioData.portfolio[0] } };
};

export default withApollo(withLayout(Index));
