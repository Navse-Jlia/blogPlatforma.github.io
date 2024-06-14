import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  articles: [],
  isLoad: false,
  error: null,
};

export const sliceArticles = createAsyncThunk('articles/sliceArticles', async (offset) => {
  try {
    const res = await axios.get(
      `https://blog.kata.academy/api/articles?limit=10&offset=${offset}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      },
    );
    localStorage.setItem('articles', JSON.stringify(res.data.articles));
    return res.data.articles;
  } catch (error) {
    throw error.message;
  }
});

const articlesData = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sliceArticles.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(sliceArticles.fulfilled, (state, action) => {
        state.isLoad = true;
        state.articles = action.payload;
      })
      .addCase(sliceArticles.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.error.message;
      });
  },
});

export default articlesData.reducer;
