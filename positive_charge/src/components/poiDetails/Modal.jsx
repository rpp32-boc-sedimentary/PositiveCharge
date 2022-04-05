import React, { useState } from 'react';
import PoiModal from './PoiModal.jsx';


const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

export default function Modal({greet}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <PoiModal open={isOpen} onClose={() => setIsOpen(false)}>
        Fancy Modal
      </PoiModal>
    </div>

    <div style={OTHER_CONTENT_STYLES}>Other Content</div>
    {/* background */}

    {/* modal itself */}

      {/* comments section */}

      {/* love button */}

      {/* comment button */}

      {/* flag button */}
  </>
  )
}