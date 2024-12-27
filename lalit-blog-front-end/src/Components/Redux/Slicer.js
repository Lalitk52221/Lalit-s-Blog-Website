import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  isMenuOpen: false,
  isUpdatePage: false,
};
export const Slice = createSlice({
  name: "navbarItem",
  initialState,
  reducers: {
    showNavItem: (state) => {
      state.value = true;
    },
    hideNavItem: (state) => {
      state.value = false;
    },
    toggleMenu: (state,action) => {
      state.isMenuOpen = action.payload;
    },

    updatePage: (state, action) => {
      state.isUpdatePage = action.payload;
    },
  },
});

export const {
  showNavItem,
  hideNavItem,
  toggleMenu,
  updatePage,
} = Slice.actions;
export default Slice.reducer;
