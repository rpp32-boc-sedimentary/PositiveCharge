import React, { useState, useEffect } from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import axios from 'axios';

const LittleFilter = () => {


  ///////////////// temporary usage
  let categories = ['food', 'museums', 'cafes', 'landmarks', 'parks'];
  const getRandomCategory = (max) => {
    return Math.floor(Math.random() * max);
  };
  let randomCategory = categories[getRandomCategory(categories.length)];
  //////////////////////////

  const [modalState, setModalState] = useState(false);
  const manageModalState = () => {
    setModalState(!modalState);
  };

  const [priceModalState, setPriceModalState] = useState(false);
  const managePriceModalState = () => {
    setPriceModalState(!priceModalState);
  };

  const prices = {
    free: '',
    $: '',
    $$: '',
    $$$: ''
  }

  const [price, setPrice] = useState(prices);
  const handlePrice = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setPrice( { ...price, [name]: value } );
  };

  const [finalPricesSelected, setfinalPricesSelected] = useState(prices);
  const managefinalPricesSelected = (finalPrices) => {
    setfinalPricesSelected(finalPrices)
  };

  const handlePriceApply = (e) => {
    e.preventDefault();
    managefinalPricesSelected(price)
    managePriceModalState();
  };


  const [openState, setOpenState] = useState(false);
  const manageOpenState = (e) => {
    e.preventDefault();
    setOpenState(!openState);
  };

  const[dynamicState, setDynamicState] = useState(false);
  const manageDynamicState = (e) => {
    e.preventDefault();
    setDynamicState(!dynamicState);
  };

  useEffect( () => { applyFilter(openState, dynamicState, price) }, [dynamicState, openState, finalPricesSelected] );

//create a send function that fires anytime a filter is clicked
  const applyFilter = (openState, dynamicState, price) => {

    axios.get('/filter/selectedFilters', {
      params: {
        open: openState,
        dynamic: dynamicState,
        price: price
      }
    })
      .then(data => {
        console.log('success applying filters', data);
      })
      .catch(err => {
        console.error('error applying filters', err);
      })
  }

  // DELETE Later, for testing purposes
  const getYelpDataTest = () => {

    let lat = 37.776447823372365;
    let long = -122.43286289002232;
    axios.get('/filter/graphql', {
      params: {
        lat: lat,
        long: long
      }
    })
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('error', err);
      })
  }

/////////////////////////////Big Filter state and functions/////////////////////






////////////////////////////////////////////////////////////////////////////////





  //when someone clicks on a filter, check the status of all of the filters and then update the list of all states and send it back

  return (
    <div className="smallFilter">
      <select className="sfChild">
        <option>Recommended</option>
        <option>Distance</option>
        <option>Likes</option>
      </select>
      <button className="sfChild" onClick={ manageModalState } >More Filters</button>
      <BigFilter modalState={ modalState } setModalState={ setModalState } manageModalState={ manageModalState }/>
      <button className="sfChild" onClick={ manageOpenState }>Open Now</button>
      <button className="sfChild" onClick={ managePriceModalState }>Price</button>
      <PriceFilter priceModalState={ priceModalState } setPriceModalState={ setPriceModalState } managePriceModalState={ managePriceModalState } price={ price } setPrice={ setPrice } handlePrice={ handlePrice } handlePriceApply={ handlePriceApply } />
      <button className="sfChild" onClick={ manageDynamicState }>{ randomCategory }</button>
      <button className="sfChild" onClick={ getYelpDataTest }>getYelpDataTest</button>
    </div>
  )
}

export default LittleFilter;