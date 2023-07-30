import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    token:'',
    userDetails:'',
    isLoggedIn: false
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUserDetails(state,actions) {
        // debugger;
        const {token, userDetails} = actions.payload
        return{//adding token & userdetails on existing state
          ...state,
          token,
          userDetails,
          isLoggedIn:true
        }
      }
    },
  })
export const { setUserDetails} = userSlice.actions;
export default userSlice.reducer;