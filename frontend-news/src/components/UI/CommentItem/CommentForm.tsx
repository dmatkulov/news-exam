import React, {useState} from 'react';
import {Grid, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import {CommentsWithoutId} from '../../../types';

interface Props {
  onSubmit: (comment: CommentsWithoutId) => void;
  isLoading: boolean;
}

const CommentForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<CommentsWithoutId>({
    author: '',
    content: ''
  });
  
  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
    setState({
      author: '',
      content: '',
    });
  };
  
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  
  return (
    <>
      <form onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="name"
              label="Name"
              name="author"
              fullWidth
              onChange={inputChangeHandler}
              value={state.author}
            />
          </Grid>
          <Grid item xs>
            <TextField
              required
              id="content"
              label="Content"
              name="content"
              fullWidth
              onChange={inputChangeHandler}
              value={state.content}
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<AddIcon/>}
            >
              Add comment
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CommentForm;