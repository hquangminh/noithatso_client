import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, AppStateCart } from 'store/type';
import { ProductCart } from 'interface/Cart';

const initialState: AppStateCart = {
  product: [],
};

export const slice = createSlice({
  name: 'cartRedux',
  initialState,
  reducers: {
    SetDataCart: (state, action: PayloadAction<ProductCart[]>) => {
      localStorage.setItem('cart', JSON.stringify(action.payload));

      state.product = action.payload;
    },
    ResetCart: (state) => {
      localStorage.setItem('cart', JSON.stringify([]));

      state.product = [];
    },
    AddToCart: (state, action: PayloadAction<ProductCart>) => {
      try {
        const { product_id, variation_id, quantity, status } = action.payload;

        let product = [...state.product];
        const isExist = product.some((i) => i.product_id === product_id && i.variation_id === variation_id);
        if (isExist) {
          const index = product.findIndex(
            (i) => i.product_id === product_id && i.variation_id === variation_id,
          );
          product.splice(index, 1, { ...action.payload, quantity: product[index].quantity + quantity });
        } else product.unshift(action.payload);

        localStorage.setItem('cart', JSON.stringify(product));

        state.product = product;
      } catch (error) {}
    },
    RemoveCart: (state, action: PayloadAction<Omit<ProductCart, 'quantity'>[]>) => {
      let product = [...state.product];
      for (const { product_id, variation_id } of action.payload) {
        const index = product.findIndex(
          (i) => i.product_id === product_id && i.variation_id === variation_id,
        );
        product.splice(index, 1);
      }

      state.product = product;

      localStorage.setItem('cart', JSON.stringify(product));
    },
    ChangeVariation: (
      state,
      action: PayloadAction<{ old_product: ProductCart; new_product: ProductCart }>,
    ) => {
      const { old_product, new_product } = action.payload;

      let product = [...state.product];

      const oldIndex = product.findIndex(
        (i) => i.product_id === old_product.product_id && i.variation_id === old_product.variation_id,
      );
      product.splice(oldIndex, 1, new_product);
      // product.unshift(new_product);

      state.product = product;

      localStorage.setItem('cart', JSON.stringify(product));
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetDataCart, ResetCart, AddToCart, RemoveCart, ChangeVariation } = slice.actions;

export const GetCart = (state: AppState) => state.cart.product;
export const GetCartTotal = (state: AppState) =>
  state.cart.product.reduce((total, product) => total + product.quantity, 0);
export const GetProductQuantityCart = (state: AppState, product: { id: number; variation_id: number }) =>
  state.cart.product.find((p) => p.product_id === product.id && p.variation_id === product.variation_id)
    ?.quantity ?? 0;

export default slice.reducer;
