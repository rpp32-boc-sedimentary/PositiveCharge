import React, { useState } from 'react';
import PoiModal from './PoiModal.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Modal(data) {

  const getDetails = (data) => {
    axios.get(`/details/view`, {
      params: {
        id: data.props.id
      }
    })
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
          getDetails(data)
          setIsOpen(true)
        }}>See what everyone is saying about {data.props.name}</button>
        <PoiModal open={isOpen} onClose={() => setIsOpen(false)} detail={details} name={data}/>

        {/* Sponsor link */}
        <br/>
        <Link to="/sponsor" state={{data: data}}>Sponsor this POI</Link>
      </div>
    </>
  )
}
