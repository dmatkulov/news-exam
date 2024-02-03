import React from 'react';
import {NewsMutation} from '../../../types';
import {Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {apiURL} from '../../../constants';
import noImage from '../../../assets/images/no-image-available.png';

interface Props {
  news: NewsMutation;
}

const NewsItem: React.FC<Props> = ({news}) => {
  const createdDate = dayjs(news.createdAt).format('DD.MM.YYYY HH:mm:ss');
  let cardImage = noImage;
  
  if (news.image) {
    cardImage = apiURL + '/' + news.image;
  }
  
  return (
    <Grid item>
      <Card sx={{display: 'flex'}}>
        <CardMedia
          sx={{ height: 140, width: 200 }}
          image={cardImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {news.title}
          </Typography>
          <Grid container alignItems="center" direction="row">
            <Typography variant="body2" color="text.secondary" sx={{marginRight: 3}}>
              At {createdDate}
            </Typography>
            <Button size="small">Read more</Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsItem;