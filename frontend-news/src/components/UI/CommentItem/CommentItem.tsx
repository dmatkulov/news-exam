import React from 'react';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {Comments} from '../../../types';


interface Props {
  comment: Comments;
  onDelete: () => void;
  deleteLoading: boolean | number;
}
const CommentItem: React.FC<Props> = ({comment, onDelete, deleteLoading}) => {
  return (
    <Grid item>
      <Card sx={{display: 'flex'}}>
        <CardContent>
          <Grid container alignItems="center" direction="row">
          <Typography gutterBottom variant="body1" component="div">
            {comment.author}
          </Typography>
            <Typography variant="body2" color="text.secondary" sx={{marginRight: 3}}>
              {comment.content}
            </Typography>
            <Button size="small"
                    onClick={onDelete}
                    disabled={deleteLoading ? deleteLoading === comment.newsId : false}
            >
              Delete
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommentItem;