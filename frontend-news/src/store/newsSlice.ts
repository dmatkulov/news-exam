import {Comments, NewsMutation, SingleNews} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {createNewPost, deleteComment, deleteNews, fetchAllNews, fetchComment, fetchOneNews} from './newsThunks';

interface NewsState {
  items: NewsMutation[];
  item: SingleNews | null;
  comments: Comments[];
  createLoading: boolean;
  fetchLoading: boolean;
  fetchCommentLoading: boolean;
  fetchOneLoading: boolean;
  deleteLoading: false | number;
  deleteCommentLoading: false | number;
}

const initialState: NewsState = {
  items: [],
  item: null,
  comments: [],
  createLoading: false,
  fetchLoading: false,
  fetchCommentLoading: false,
  fetchOneLoading: false,
  deleteLoading: false,
  deleteCommentLoading: false
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
    }).addCase(fetchComment.pending, (state) => {
      state.fetchCommentLoading = true;
    }).addCase(fetchComment.fulfilled, (state, {payload: comments}) => {
      state.fetchCommentLoading = false;
      state.comments = comments;
    }).addCase(fetchComment.rejected, (state) => {
      state.fetchCommentLoading = false;
    }).addCase(deleteComment.pending, (state, {meta}) => {
      state.deleteCommentLoading = meta.arg;
    }).addCase(deleteComment.fulfilled, (state) => {
      state.deleteCommentLoading = false;
    }).addCase(deleteComment.rejected, (state) => {
      state.deleteCommentLoading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;

export const selectAllNews = (state: RootState) => state.news.items;
export const selectComments = (state: RootState) => state.news.comments;
export const selectOneNews = (state: RootState) => state.news.item;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectFetchAllLoading = (state: RootState) => state.news.fetchLoading;
export const selectFetchCommentLoading = (state: RootState) => state.news.fetchCommentLoading;
export const selectFetchOneLoading = (state: RootState) => state.news.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;
export const selectCommentDeleteLoading = (state: RootState) => state.news.deleteCommentLoading;