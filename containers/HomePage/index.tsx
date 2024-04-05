import { Fragment } from 'react';

import HomePageBannerCarouselContainer from './BannerCarouselContainer';
import OurPartnerContainer from './OurPartnerContainer';
import PortfolioContainer from './PortfolioContainer';
import ModernContainer from './ModernContainer';
import OutstandingServiceContainer from './OutstandingServiceContainer';
import BlogContainer from './BlogContainer';
import SubscribeFragment from 'components/Fragments/Subscribe';

import { HomePageType } from 'interface/HomePage';

const HomePageContainer = ({ data }: { data: HomePageType }) => {
  return (
    <Fragment>
      <HomePageBannerCarouselContainer data={data.banner} />
      <OurPartnerContainer />
      <PortfolioContainer type='room' />
      <ModernContainer />
      <PortfolioContainer type='style' />
      <OutstandingServiceContainer />
      <BlogContainer data={data.blog} />
      <SubscribeFragment />
    </Fragment>
  );
};

export default HomePageContainer;
