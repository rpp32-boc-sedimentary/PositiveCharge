import React from 'react';
import Modal from '../poiDetails/Modal.jsx';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import SeePOI from './seePOI.jsx';

const Placeholder = (props) => {
  const location = useLocation();
  const data = location.state;

    return (
      <>
      <div>
        <SeePOI props={data}/>
      </div>
      </>
    )
  }

export default Placeholder;