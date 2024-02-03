import React, {useState} from 'react';
import {ApiNews} from '../../../types';
import {Grid, TextField} from '@mui/material';
import FileInput from '../FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  onSubmit: (news: ApiNews) => void;
  isLoading: boolean;
}

const NewsForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<ApiNews>({
    title: '',
    content: '',
    image: null
  });
  
  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
    setState({
      title: '',
      content: '',
      image: null
    });
  };
  
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    
    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };
  
  return (
    <>
      <form onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              required
              id="title"
              label="Title"
              name="title"
              fullWidth
              onChange={inputChangeHandler}
              value={state.title}
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
            <FileInput
              name="image"
              label="Image"
              onChange={fileInputChangeHandler}
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
              Create
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewsForm;