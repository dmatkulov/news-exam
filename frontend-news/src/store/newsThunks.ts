import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiNews, News, NewsMutation, SingleNews} from '../types';
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
);

export const fetchOneNews = createAsyncThunk<SingleNews | null, number>(
  'news/fetchOne',
  async (id) => {
    const newsResponse = await axiosApi.get<News | null>('/news/' + id);
    const news = newsResponse.data;
    
    if (!news) {
      return null;
    }
    
    const selectedNews: SingleNews = {
      title: news.title,
      content: news.content,
      createdAt: news.createdAt,
    };
    return selectedNews;
  }
);

export const createNewPost = createAsyncThunk<void, ApiNews>(
  'news/create',
  async (news) => {
    const formData = new FormData();
    
    formData.append('title', news.title);
    formData.append('content', news.content);
    
    if (news.image) {
      formData.append('image', news.image);
    }
    
    await axiosApi.post('/news', formData);
  }
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/delete',
  async (id) => {
    await axiosApi.delete('/news/' + id);
  }
);