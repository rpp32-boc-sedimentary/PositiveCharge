import React from 'react';
import Modal from '../poiDetails/Modal.jsx';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

const MoreDetails = (props) => {
  const location = useLocation();
  const data = location.state.data;

  if (data.location !== undefined) {
    return (
      <>
      <div className='moreDetails text'>
        <span className='moreDetailsName'>{data.name} </span> <br></br>
        <span className='moreDetailsAddress'>{data.location.address1}, {data.location.city} {data.location.country}</span> <br></br>
        <span className='moreDetailsPrice'>Price: {data.price}</span> <span className='moreDetailsRating'>Yelp Rating: {data.rating}</span>
        <Modal props={data} userEmail={props.userEmail}/>
      </div>
      </>
    )
  } else {
    return (
      <>
      <div className='moreDetails text'>
        <span className='moreDetailsName'>{data.name} </span> <br></br>
        <span className='moreDetailsAddress'>{data.address}</span> <br></br>
        <span className='moreDetailsPrice'>Price: {data.price}</span> <span className='moreDetailsRating'>Loves: {data.loves}</span>
        <Modal props={data} userEmail={props.userEmail}/>
      </div>
      </>
    )
  }
  }

export default MoreDetails;