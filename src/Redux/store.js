import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slice/sliceArticles';
import pageNumReducer from './slice/slicePage';
import userAuthReducer from './slice/sliceAuthentication';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    page: pageNumReducer,
    user: userAuthReducer,
  },
});

export default store;
