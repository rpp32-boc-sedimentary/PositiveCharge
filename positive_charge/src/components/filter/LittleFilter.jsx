import React, { useState } from 'react';
import BigFilter from './BigFilter.jsx';
//import useModal from './UseModal.js';
import axios from 'axios';

export default function LittleFilter() {

  const [modalState, setModalState] = useState(false);

  const manageModalState = () => {
    setModalState(!modalState);
  };

  // DELETE Later, for testing purposes
  const getYelpData = () => {
    axios.get('/filter')
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('error', err);
      })
  }


  return (
    <div className="smallFilter">
      {'Small Filter Bar'}
      <select className="sfChild">

        <option>Recommended</option>
        <option>Distance</option>
        <option>Likes</option>
      </select>
      <button className="sfChild" onClick={ manageModalState } >More Filters</button>
      <BigFilter modalState={ modalState } setModalState={ setModalState } manageModalState={ manageModalState }/>
      <button className="sfChild">Open Now</button>
      <button className="sfChild">Price</button>
      <button className="sfChild" onClick={ getYelpData }>Dynamic Button</button>
    </div>
  )

}