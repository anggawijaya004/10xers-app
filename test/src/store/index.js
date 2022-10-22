import {configureStore} from '@reduxjs/toolkit';
import collectionReducer from './Feature/collectionSlice';

export default configureStore({
  reducer: {
    collection: collectionReducer,
  },
});
