import {News, NewsMutation} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

interface NewsState {
  items: NewsMutation[];
  item: News | null;
  comments: Comment[];
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  deleteLoading: false | string;
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
  reducers: {}
});

export const newsReducer = newsSlice.reducer;

export const selectAllNews = (state: RootState) => state.news.items;
export const selectOneNews = (state: RootState) => state.news.item;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectFetchAllLoading = (state: RootState) => state.news.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.news.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;