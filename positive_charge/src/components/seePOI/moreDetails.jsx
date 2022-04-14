import React from 'react';
import Modal from '../poiDetails/Modal.jsx';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

const MoreDetails = (props) => {
  const location = useLocation();
  const data = location.state.data;

    return (
      <>
      <div>
        <span className='moreDetailsName'>{data.name}  {data.phone}</span> <br></br>
        <span className='moreDetailsAddress'>{data.location.address1}, {data.location.city} {data.location.country}</span> <br></br>
        <Modal props={data}/>
      </div>
      </>
    )
  }

export default MoreDetails;