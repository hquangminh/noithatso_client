export type PortfolioType = {
  id: number;
  name: string;
  image: string;
};

export type PortfolioDetail = PortfolioType & {
  portfolio_link: string;
  seo_title?: string;
  seo_description?: string;
};

export type GqlPortfolio = {
  portfolio: PortfolioDetail[];
};
