import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { useNavigate } from "react-router";
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
/*
Styles here are just for positioning of the modal and will be refactored to scss or sass or whatever we decide to use later
*/
const modalStyle = {
  position: 'fixed',
  width: '50%',
  height: '50%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1001
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .6)',
  zIndex: 1001
}


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
      fullWidth='xl'
    >
      <Typography />
      <DialogContent>
        <form

          autoComplete='off'
        >
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
