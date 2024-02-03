import React, {useCallback} from 'react';
import {NewsMutation} from '../../../types';
import {Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {apiURL} from '../../../constants';
import noImage from '../../../assets/images/no-image-available.png';
import {useAppDispatch} from '../../../app/hooks';
import {deleteNews, fetchAllNews, fetchOneNews} from '../../../store/newsThunks';
import {useNavigate} from 'react-router-dom';

interface Props {
  news: NewsMutation;
}

const NewsItem: React.FC<Props> = ({news}) => {
  const navigate = useNavigate();
  const createdDate = dayjs(news.createdAt).format('DD.MM.YYYY HH:mm:ss');
  const dispatch = useAppDispatch();
  let cardImage = noImage;
  
  if (news.image) {
    cardImage = apiURL + '/' + news.image;
  }
  
  const onDelete = useCallback(async () => {
    await dispatch(deleteNews(news.id));
    await dispatch(fetchAllNews());
  }, [dispatch, news.id]);
  
  const fetchOne = useCallback(async (id: number) => {
    await dispatch(fetchOneNews(id));
    navigate(`/news/${news.id}`);
  }, [dispatch, navigate, news.id]);
  
  return (
    <Grid item>
      <Card sx={{display: 'flex'}}>
        <CardMedia
          sx={{height: 140, width: 200}}
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
            <Button size="small" onClick={() => fetchOne(news.id)}>Read more</Button>
            <Button size="small" onClick={onDelete}>Delete</Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsItem;