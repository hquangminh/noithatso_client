import { BlogType } from './Blog';

export type HomePageBannerType = {
  title: string;
  caption: string;
  image: string;
  background?: string;
  link?: string;
};

export type HomePageType = {
  banner: HomePageBannerType[];
  blog: BlogType[];
};
