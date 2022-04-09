import React, { useState } from 'react';
import PoiModal from './PoiModal.jsx';
import axios from 'axios';

export default function Modal() {

  const getDetails = (id) => {
    console.log('fetching details')
    // need to add some poi id here
    axios.get(`/details/view`)
      .then((response) => {
        grabDetails(response.data)
      })
  }

  const [isOpen, setIsOpen] = useState(false);
  const [details, grabDetails] = useState([]);

  return (
    <>
      <div>
        <button onClick={() => {
          getDetails()
          setIsOpen(true)
        }}>Open Modal (add this click handler later to each POI on the map)</button>
        <PoiModal open={isOpen} onClose={() => setIsOpen(false)} detail={details} />
      </div>
    </>
  )
}
