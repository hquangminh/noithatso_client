import { createSlice } from '@reduxjs/toolkit';
import { AppState, AppStateWeb } from 'store/type';

const initialState: AppStateWeb = {
  openMenu: false,
  offline: false,
};

export const slice = createSlice({
  name: 'webRedux',
  initialState,
  reducers: {
    OpenMenu: (state) => {
      state.openMenu = true;
    },
    CloseMenu: (state) => {
      state.openMenu = false;
    },
    NetworkOffline: (state) => {
      state.offline = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { OpenMenu, CloseMenu, NetworkOffline } = slice.actions;

export const CheckMenuOpen = (state: AppState) => state.web.openMenu;

export default slice.reducer;
