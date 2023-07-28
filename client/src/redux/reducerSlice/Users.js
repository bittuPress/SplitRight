import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    token:'',
    fullName:'Subham',
    phoneNumber:'',
    isLoggedIn: false,
    email: ''
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUserDetails(state) {
        //code
      }
    },
  })
export const { setUserDetails} = userSlice.actions;
export default userSlice.reducer;