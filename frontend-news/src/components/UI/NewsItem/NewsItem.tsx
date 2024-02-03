import React from 'react';
import {NewsMutation} from '../../../types';
import {Button, Card, CardContent, CardHeader, Grid} from '@mui/material';
import dayjs from 'dayjs';
// import noImage from 'src/assets/images/no-image-available.png';

interface Props {
  news: NewsMutation;
}


const NewsItem: React.FC<Props> = ({news}) => {
  const createdDate = dayjs(news.createdAt).format('DD.MM.YYYY HH:mm:ss');
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardHeader title={news.title}/>
        <CardContent>
          At {createdDate}
          <Button variant="text">Read more</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsItem;