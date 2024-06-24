import { createSlice } from "@reduxjs/toolkit";
//import { login, logout } from "../firebase";

const initialState = {
    user: false
}
const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.user = action.payload
      },
      logout: state => {
        state.user = false
      }
    }
})



export const { login, logout} =auth.actions
export default auth.reducer