import React, { useState } from 'react';
import PoiModal from './PoiModal.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Modal(data) {

  const getDetails = (data) => {
    console.log(data)
    axios.get(`/details/view`, {
      params: {
        id: data.props.id,
        email: data.userEmail
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
        <Button
          variant="contained"
          sx={{ maxWidth: '80vw',
        margin: '1rem'}}
          onClick={() => {
          getDetails(data)
          setIsOpen(true)
        }}>See what everyone is saying about {data.props.name}</Button>
        <PoiModal open={isOpen} onClose={() => setIsOpen(false)} detail={details} name={data}/>

        {/* Sponsor link */}
        <br/><br/>
        <Link to="/sponsor" state={{data: data}}>Sponsor this POI</Link>
      </div>
    </>
  )
}
