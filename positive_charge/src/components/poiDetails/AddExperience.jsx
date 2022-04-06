import React, { useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios';

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


export default function AddExperience({open, onClose}) {

  const [experience, setExperience] = useState('');

  const shareExperience = (path) => {
    axios.post(path, {experience})
      .then((result) => {
        alert(result.data)
      })
  }

  return open ?
    ReactDom.createPortal(
      <>
        {/* background */}
        <div style={overlayStyle} />

        <div style={modalStyle}>
          add experience section
          <form onSubmit={() => shareExperience('/experiences')}>
            <label>
              Let other's know your experience
              <input type="text" onChange={event => setExperience(event.target.value)}/>
            </label>
            <input type="submit" value="Share Experience" />
        </form>
          <button onClick={onClose}>Close</button>

        </div>
      </>,
    document.getElementById('exp-portal')
  ) : null;
}
