import React, {useCallback} from 'react';
import NewsPageItem from '../../components/UI/NewsPageItem/NewsPageItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCommentDeleteLoading,
  selectComments,
  selectFetchCommentLoading,
  selectFetchOneLoading,
  selectOneNews
} from '../../store/newsSlice';
import {CircularProgress, Typography} from '@mui/material';
import CommentItem from '../../components/UI/CommentItem/CommentItem';
import {deleteComment, fetchComment} from '../../store/newsThunks';

const SingleNewsPage: React.FC = () => {
  const news = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectFetchOneLoading);
  const commentsLoading = useAppSelector(selectFetchCommentLoading);
  
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectCommentDeleteLoading);
  
  const onDelete = useCallback(async (id: number) => {
    await dispatch(deleteComment(id));
    await dispatch(fetchComment(id));
  }, [dispatch]);
  
  return (
    <div>
      {isLoading && (<CircularProgress/>)}
      {news && (
        <NewsPageItem news={news}/>
      )}
      {commentsLoading && (<CircularProgress/>)}
      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onDelete={() => onDelete(comment.id)} deleteLoading={deleteLoading}/>
        ))
      ) : (
        <Typography variant="body1">No comments</Typography>
      )}
    </div>
  );
};

export default SingleNewsPage;