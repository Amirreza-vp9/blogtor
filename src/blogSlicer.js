import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    thisUser: null,
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.thisUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
