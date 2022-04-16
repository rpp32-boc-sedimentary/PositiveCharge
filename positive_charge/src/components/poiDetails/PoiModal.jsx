import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

import AddExperience from './AddExperience.jsx';

/*
Styles here are just for positioning of the modal and will be refactored to scss or sass or whatever we decide to use later
*/
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

  const love = (path, exp) => {
    axios.put(`/details/${path}/love`, {
      'name': name,
      'experience': exp
    })
      .then((response) => {
        // send something like loved x thing
        alert(`Thanks for the love!`)
      })
  };

  const flag = (path, exp) => {
    axios.put(`/details/${path}/flag`, {
      'name': name,
      'experience': exp
    })
      .then((response) => {
        // send something like flagged x thing
        alert('We will review the flag you submitted')
      })
  };

  return open &&
    ReactDom.createPortal(
      <>
        {/* background */}
        <div style={overlayStyle} />

        {/* modal itself */}
        <div style={modalStyle}>
          <h2>{name?.props ? name.props.name : 'loading...'}</h2>
          {/* experiences section */}
          <div>
            <div>
              {/* experience list */}
              {detail[0]?.experience ? detail.map((exp, index) => {
               return <div key={index}>
                  <span>{exp.experience}</span><br/>
                  <span>loves = {exp.exp_loves}</span><br/>
                  <span>{exp.exp_flag_status === true ? 'Flagged for review' : 'Flag experience'}</span>
                  {/* love button for experiences*/}
                  <button onClick={() => love('experience', exp.experience)}>Love</button>
                  {/* flag button for experiences*/}
                  <button onClick={() => flag('experience', exp.experience)}>Flag</button>
                </div>
              }) : 'Be the first to add your experience!'}
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          {/* love button for poi's */}
          <button onClick={() => love('poi')}>Love</button>
          {detail[0]?.loves ? detail[0].loves + ' loves' : null}<br/>
          {/* add experience button for poi's */}
          <button onClick={() => setIsOpen(true)}>add experience</button>
          <AddExperience open={isOpen} onClose={() => setIsOpen(false)} name={name}></AddExperience>

          {/* flag button for poi's */}
          {detail[0]?.flag_status === true ? 'This location is flagged for review' :
          <button onClick={() => flag('poi')}>Flag</button>}

          {/* close button */}
          <button onClick={onClose}>Close</button>

        </div>

      </>,
    document.getElementById('modal-portal')
  );
}
