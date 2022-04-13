import React, { useState } from 'react';
import PoiModal from './PoiModal.jsx';
import axios from 'axios';

export default function Modal(data) {

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
        }}>See what everyone is saying about {data.props.name}</button>
        <PoiModal open={isOpen} onClose={() => setIsOpen(false)} detail={details} name={data}/>
      </div>
    </>
  )
}
