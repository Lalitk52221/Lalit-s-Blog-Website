import { configureStore } from "@reduxjs/toolkit";
import NavbarReducer from "../Redux/Slicer"
export const Store = configureStore({
    reducer:{ 
        navbarItem:NavbarReducer,
    },
});

