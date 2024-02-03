import React, {useRef, useState} from 'react';
import {Grid, IconButton, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [filename, setFilename] = useState('');
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    
    onChange(e);
  };
  
  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid style={{position: 'relative'}}>
        <TextField
          disabled
          label={label}
          value={filename}
          onClick={activateInput}
          fullWidth
        />
        <IconButton
          onClick={activateInput}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 3,
            transform: 'translateY(-50%)',
          }}
        >
          <AddIcon/>
        </IconButton>
      </Grid>
    </>
  );
};

export default FileInput;