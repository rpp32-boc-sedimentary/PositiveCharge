import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios';

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
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)',
  zIndex: 1000
}


export default function PoiModal({ open, onClose}) {

  const love = (path) => {
    // axios.put(`/love${path}`, {love: 1})
    //   .then((response) => {
    //     // send something like loved x thing
    //     console.log(response.data)
    //   })
  }

  return open ?
    ReactDom.createPortal(
      <>
        {/* background */}
        <div style={overlayStyle} />

        {/* modal itself */}
        <div style={modalStyle}>

          {/* comments section */}
          <div>Experiences Section

            <div>
              {/* experience */}
              experience
              {/* love button */}
              <button onClick={() => love('/experience')}>love</button>
              {/* flag button */}
              <button onClick={() => console.log('flag experience')}>flag</button>
              {/* photo */}
              <div>photo (optional)</div>
            </div>

          </div>

          {/* love button */}
          <button onClick={() => love('/poi')}>love</button>
          {/* comment button */}
          <button onClick={() => console.log('adding comment')}>add experience</button>

          {/* flag button */}
          <button onClick={() => console.log('flag')}>flag</button>

          {/* close button */}
          <button onClick={onClose}>Close</button>

        </div>

      </>,
    document.getElementById('portal')
  ) : null;
}
