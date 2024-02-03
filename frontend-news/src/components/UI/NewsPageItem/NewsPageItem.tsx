import React from 'react';
import {Divider, Grid, Typography} from '@mui/material';
import {SingleNews} from '../../../types';
import dayjs from 'dayjs';

interface Props {
  news: SingleNews;
}
const NewsPageItem: React.FC<Props> = ({news}) => {
  const createdDate = dayjs(news.createdAt).format('DD.MM.YYYY HH:mm:ss');
  
  return (
    <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4" sx={{mb: 4}}>{news.title}</Typography>
        </Grid>
        <Divider/>
        <Grid item>
          <Typography variant="body2" color="text.secondary" sx={{marginRight: 3, mb: 4}}>
            At {createdDate}
          </Typography>
          <Typography variant="body2">{news.content}</Typography>
        </Grid>
    </Grid>
  );
};

export default NewsPageItem;