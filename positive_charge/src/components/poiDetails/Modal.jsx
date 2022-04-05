import React, { useState } from 'react';
import PoiModal from './PoiModal.jsx';

export default function Modal() {

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal (add this click handler later to each POI on the map)</button>
        <PoiModal open={isOpen} onClose={() => setIsOpen(false)}>
        </PoiModal>
      </div>
    </>
  )
}