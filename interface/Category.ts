export type CategoryRoomType = {
  id: number;
  name: string;
  portfolio_rooms_aggregate: { aggregate: { count: number } };
  product_rooms_aggregate: { aggregate: { count: number } };
};

export type CategoryStyleType = Omit<CategoryRoomType, 'portfolio_rooms_aggregate'> & {
  portfolio_styles_aggregate: { aggregate: { count: number } };
};

export type CategoryProductType = Omit<CategoryRoomType, 'portfolio_rooms_aggregate'> & {
  parent_id?: number;
  product_category_relations_aggregate: { aggregate: { count: number } };
};

export type HashtagItem = {
  id: number;
  name: string;
};
