import { CategoryProductType, CategoryRoomType } from './Category';

export type ProductOption = {
  id: number;
  index: 0 | 1;
  name: string;
  options: string[];
};

export enum ProductVariationType {
  ByProduct = 1,
  ByOption = 2,
}

export type ProductVariation = {
  id: number;
  combName?: string;
  combUnicode: string;
  link: string;
  price: number;
  promotion_price: number;
  size?: string;
  sku: string;
  stock: number;
  type: ProductVariationType;
};

export type ProductType = {
  id: number;
  name: string;
  image: string;
  background_color: string;
  status: boolean;
  created_at: string;
  updated_at?: string;
  variation_price: { price: number; promotion_price: number }[];
  price_min_max: {
    aggregate: {
      min: { price: number; promotion_price: number };
      max: { price: number; promotion_price: number };
    };
  };
};

export type ProductDetail = Omit<ProductType, 'variation_price' | 'price_min_max'> & {
  description: string | null;
  material: string[] | null;
  preparation_time: number | null;
  product_rooms: { room_id: number; room_type: CategoryRoomType }[];
  product_category_relations: { category_id: number; product_category: CategoryProductType }[];
  product_options: ProductOption[];
  product_variations: ProductVariation[];
};

export type GqlProduct = { product: ProductDetail[] };
