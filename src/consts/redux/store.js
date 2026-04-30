import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/Reducers';
import galleryReducer from './reducers/gallerySlice';

export default configureStore({
  reducer: {
    user: userReducer,
    gallery: galleryReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
