import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  isMenuOpen: false,
  isUpdatePage: false,
  progress:0,
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
    updateProgress: (state, action) => {
      state.progress = action.payload;
    }
  },
});

export const {
  showNavItem,
  hideNavItem,
  toggleMenu,
  updatePage,
  updateProgress
} = Slice.actions;
export default Slice.reducer;
