export type SeoData = {
  title: string;
  description: string;
  image?: string;
  keyword?: string;
};

export type PageProps = {
  seoData?: SeoData;
};
