import { createSlice } from "@reduxjs/toolkit";

export const usersDetails = createSlice(
  {
    name: 'usersDetails',
    initialState: {
      user : null,
      sender: null,
    },
    reducers: {
      setSender: (state, action) => {
        state.sender = action.payload;
      },
    }
  }
)

export const { setSender } = usersDetails.actions;

export default usersDetails.reducer;