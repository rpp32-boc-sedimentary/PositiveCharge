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
    console.log(exp)
    axios.put(`/details/${path}/love`, {
      'name': name,
      'experience': exp
    })
      .then((response) => {
        // send something like loved x thing
        console.log(response.data)
      })
  };

  const flag = (path) => {
    axios.put(`/details/${path}/flag`, {'name': name})
      .then((response) => {
        // send something like flagged x thing
        console.log(response.data)
      })
  };

  return open &&
    ReactDom.createPortal(
      <>
        {/* background */}
        <div style={overlayStyle} />

        {/* modal itself */}
        <div style={modalStyle}>
          {console.log('modal ',name)}
          <h2>{name?.props ? name.props.name : 'loading...'}</h2>
          {/* experiences section */}
          <div>
            <div>
              {/* experience list */}
              {detail[0]?.experience ? detail.map((exp, index) => {
               return <div key={index}>
                  <span>loves = {exp.exp_loves}</span><br/>
                  <span>flag = {exp.exp_flag_status}</span><br/>
                  <span>{exp.experience}</span>
                  {/* love button for experiences*/}
                  <button onClick={() => love('experience', exp.experience)}>Love</button>
                  {/* flag button for experiences*/}
                  <button onClick={() => flag('experience')}>Flag</button>
                </div>
              }) : 'Be the first to add your experience!'}
            </div>
          </div>

          {/* love button for poi's */}
          <button onClick={() => love('poi')}>Love</button>

          {/* add experience button for poi's */}
          <button onClick={() => setIsOpen(true)}>add experience</button>
          <AddExperience open={isOpen} onClose={() => setIsOpen(false)} name={name}></AddExperience>

          {/* flag button for poi's */}
          <button onClick={() => flag('poi')}>Flag</button>

          {/* close button */}
          <button onClick={onClose}>Close</button>

        </div>

      </>,
    document.getElementById('modal-portal')
  );
}
