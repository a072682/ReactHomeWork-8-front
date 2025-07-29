import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import dataReducer from './slice/dataSlice';


export const store = configureStore({
    reducer: { // 必要加入 reducer
        user: userReducer,
        data: dataReducer,
      }
});
export default configureStore;

