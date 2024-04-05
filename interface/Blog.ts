import { ProductType } from './Product';

export type BlogCategory = {
  id: number;
  name: string;
  status: boolean;
  blog_total?: number;
};

export type BlogProducts = { product: ProductType }[];

export type BlogType = {
  id: number;
  title: string;
  image: string;
  summary: string;
  status: boolean;
  publish_date: string;
  category_id: string;
  blog_category: { id: number; name: string };
};

export type BlogDetail = BlogType & {
  content: string;
  blog_products?: BlogProducts;
  seo_title?: string;
  seo_description?: string;
};

export type GqlBlog = { blog: BlogType[] };
export type GqlBlogCategory = { blog_category: BlogCategory[] };
