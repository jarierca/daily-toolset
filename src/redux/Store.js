// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './Reducer';

const store = configureStore({
  reducer: {
    app: reducer,
  },
});

export default store;
