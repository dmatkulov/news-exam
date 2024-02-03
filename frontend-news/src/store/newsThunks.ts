import {createAsyncThunk} from '@reduxjs/toolkit';
import {NewsMutation} from '../types';
import axiosApi from '../axiosApi';

export const fetchAllNews = createAsyncThunk<NewsMutation[]>(
  'news/fetchAll',
  async () => {
    const newsResponse = await axiosApi.get<NewsMutation[] | null>('/news');
    const news = newsResponse.data;
    
    if (!news) {
      return [];
    }
    
    return news;
  }
)