import { AccountType } from 'interface/Account';
import { ProductCart } from 'interface/Cart';

export type AppState = {
  web: AppStateWeb;
  auth?: AppStateAuth;
  cart: AppStateCart;
};

export type AppStateWeb = {
  openMenu: boolean;
  offline: boolean;
};

export type AppStateAuth = {
  me?: AccountType;
  token?: string;
};

export type AppStateCart = {
  product: ProductCart[];
};
