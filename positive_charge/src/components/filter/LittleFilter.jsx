import React, { useState } from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import axios from 'axios';

const LittleFilter = () => {

  const [modalState, setModalState] = useState(false);
  const manageModalState = () => {
    setModalState(!modalState);
  };

  const [priceModalState, setPriceModalState] = useState(false);
  const managePriceModalState = () => {
    setPriceModalState(!priceModalState);
  }

  const [openState, setOpenState] = useState(false);
  const manageOpenState = () => {
    setOpenState(!openState);
  };

  const [priceState, setPriceState] = useState();
  const managePriceState = () => {

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
      <button className="sfChild" onClick={ managePriceModalState }>Price</button>
      <PriceFilter priceModalState={ priceModalState } setPriceModalState={ setPriceModalState } managePriceModalState={ managePriceModalState } />
      <button className="sfChild" onClick={ getYelpData }>Dynamic Button</button>
    </div>
  )
}

export default LittleFilter;