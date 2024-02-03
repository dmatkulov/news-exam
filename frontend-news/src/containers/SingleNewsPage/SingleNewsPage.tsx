import React, {useCallback} from 'react';
import NewsPageItem from '../../components/UI/NewsPageItem/NewsPageItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCommentDeleteLoading,
  selectComments,
  selectCreateCommentLoading,
  selectFetchCommentLoading,
  selectFetchOneLoading,
  selectNewsId,
  selectOneNews
} from '../../store/newsSlice';
import {CircularProgress, Divider, Typography} from '@mui/material';
import CommentItem from '../../components/UI/CommentItem/CommentItem';
import {createComment, deleteComment, fetchComment} from '../../store/newsThunks';
import CommentForm from '../../components/UI/CommentItem/CommentForm';
import {CommentsWithoutId} from '../../types';

const SingleNewsPage: React.FC = () => {
  const news = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectFetchOneLoading);
  const isCreating = useAppSelector(selectCreateCommentLoading);
  const commentsLoading = useAppSelector(selectFetchCommentLoading);
  const newsIdFromState = useAppSelector(selectNewsId);
  
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectCommentDeleteLoading);
  
  const onDelete = useCallback(async (id: number) => {
    await dispatch(deleteComment(id));
    await dispatch(fetchComment(id));
  }, [dispatch]);
  
  
  const onSubmit = async (comment: CommentsWithoutId) => {
    await dispatch(createComment({
      newsId: newsIdFromState,
      ...comment}));

    await dispatch(fetchComment(newsIdFromState));
  };
  
  return (
    <div>
      {isLoading && (<CircularProgress/>)}
      {news && (
        <NewsPageItem news={news}/>
      )}
      {commentsLoading && (<CircularProgress/>)}
      {comments.length > 0 ? (
        comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onDelete={() => onDelete(comment.id)}
                       deleteLoading={deleteLoading}/>
        ))
      ) : (
        <Typography variant="body1">No comments</Typography>
      )}
      <Divider/>
      <CommentForm isLoading={isCreating} onSubmit={onSubmit}/>
    </div>
  );
};

export default SingleNewsPage;