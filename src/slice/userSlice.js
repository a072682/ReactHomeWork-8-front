// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', //名稱
  initialState: { //初始數值
    
  },
  reducers: {
    
  },
});

export const {  } = userSlice.actions; //是為了在外部可以使用函式
export default userSlice.reducer;