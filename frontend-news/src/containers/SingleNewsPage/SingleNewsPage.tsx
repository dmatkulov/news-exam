import React from 'react';
import NewsPageItem from '../../components/UI/NewsPageItem/NewsPageItem';
import {useAppSelector} from '../../app/hooks';
import {selectFetchOneLoading, selectOneNews} from '../../store/newsSlice';
import {CircularProgress, Typography} from '@mui/material';

const SingleNewsPage: React.FC = () => {
  const news = useAppSelector(selectOneNews);
  const isLoading = useAppSelector(selectFetchOneLoading);
  
  return(
    <div>
      {isLoading && (<CircularProgress/>)}
      {news ? (
        <NewsPageItem news={news}/>
      ) : (
        <Typography variant="h4">
          Article not found
        </Typography>
      )}
    </div>
  );
};

export default SingleNewsPage;