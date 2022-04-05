import React from 'react'
import ReactDom from 'react-dom'

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

export default function PoiModal({ open, onClose }) {

  return open ?
    ReactDom.createPortal(
      <>
        {/* background */}
        <div style={overlayStyle} />

        {/* modal itself */}
        <div style={modalStyle}>

          {/* comments section */}
          <div>Experiences Section
            <div>experience
              {/* username */}
              <div>username</div>
              {/* experience */}
              <div>experience</div>
              {/* photo */}
              <div>photo (optional)</div>
            </div>
          </div>

          {/* love button */}
          <button onClick={() => console.log('loved')}>love</button>

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