// src/consts/redux/reducers/gallerySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
  likedImages: [],   // array of image IDs
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    toggleLike(state, action) {
      const id = action.payload;
      if (state.likedImages.includes(id)) {
        state.likedImages = state.likedImages.filter(lid => lid !== id);
      } else {
        state.likedImages.push(id);
      }
    },
    updateImageLikes(state, action) {
      const { id, likes } = action.payload;
      const img = state.images.find(i => i.id === id);
      if (img) img.likes = likes;
    },
  },
});

export const { setImages, setLoading, setError, toggleLike, updateImageLikes } =
  gallerySlice.actions;

export const selectImages     = state => state.gallery.images;
export const selectLikedImages = state => state.gallery.likedImages;
export const selectLoading    = state => state.gallery.loading;
export const selectError      = state => state.gallery.error;

export default gallerySlice.reducer;
