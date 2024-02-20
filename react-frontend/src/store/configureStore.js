import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '../reducers/companyReducer';

const store = configureStore({
  reducer: {
    companies: companyReducer,
  },
});

export default store;