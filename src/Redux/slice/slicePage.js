import { createSlice } from '@reduxjs/toolkit';

const initialState = 1;

const pageNum = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(_, action) {
      
      return action.payload;
    },
  },
});

export const { setPage } = pageNum.actions;

export default pageNum.reducer;
