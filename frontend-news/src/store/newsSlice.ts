import {NewsMutation, SingleNews} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {createNewPost, deleteNews, fetchAllNews, fetchOneNews} from './newsThunks';

interface NewsState {
  items: NewsMutation[];
  item: SingleNews | null;
  comments: Comment[];
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  deleteLoading: false | number;
}

const initialState: NewsState = {
  items: [],
  item: null,
  comments: [],
  createLoading: false,
  fetchLoading: false,
  fetchOneLoading: false,
  deleteLoading: false
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllNews.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchAllNews.fulfilled, (state, {payload: news}) => {
      state.fetchLoading = false;
      state.items = news.reverse();
    }).addCase(fetchAllNews.rejected, (state) => {
      state.fetchLoading = false;
    }).addCase(createNewPost.pending, (state) => {
      state.createLoading = true;
    }).addCase(createNewPost.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createNewPost.rejected, (state) => {
      state.createLoading = false;
    }).addCase(deleteNews.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    }).addCase(deleteNews.fulfilled, (state) => {
      state.deleteLoading = false;
    }).addCase(deleteNews.rejected, (state) => {
      state.deleteLoading = false;
    }).addCase(fetchOneNews.pending, (state) => {
      state.fetchOneLoading = true;
    }).addCase(fetchOneNews.fulfilled, (state, {payload: news}) => {
      state.fetchOneLoading = false;
      state.item = news;
    }).addCase(fetchOneNews.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;

export const selectAllNews = (state: RootState) => state.news.items;
export const selectOneNews = (state: RootState) => state.news.item;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectFetchAllLoading = (state: RootState) => state.news.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.news.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;