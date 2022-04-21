import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { useNavigate } from "react-router";
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


export default function AddExperience({open, onClose, name}) {

  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const shareExperience = (path) => {
    axios.post(`/details${path}`, {
      experience: experience,
      id: name.props.id,
      name: name.props.name,
      lat: name.props.coordinates.latitude,
      long: name.props.coordinates.longitude
    })
      .then((result) => {

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const submitFormRedirect = () => {
    navigate('/seePOI');
  }
  return open &&
    ReactDom.createPortal(
      <>
        {/* background */}
        <div style={overlayStyle} />

        <div style={modalStyle}>
          <form onSubmit={() => {
            shareExperience('/experiences')
            submitFormRedirect();
          }}>
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
  );
}
