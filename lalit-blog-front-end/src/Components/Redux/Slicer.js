import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value:false,
}
export const Slice = createSlice({
    name:"navbarItem",
    initialState,
    reducers:{
        showNavItem : (state)=>{
            state.value = true
        },
        hideNavItem :(state)=>{
            state.value = false
        }
    }
})

export const {showNavItem, hideNavItem} = Slice.actions
export default Slice.reducer