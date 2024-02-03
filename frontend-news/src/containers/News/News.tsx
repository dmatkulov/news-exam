import React, {useCallback, useEffect} from 'react';
import {Divider, Fab, Grid, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchAllNews} from '../../store/newsThunks';
import {selectAllNews} from '../../store/newsSlice';
import NewsItem from '../../components/UI/NewsItem/NewsItem';

const News: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews)
  
  const createNewPost = useCallback(() => {
    navigate('/new-post');
  }, []);
  
  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);
  
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center" sx={{marginBottom: 4, marginTop: 4}}>
        <Grid item>
          <Typography variant="h4">News</Typography>
        </Grid>
        <Grid item>
          <Fab color="primary" onClick={createNewPost}>
            <AddIcon/>
          </Fab>
        </Grid>
      </Grid>
      <Divider sx={{marginBottom: 4}}/>
      {news.map(news => (
        <NewsItem key={news.id} news={news}/>
      ))}
    </Grid>
  );
};

export default News;