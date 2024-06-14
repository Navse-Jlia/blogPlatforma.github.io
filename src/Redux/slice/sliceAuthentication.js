import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: localStorage.getItem('token') ?? null,
  username: localStorage.getItem('username') ?? '',
  email: localStorage.getItem('email') ?? '',
  image: localStorage.getItem('image') ?? '',
};

const userAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token: jwt, username, email, image } = action.payload;
      state.jwt = jwt;
      state.username = username;
      state.email = email;
      state.image = image;
    },
  },
});

export const { setAuth } = userAuth.actions;
export default userAuth.reducer;
