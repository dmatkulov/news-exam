import React from 'react';
import {Divider, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateLoading} from '../../store/newsSlice';
import {ApiNews} from '../../types';
import {createNewPost, fetchAllNews} from '../../store/newsThunks';
import {useNavigate} from 'react-router-dom';
import NewsForm from '../../components/UI/NewsForm/NewsForm';

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateLoading);
  
  const onSubmit = async (news: ApiNews) => {
    await dispatch(createNewPost(news));
    await dispatch(fetchAllNews());
    navigate('/');
  };
  
  return (
    <>
      <Grid item>
        <Typography variant="h4">Add new post</Typography>
      </Grid>
      <Divider sx={{marginBottom: 4, marginTop: 4}}/>
      <NewsForm
        onSubmit={onSubmit}
        isLoading={isCreating}
      />
    </>
  );
};

export default NewPost;