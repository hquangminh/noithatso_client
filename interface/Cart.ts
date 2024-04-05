export enum ProductCartStatus {
  NORMAL = 'NORMAL',
  HIDDEN = 'HIDDEN',
  PRODUCT_OUT_STOCK = 'PRODUCT_OUT_STOCK',
  VARIATION_OUT_STOCK = 'VARIATION_OUT_STOCK',
  NOT_ENOUGH_STOCK = 'NOT_ENOUGH_STOCK',
  PRICE_CHANGE = 'PRICE_CHANGE',
}
export type ProductCart = {
  product_id: number;
  name: string;
  image: string;
  background: string;
  variation_id: number;
  variation_name?: string;
  price: number;
  quantity: number;
  status: ProductCartStatus;
};
