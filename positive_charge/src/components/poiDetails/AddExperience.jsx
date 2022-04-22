import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { useNavigate } from "react-router";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddExperience({open, onClose, name}) {

  const [experience, setExperience] = useState('');

  const navigate = useNavigate();

  const shareExperience = (path) => {
    axios.post(`/details${path}`, {
      experience: experience,
      id: name.props.id,
      name: name.props.name
    })
      .then((result) => {

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const submitFormRedirect = () => {
    navigate('/');
  }

  return (
    <Dialog
      className='add-experience-modal'
      onClose={onClose}
      open={open}
      fullWidth={true}
    >
      <Typography />
      <DialogContent>
        <form autoComplete='off'>
          <TextField
            id="add-experience-textfield"
            label="Share your experience"
            variant="outlined"
            onChange={event => setExperience(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon />
                </InputAdornment>
              ),
            }}
            size="large"
            fullWidth
            required
          >
            <AddIcon />
          </TextField>


        </form>
        <DialogActions>
          <Button
            variant='outlined'type="submit"
            onClick={() => {
              shareExperience('/experiences')
              submitFormRedirect();
            }}>
            Share
          </Button>
          <Button variant='outlined' onClick={onClose}>Close</Button>
        </DialogActions>

      </DialogContent>



    </Dialog>
  );
}
