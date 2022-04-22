import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  Divider
} from '@mui/material';

import AddExperience from './AddExperience.jsx';

const modalStyle = {
  position: 'fixed',
  width: '70%',
  height: '80%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)',
  zIndex: 1000
};


export default function PoiModal({open, onClose, detail, name}) {

  const [isOpen, setIsOpen] = useState(false);
  const [showMore, showMoreExp] = useState(false);

  const love = (path, exp) => {
    axios.post(`/details/${path}/love`, {
      'name': name.props.id,
      'experience': exp,
      'email': name.userEmail
    })
      .then((response) => {
        alert(`Thanks for the love!`)
      })
  };

  const flag = (path, exp) => {
    axios.post(`/details/${path}/flag`, {
      'name': name.props.id,
      'experience': exp,
      'email': name.userEmail
    })
      .then((response) => {
        // send something like flagged x thing
        alert('We will review the flag you submitted')
      })
  };

  const sortExperiences = (details) => {
    details.sort((a, b) => {
      return b.exp_loves - a.exp_loves;
    })
    return details;
  }
  const sortedDetails = sortExperiences(detail);

  let minExp = Math.min(5, sortedDetails.length);

  const displayExperiences = () => {
    let exp = showMore ? minExp = sortedDetails.length : minExp;
    return sortedDetails.slice(0, exp).map((exp, index) => {
      return <List key={index}>
         <DialogContentText>{exp.experience}</DialogContentText><br/>
         <DialogContentText>loves = {exp.exp_loves}</DialogContentText><br/>
         <DialogContentText>{exp.exp_flag_status === true ? 'Flagged for review' : 'Flag experience'}</DialogContentText>
         <DialogActions>
          <Button variant='outlined' onClick={() => love('experience', exp.experience)}>Love</Button>
          <Button variant='outlined' onClick={() => flag('experience', exp.experience)}>Flag</Button>
         </DialogActions>
       </List>
     })
  }

  return (
    <Dialog
      className='experiences-modal'
      onClose={onClose}
      open={open}
      fullWidth='xl'
    >
      <DialogTitle>{name?.props ? name.props.name : 'loading...'}</DialogTitle>

      <List>
        {detail[0]?.experience ? displayExperiences() : 'Be the first to add your experience!'}
      </List>

      <DialogActions>
        <Button variant='outlined' onClick={() => showMoreExp(!showMore)}>{showMore ? 'see less' : 'see more experiences'}</Button>
      </DialogActions>

      <Divider />

      <DialogActions>
        <Button variant='outlined' onClick={() => {love('poi')}}>Love</Button>
        {detail[0]?.loves ? detail[0].loves + ' loves' : null}
      </DialogActions>

      <DialogActions>
        <Button variant='outlined' onClick={() => setIsOpen(true)}>experience</Button>
      </DialogActions>

      <DialogActions>
        <AddExperience open={isOpen} onClose={() => setIsOpen(false)} name={name}></AddExperience>
      </DialogActions>

      <DialogActions>
        {detail[0]?.flag_status === true ? 'This location is flagged for review' :
        <Button variant='outlined' onClick={() => flag('poi')}>Flag</Button>}
      </DialogActions>

      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Close</Button>
      </DialogActions>

    </Dialog>
  );
}
